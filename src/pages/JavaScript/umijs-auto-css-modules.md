# UmiJS - 智能的 Css Modules

## 背景

项目中一些页面想使用 `css modules` 功能，一些页面使用 `global` 形式，通常会用不同的文件后缀，配置不同的 loader 来处理，比如下面这样：

```js
const rule = {
  test: /module\.less$/,
  loader: 'css-loader'
  options: {
      module: true
  }
};

const rule = {
  test: /\.less$/,
  loader: 'css-loader'
  options: {
      module: false
  }
};
```

```js
// 带module后缀的文件采用module形式
import styles from './xxx.module.less';

// 否则使用global
import styles from './xxx.less';
```

这样做的好处就是`webpack`配置简单易懂，还有就是可以通过文件名知道这个文件是用的`module`形式，缺点嘛就是写样式文件名的时候要多敲几个字

## babel 实现

懒促进技术发展，所以`UmiJS`通过分析`import`形式决定样式文件是`module`还是`global`

```js
// import有赋值使用module
import styles from './xxx.less';

// 否则使用global
import './xxx.less';
```

自己要实现这个功能其实也不难，其核心原理就是利用`babel`强大的`AST`给`import`有赋值的语句打上标记

先随便自定义个`babel`插件，大概长下面这个样子，除非很熟悉他的`API`，否则只能[查看文档](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)

```js
export default function () {
  return {
    visitor: {
      Identifier(path) {
        const name = path.node.name;
        // reverse the name: JavaScript -> tpircSavaJ
        path.node.name = name.split('').reverse().join('');
      },
    },
  };
}
```

把这个插件应用到自己项目中，然后观察两种`import`差异打上标记就ok了

```js
let value = './xxx.less';
if (has('specifiers.styles')) {
  value += `${value}?modules`;
}
```

然后`webpack`配置也非常简单，主要就是使用[resourceQuery](https://webpack.js.org/configuration/module/#ruleresourcequery)

```js
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\\.less$/,
        // 这个就是上面打的标记
        resourceQuery: /modules/,
        use: 'css-loader',
        options: { module: true },
      },
    ],
  },
};
```

以上都是伪代码，大体思路是这样，其实跟之前实现的组件库`svg`组件类似
