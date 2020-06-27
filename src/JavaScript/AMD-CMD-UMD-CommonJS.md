---
title: 理解AMD CMD UMD Commonjs
---

# 理解 AMD CMD UMD Commonjs

## Commonjs

Node（服务端）模块化规范，

```js
exports.foo = 'bar';
exports.doSomething = function() {};
```

```js
module.exports = {
  foo: 'bar',
  doSomething: function() {},
};
```

特点（坑）

- module.exports 初始为空对象，exports 也指向该对象，module.exports === exports，但真正导出的是 module.exports

  ```js
  module.exports = {};
  exports = module.exports;
  ```

- 文件没有声明 module、exports，如何能访问而且还初始化为空对象了

  NodeJS 在加载文件时会在外面包一层

```js
(function(exports, require, module, __filename, __dirname) {
  module.exports = {
    foo: 'bar',
    doSomething: function() {},
  };
});
```

## AMD

equireJS 实现的 AMD 规范

```js
// 常用的模块声明的形式
define(['./cart', './inventory'], function(cart, inventory) {
  return {
    color: 'blue',
    size: 'large',
    addToCart: function() {
      inventory.decrement(this);
      cart.add(this);
    },
  };
});
```

## CMD

通用模块定义，是淘宝 seaJS 实现的 CMD 规范

CMD 的模块定义支持 AMD 和 CommonJS 两种形式，难怪叫通用模块定义

```js
// 兼容AMD形式
define(function(require) {
  return {
    foo: 'bar',
    doSomething: function() {},
  };
});

// 兼容AMD形式
define(function(require, exports, module) {
  // 或者使用module.exports;
  exports.foo = 'bar';
  exports.doSomething = function() {};
});
```

## AMD 和 CMD 主要区别

```js
// mod1
define(function(require, exports, module) {
  console.log('require module: mod1');
  return {
    hello: function() {
      console.log('mod1 hello');
    },
  };
});

// main
define(function(require, exports, module) {
  console.log('require module: main');
  var mod1 = require('./mod1');
  mod1.hello();
  var mod2 = require('./mod2');
  mod2.hello();
  return {
    hello: function() {
      console.log('hello main');
    },
  };
});
```

AMD 会乱序加载 mod1、mod2 且立即执行，即依赖前置`define([mod1,mod2], cb) {`，有点类似 ES6 Module 理论上可以做静态分析

CMD 会顺序加载 mod1、mod2，但不会立即执行，等执行到`require('./mod1')`时才会执行 mod1，即倾向于运行时懒执行

常规理解上 CMD 更符合逻辑，但是这个现象更体现异步加载模块的机制，既然是异步就不会保证顺序，

另外 main 在调用 mod1 模块时不应该也不需要去关注 mod1 内部实现即会输出`console.log('require module: mod1');`，更不会关注其会优于`console.log('require module: main');`执行，main 应该关注 mod1 提供的接口

注：AMD、CMD 都是模块的加载都是异步的

## UMD

兼容大礼包
