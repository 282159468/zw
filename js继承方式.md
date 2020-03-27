---
route: /js-extends
---

## 原型链继承

自己最先接触的继承方式

```js
function A() {
  this.name = "a";
}

A.foo = 1;

function B() {}

B.prototype = new A();

const c = new B();
```

缺点：

- 需要手动绑定下 B.prototype.constructor = B
- c instanceof A false

### instanceof 的理解

曾经说 c instanceof A 的意思是检查 c 是否为 A 的实例，但实际 MDN 上的解释为

> instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。

通过这个例子好理解点

```js
function A() {
  this.name = "a";
}

A.foo = 1;

function B() {}

B.prototype = Object.create(A.prototype);

const c = new B();

console.log(c instanceof A); // true
```

原型链

c.\_\_proto\_\_ - B.prototype - B.prototype.\_\_proto\_\_ - A.prototype

检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上

转换为

构造函数 A.prototype 是否出现在实例对象 c 的原型链上

还有一点 instanceof 右侧必需是一个 callable 对象，即构造函数，否则会报错，

> Right-hand side of 'instanceof' is not callable

这里不太清楚如果用proxy代理一个普通对象的call能不能骗过instanceof
