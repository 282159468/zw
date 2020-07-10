# JS module(模块)

## import/静态分析

静态分析是指基于模块的 import 声明就可能确定各个模块的依赖关系，出于这点可以实现 Tree Shaking 只打包用到的代码

## export 动态绑定

动态绑定的意思是指模块通过 export 导出的变量与该模块是绑定关系，即通过变量可以获取变量在模块内的最新的值

```js
// b.js
export var foo = 'bar';
setTimeout(() => (foo = 'baz'), 500);

// a.js
import { foo } from './b.js';
console.log(foo);
setTimeout(() => console.log(foo), 100);

// 输出结果为

// bar
// baz
```

## export \* as

ES2020 添加 export \* as xxx from 'lib'批量导出声明

```js
const a = 1;
const b = 2;
export default { a, b };
```

```js
const a = 1;
const b = 2;
export { a, b };
```

<hr />

```html
<script type="module" src="./a.js"></script>
```

CommonJS
则不同，模块导出值是一份拷贝，后续使用的值都在这份拷贝，拷贝的数据与模块不再有值的联系，除非清空缓存

## 循环依赖

> https://exploringjs.com/es6/ch_modules.html#sec_cyclic-dependencies-commonjs

> http://www.ruanyifeng.com/blog/2015/11/circular-dependency.html

从 ES 标准和阮大神介绍来看，ES 原生也是支持循环依赖的，而且在使用 export 的变量时可以获取到相应的值，通过示例试验了一把确实能取到

示例地址：/demo/js-module/循环依赖/index.html

```html
<script type="module" src="./foo.js"></script>
```

```js
// foo.js
console.log('foo开始执行');
import { bar } from './bar.js';
console.log('bar=', bar);
export function foo() {
  bar();
  console.log('foo()调用完毕');
}
foo();

// bar.js
console.log('bar开始执行');
import { foo } from './foo.js';
console.log('foo=', foo);
export function bar() {
  console.log('bar()调用完毕');
}
console.log('bar结束执行');
```

以上代码能正常执行输出结果如下

```
bar开始执行
foo= ƒ foo() {
    bar();
    console.log('foo()调用完毕');
}
bar结束执行
foo开始执行
bar= ƒ bar() {
  console.log('bar()调用完毕');
}
bar()调用完毕
foo()调用完毕

```

但是如果把 foo 换成变量，也就是去掉提前函数声明，在 bar 就会报错 foo 未初始化

- [ ] 这点不知道是浏览器实现 ES 的问题还是另有原因，babel-node 试下

```js
export const foo = () => {
  bar();
  console.log('foo()调用完毕');
};
```

## 动态加载/import()

**webpack**

webpack 很早前应该是 1.x 版本，就可以通过 require.ensure 形式实现运行时加载（动态加载）

以及 2.x import()函数

```js
if (module.hot) {
  import('lodash').then(_ => {
    // Do something with lodash (a.k.a '_')...
  });
}
```

**ES 模块**

ES import 为静态导入形式不支持动态加载，但是 ES2020

有动态加载的提案 https://github.com/tc39/proposal-dynamic-import

```js
const main = document.querySelector('main');
for (const link of document.querySelectorAll('nav > a')) {
  link.addEventListener('click', e => {
    e.preventDefault();
    import(`./section-modules/${link.dataset.entryModule}.js`)
      .then(module => {
        module.loadPageInto(main);
      })
      .catch(err => {
        main.textContent = err.message;
      });
  });
}
```

用法和 webpack 的很像，但 webpack 不仅要动态加载，还要实现文件"静态"打包，

如 import(`./b/${a}`)打包就需要把 b 目录下的文件全打包，然后在运行时通过计算路径最终值再加载对应文件

所以 import(a)在 webpack 中是不行的，路径中必需包含一部分静态目录信息

另外还可以用 webpack 魔法注释进一步控制打包范围

```js
import(
  /* webpackInclude: /\.json$/ */
  /* webpackExclude: /\.noimport\.json$/ */
  /* webpackChunkName: "my-chunk-name" */
  `./locale/${language}`
);
```

## webpack 模块

webpack 让模块更简单，也更复杂

经常在 webpack 应用写的 ES 模块语法如 import/export，这些语句打包后并不会出现在浏览器端，最终会转换成 ES5 语法，大概经历的步骤

```js
export function a() {}
export default 'zw';
```

1. 通过 babel 把 ES 模块 转换为 Node 的 CommonJS

```js
exports.a = a;
exports.default = a;
exports.__esModule = true;
```

> \_\_esModule 标识该模块是通过 ES 模块转化为 CMD 模块的，同样的 import 也会转换为 require，

因为在 NodeJS 中要加载 ES 模块有三种方法，第一种 babel 转换、package.json 中声明 type:"module"、--input-type 参数

https://nodejs.org/api/esm.html

2. 通过 NodeJS require 加载 babel 转换后的文件

3. 再转换为 webapck 实现的模块**webpack_require**

当然现在也有支持原生模块打包的工具，但 webpack 类打包依然有好处比如 Tree Shaking，

打包为单个文件后减少加载模块的请求次数，虽然 HTTP/2 的多路复用可能一定程度解决这个问题，但模块数量太多也会出现性能问题
