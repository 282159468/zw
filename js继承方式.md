---
route: /js-extends
---

## 原型链继承

自己最先接触的继承方式

```js
function SuperType() {
  this.name = "foo";
  this.books = ["js", "css"];
}

SuperType.bar = 1;
SuperType.prototype.sayName = function() {
  return this.name;
};

function SubType(name) {
  this.name = name;
}

SubType.prototype = new SuperType();

const c = new SubType("foo1");
c.sayName(); // foo1
c.bar; // undefined
c.books.push("html");

const c2 = new SubType("foo2");
c2.sayName(); // foo2
c2.books; // ["js", "css", "html"]
```

### 优点

- 实例共享超类原型中的属性、方法，避免单独给每个实例创建

### 缺点：

- **正是由于共享原型中的属性，会造成引用类型的数据被实例修改**
- **创建实例时 new SubType()时无法向超类 SuperType 传递参数**
- c instanceof SuperType false
- 需要手动绑定下 SubType.prototype.constructor = SubType

### instanceof 的理解

曾经说 c instanceof SuperType 的意思是检查 c 是否为 SuperType 的实例，但实际 MDN 上的解释为

> instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。

通过这个例子好理解点

```js
function SuperType() {
  this.name = "a";
}

SuperType.foo = 1;

function SubType() {}

SubType.prototype = Object.create(SuperType.prototype);

const c = new SubType();

console.log(c instanceof SuperType); // true
```

原型链

c.\_\_proto\_\_ - SubType.prototype - SubType.prototype.\_\_proto\_\_ - SuperType.prototype

检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上

转换为

构造函数 SuperType.prototype 是否出现在实例对象 c 的原型链上

还有一点 instanceof 右侧必需是一个 callable 对象，即构造函数，否则会报错，

> Right-hand side of 'instanceof' is not callable

这里不太清楚如果用 proxy 代理一个普通对象的 call 能不能骗过 instanceof

## 借用构造函数继承

```js
function SuperType(name) {
  this.name = name;
  this.books = ["js", "css"];
}

SuperType.prototype.sayName = function() {
  return this.name;
};

function SubType(name) {
  const o = SuperType.call(this, name);
  this.age = 35;
}

const inst = new SubType("zw");
inst.books.push("html");
console.log(inst.age); // 35
console.log(inst.name); // zw
console.log(inst instanceof SuperType); // false
console.log(inst.sayName()); // error

const inst2 = new SubType("zw");
console.log(inst2.books); // ["js", "css"]
```

### 优点

- 可以向超类传递参数
- 独立的实例属性

### 缺点

- **不能继承超类原型中的属性、方法**
- 原型链断开，不能正确判断类型

## 组合继承

这种继承方式就是原型链继承和借用构造函数继承两种方式组合而成，综合两种方式的优点

```js
function SuperType(name) {
  this.name = name;
  this.books = ["js", "css"];
}

SuperType.prototype.sayName = function() {
  return this.name;
};

SuperType.prototype.works = ["foo", "bar"];

function SubType(name) {
  const o = SuperType.call(this, name);
  this.age = 35;
}

SubType.prototype = new SuperType();

const inst = new SubType("zw");
const inst2 = new SubType();
inst.books.push("html");
inst.works.push("baz");
console.log(inst instanceof SuperType); // true
console.log(inst.sayName()); // zw
console.log(inst.books); // ["js", "css", "html"]
console.log(SubType.prototype.books); // ["js", "css"]
console.log(inst2.books); // ["js", "css"]
console.log(inst2.works); // ["foo", "bar", "baz"]
```

### 优点

- 解决原型链继承：引用类型的原型属性被实例修改影响所有实例

  _原型上的引用类型数据被修改还是会影响，这种继承适合把引用类型数据超类构造函数中_

- 解决原型链继承：无法向超类传参数
- 解决借用构造函数继承：无法继承超类原型上的属性[1]
- 原型链正常

### 缺点

- 调用两次超类函数
- 由缺点 1 导致实例(inst.books)和子类原型(SubType.prototype.books)上有重复数据

## 原型继承/实例继承

```js
function SuperType(name) {
  this.name = name;
  this.books = ["js", "css"];
}

SuperType.prototype.sayName = function() {
  return this.name;
};

function SubType(name) {
  const o = Object.create(SuperType.prototype);
  // 或者
  // const o = new SuperType()
  o.name = name;
  return o;
}

const inst = new SubType("zw");
```

这种继承方式特点创建实例时 SubType()和 new SubType()效果是一样的

### 缺点

1. 原型链混乱，inst 不是 SubType 的实例，反而是 SuperType 的实例

## 寄生组合继承

```js
function SuperType(name) {
  this.name = name;
  this.books = ["js", "css"];
}

SuperType.prototype.sayName = function() {
  return this.name;
};

function SubType(name) {
  SuperType.call(this);
  this.name = name;
}

SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
const inst = new SubType("zw");
```

上面是组合继承代码，寄生组合只需要修改 SubType.prototype = new SuperType();

```js
SubType.prototype = Object.create(SuperType.prototype);
// 或者
const Fn = function() {};
Fn.prototype = new SuperType();
SubType.prototype = new Fn();
```

完整代码

```js
function SuperType(name) {
  this.name = name;
  this.books = ["js", "css"];
}

SuperType.prototype.sayName = function() {
  return this.name;
};

function SubType(name) {
  SuperType.call(this);
  this.name = name;
}

const Fn = function() {};
Fn.prototype = new SuperType();
SubType.prototype = new Fn();
SubType.prototype.constructor = SubType;
const inst = new SubType("zw");
```

通过中间这个 Fn 构造函数解决了组合继承调用两次 SuperType 造成每个实例和 SubType.prototype 上都有重复属性的问题;原型链也正常 inst 同时是 SubType、SuperType 的实例符合预期

## ES6 Class

ES6 CLass 代码通过 babel 编译后还是使用原型链实现继承的，但现代浏览器已开始原生支持 Class
