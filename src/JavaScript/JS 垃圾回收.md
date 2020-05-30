---
route: /js-jc
---

## 定义

执行环境会找出哪些不再使用的变量，然后释放它们占用的内存

## 标记清除

当进入环境时，会将变量标记为“进入环境”，进入环境的变量所占用的内存是不会释放的，当离开环境是标记为“离开环境”

```js
function foo(params) {
  var a = 0;
  var b = {};
}

foo();
```

## 引用记数

检查一个值被引用的次数，当把一个引用类型的值赋给一个变量时引用次数为 1，当另外一个变量也引用该值是次数加 1 变为 2，当引用的次数为 0 时表示没有办法再访问该值。**下一次**垃圾回收器执行就会释放这部分内存

```js
var a = { xx: 2 }; // 值A{xx:2}的引用次数为1
var b = a; // b再次引用AA{xx:2}，次数为2
a = null; // a不再引用A,次数为1
```

当执行函数 foo 即进入环境，params,a,b 存入堆、栈中占用相应的内容保存数据，这时给这三个变量打上进入环境的标记，是不能释放的，当 foo 函数执行完毕，标识为离开环境。等待**下一次**垃圾回收器执行就会释放这部分内存

## 内存泄露

### 闭包

```js
function foo() {
  var num = 0;
  return function bar() {
    return num++;
  };
}

var a = foo();
a();
```

由于词法作用域链的原因，当 foo()执行完，因为 bar 函数内引用了 num,所以 num 并不能被释放。多次执行 foo()就会造成多个无法释放的 num

### 循环引用

```js
function foo() {
  var a = {};
  var b = {};
  a.x = b;
  b.xx = a;
}
```

如果是引用记数形式的垃圾回收，上在 foo 执行后由于 a 和 b 形成了循环引用，引用次数都不为 0，就会造成内存泄露，这个时候可以手动解除引用

```js
function foo() {
  var a = {};
  var b = {};
  a.x = b;
  b.xx = a;
  // ...

  a.x = null;
  b.xx = null;
  //   ...
}
```

### 隐形的循环引用

```js
function foo() {
  const element = document.getElementById('id');
  element.onclick = function handler() {
    console.log(element.width);
  };
}
```

### WeakMap

> WeakMap 对象是一组键/值对的集合，其中的键是弱引用的。其键必须是对象，而值可以是任意的。

- WeakMap 键指向的对象是弱引用的，意思就是指向的对象如果没有被其他变量引用，就会被垃圾回收
- 正是由于第一点，WeakMap 不提供列出其键的方法，因为随时都可能被回收

```js
const data = new WeakMap();
let obj = { a: 2 };
data.set(obj, 'x');
console.log(data.get(obj)); // x
obj = null;
// obj这个key没有被其他变量引用时自动就被回收了
console.log(data.get(obj)); // undefined
```

## 手动解除引用

```js
function foo(cb) {
  const ret = { a: { b: 2 } };
  cb(ret);
  ret.a = null;
}

foo(function(data) {
  console.log(data.a.b, data); // 2,{a: {…}}
  setTimeout(() => {
    console.log(data); // {a:null}
  });
});
```

第一个 console 输出`// 2,{a: {…}}`，点击{…}结果还是{a:null}，这里的效果跟 React 的事件处理函数中的 EVENT 对象很似，只不过 React 使用的是更高端的“对象池”来管理的

```jsx
import React from 'react';
export default () => (
  <div
    onClick={e => {
      console.log(e);
      setTimeout(function() {
        console.log(e);
      });
    }}
  >
    Button
  </div>
);
```

## V8 垃圾回收 // TODO
