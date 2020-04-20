---
route: /generator
---

## 生成器

生成器是一种特殊的函数，在 function 后面添加*，至于*前后是否添加空格没有强制要求，同时支持函数声明和表达式

```js
var gengerator1 = function*() {};
function* generrator2() {}
```

## next 和 yield

生成器是怎么使用的

```js
function* foo(b) {
  var a = b + (yield 2);
  var c = yield a;
  return a + c;
}
// 和普通函数不同，这里foo并不是执行foo，foo()返回是的一个迭代器对象
var iteraor = foo(1);

// 第一次执行next，才开始执行foo函数，执行过程中如果碰到yield执行就会停止
// 1. 停止后计算yield后面表达式的值，并返回这个值
// 2. 另外还表示这里需要一个值等待下一次迭代时传入
iteraor.next(); // {value:2, done: false}
iteraor.next(2); // {value:3, done: false}
iteraor.next(5); // {value:8, done: false}
```

可以看出 next 比 yield 多一个，这时因为第一个 next 用于启动迭代，

另外生成器函数接收的参数是在执行生成器函数传递的，也就是说第一个 next 应该是没有参数的，即使传递参数也会被忽略，因为没有任何接受者

每 n 个 next()返回结果是第 n 个 yield 后表达式的值或者是 return 值，嵌套的生成器除外
每 n 个 next(val)参数值是，是第 n-1 个 (yield x)的值，如 a = yield 1，那么 a=val

## 解决什么问题

- 回调顺序
- 同步形式编写、阅读异步代码
- 同步形式处理异步异常

## 迭代器

迭代器鸭工辨型

- 迭代器是一个对象
- 该对象提供 next 方法，每执行一次 next 方法会返回数据
- 该数据是一个对象包含包含 value、done 两个值，像这样{value: 1, done: false}
- 当返回数据中 done 为 true 时，再次执行 next 方法返回的数据应该都是{value: undefined, done: true}

生成器返回的就是迭代器，并且是可迭代对象，可迭代对象需要对象包含[Symbol.iterator]方法，这个方法返回值就是迭代器，所以 Symbol.iterator 可以是一个生成器

for...of 可以遍历可迭代对象，比如 Array、Map，但是不能遍历普通对象，如下

```js
var o = { a: 1, b: 2, c: 4 };

// Uncaught TypeError: o is not iterable
for (var [key, val] of o) {
  console.log(`${key} = ${val}`);
}
```

但是可以手动为普通对象添加迭代器

```js
var o = {
  a: 1,
  b: 2,
  c: 4,
  *[Symbol.iterator]() {
    var keys = Object.keys(this);
    for (var key of keys) {
      yield [key, this[key]];
    }
  },
};
for (var [key, val] of o) {
  console.log(`${key} = ${val}`);
}
console.log([...o]);
```

平时使用 Array、Map 时并没有实现迭代器也可以用 for...of 遍历是因为继承了 Array.prototype 中 Symbol.iterator 定义的迭代器，所以可以手动改写数组的迭代行为

```js
// 手动定义数组迭代器
Object.defineProperty(Array.prototype, Symbol.iterator, {
  value: function*() {
    for (var i = 0; i < this.length; i++) {
      yield `${i}:${this[i]}`;
    }
  },
});

for (var item of [1, 2, 5]) {
  console.log(item);
}
// 0:1
// 1:2
// 2:5
```

### 停止生成器

## 生成器异步编程

回调>Promise>生成器

### 实践中

## 异常处理

外部>生成器>迭代器

## 并发

## 嵌套生成器/生成器委托

控制转移

转移对象是可迭代对象

异常委托

递归

## run 和 runAll

## thunk

## 实现生成器

```

```
