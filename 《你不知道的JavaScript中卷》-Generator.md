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

手动定义数组迭代器

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
