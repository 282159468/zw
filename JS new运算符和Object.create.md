---
route: /js-new
---

## 定义

引用 MDN 上的定义

> new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例

以上定义转换成自己大白话理解

- new 是运算符
- new 可以创建用户自定义类型实例

```js
function Type() {}
new Type();
```

- new js 内置的类型 new Array()

## 执行过程

- 创建一个实例对象，为该对象创建 constructor 属性并指向构造函数
- 将该对象作为构造函数上下文(this)调用该构造函数
- 将该对象的原型指向构造函数原型对象
- 如果**构造函数返回的是对象**，该 new 执行结果就是该对象，否则结果为实例对象(this)

```js
function Fn(){
    this.name = 'zw'
}
var inst a = new Fn()
```

### 理解执行过程

    1. 创建一个实例对象哦 temp = {}
    2. Fn.call(temp), temp={name:zw}
    3. temp[[Prototype]]指向Fn.prototype
    3. Fn没有返回对象，最终返回实例对象

测试第 4 点执行结果，当构建函数返回非对象值时，该值会被直接忽略

```js
function Fn() {
  this.name = "zw";
  return "haha";
}
var inst = new Fn(); // Fn {name: "zw"}
```

```js
var foo;
function Fn() {
  this.name = "zw";
  foo = this;
  return {
    name: "haha"
  };
}
var inst = new Fn(); // {name: "haha"}
console.log(foo instanceof Fn); // true
```

## 可选的()

`new Fn()`写作`new Fn`效果是一样的，但经常在书中、博客中看到推荐加上()，但为什么推荐呢？

主要原因是运算优先级

- 带参数列表 new ()优先级为 18，new Fn()是带参数列表的，只是参数为 undefined
- 无参数列表 new 优先级为 17，new Fn
- 成员访问.优先级 18
- 函数执行 fn()优先级 17

例子更直观

```js
function Fn() {
  console.log(1);
}

Fn.prototype.say = function() {
  console.log(2);
};

Fn.say = function() {
  console.log(3);
};
new Fn.say(); // 3
new Fn().say(); // 1,2
```

上面代码两个 new 唯一区别就是一个没加()，输出结果完全不同

`new Fn.say()`因为优先级 new Fn 无参数列表为 17，而成员访问.为 18，所以先执行 Fn.say，最后解释为`new (Fn.say)()`，实际上就是把 Fn.say 当构造函数来整了

`new Fn().say();`优先级原因先执行 new Fn()返回实例，最后.say()实际就是实例继承的方法

## ES6 new.target
