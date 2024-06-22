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

    1. 创建一个实例对象 temp = {}，且temp.constructor = Fn
    2. `Fn.call(temp), temp={name:zw}`
    3. temp[[Prototype]]指向Fn.prototype
    3. Fn没有返回对象，最终返回实例对象

测试第 4 点执行结果，当构建函数返回非对象值时，该值会被直接忽略

```js
function Fn() {
  this.name = 'zw';
  return 'haha';
}
var inst = new Fn(); // Fn {name: "zw"}
```

```js
var foo;
function Fn() {
  this.name = 'zw';
  foo = this;
  return {
    name: 'haha',
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

> new.target 属性允许你检测函数或构造方法是否是通过 new 运算符被调用的。在通过 new 运算符被初始化的函数或构造方法中，new.target 返回一个指向构造方法或函数的引用。在普通的函数调用中，new.target 的值是 undefined。

构建函数需要通过 new 调用执行，如果把构造函数当成普通函数执行，得到的效果记人意想不到。所以会预定构建函数名首字母区分，另外在函数里加一个判断

```js
function Fn() {
  if (!(this instanceof Fn)) {
    throw '不能当函数执行';
  }
  this.name = 'zw';
}
Fn();
```

现在可以通过 new.target 来测试，同时在类包括子类也同样实用

```js
function Fn() {
  if (new.target !== Fn) {
    throw '不能当函数执行';
  }
  this.name = 'zw';
}
Fn();

class SuperType {
  constructor() {
    console.log(new.target === SubType); // true
  }
}

class SubType extends SuperType {
  constructor() {
    super();
    console.log(new.target === SubType); // true
  }
}
new SubType();
```

可以看出 new.target 始终指向 new 调用的那个构造函数

## Reflect.constructor

Reflect.construct(Constructor [,args, NewConstructor)方法和 new Constructor(...arg)类似，需要注意以下几点

返回值

> 以 target（如果 newTarget 存在，则为 newTarget）函数为构造函数，argumentList 为其初始化参数的对象实例。

> A new instance of target (or newTarget, if present), initialized by target as a constructor with the given argumentsList.

经过测试发现 MDN 返回值这段定义有问题，应该是

**以 target 函数为构造函数，argumentList 为其初始化参数的对象实例，如果存在 newTarget，则把实例的原型[[Prototype]]指向 newTarget**

---

```js
let temp = new (NewConstructor || Constructor)(args);
if (NewConstructor) {
  temp.call(Constructor, args);
}
```

例子

```js
function SuperType(name) {
  console.log('SuperType call');
  this.name = name;
}
SuperType.prototype.superSay = function() {
  console.log(`SuperType say`);
};
function SubType(name) {
  console.log('SubType call');
  this.name = name;
}
SubType.prototype.say = function() {
  console.log(`SubType say`);
};
SubType.prototype.saySub = function() {
  console.log(this.name);
};
const inst = Reflect.construct(SuperType, ['zw'], SubType); // `SuperType say`，SubType并不会执行
inst.saySub(); // zw, 原型[[Prototype]]指向 SubType
inst.say(); // SubType say
inst.superSay(); // error
```

## Object.create

Object.create 也可以实现继承功能，只不过 Object.create 单纯定义新对象[[Prototype]]指向传入的对象

```js
function Fn() {}
Fn.prototype.say = function() {
  console.log('zw');
};

const inst = new Fn();
const inst2 = Object.create(Fn.prototype);
inst.say(); // zw
inst.say(); // zw
```
