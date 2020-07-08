# JS module(模块)

## 变量

## 静态分析

## export \* as

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

ES2020 添加

## 输出值

ES6 Module 是动态去模块中变量值

```js
// b.js
export var foo = 'bar';
setTimeout(() => (foo = 'baz'), 500);

// a.js
import { foo } from './b.js';
console.log(foo);
setTimeout(() => console.log(foo), 500);
```

```html
<script type="module" src="./a.js"></script>
```

CommonJS 则不同，模块导出值是一份拷贝，后续使用的值都在这份拷贝，拷贝的数据与模块不再有值的联系，除非清空缓存

## package.json

- type

- main

## 循环依赖

<hr/>

webpack 让模块更简单，也更复杂

## 动态加载/import()

**webpack**
webpack 很早前应该是 1.x 版本，就可以通过 require.ensure 形式实现运行时加载（动态加载）

以及 2.x

**ES6 Module**

ES6 import 为静态导入形式不支持动态加载，但是 ES2020 有动态加载的提案

https://github.com/tc39/proposal-dynamic-import

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

```js
if (module.hot) {
  import('lodash').then(_ => {
    // Do something with lodash (a.k.a '_')...
  });
}
```

## export...

不是看到的 ES6 Module，只能说 webpack 支持 ES6 Module 语法，同样的也可以使用 require
