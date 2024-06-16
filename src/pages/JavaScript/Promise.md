---
route: /Promise
---

## 什么是 Promise

统一异常编程的方案，Promise 并没有直接解决回调地狱，直到 generator 以及后续的`async\await`，他主要解决统一问题

回调参数不统一
```js
function fn(a, cb) {}
function fn(a, b, cb) {}
```

回调函数执行完成没有控制权，服务器执行回调时机不稳定甚至忘执行

```js
function fn(a, cb) {
  //
}

function fn(a, cb) {
  setTimeout(cb);
}
```

promise 让回调控制反转

```js
promise.then(cb);
```

### Promise/A+规范

针对以上问题早期社区提出了统一异步编程方案[Promises/A+](https://promisesaplus.com/)，主要解决异步编程不统一问题

回调参数不统一

```js
function fn(a, cb) {}
function fn(a, b, cb) {}
```

回调函数执行完成没有控制权，服务器执行回调时机不稳定甚至忘执行

```js
function fn(a, cb) {
  //
}

function fn(a, cb) {
  setTimeout(cb);
}
```

promise 让回调控制反转

```js
promise.then(cb);
```

### ES Promise

ECMA 官方吸收社区方案定义标准规范，添加了一些新的接口

#### 静态方法

**withResolvers**
方便流程控制

```js
const { promise, resolve, reject } = Promise.withResolvers();
```

可以自定义 Promise 构造函数

```js
function CustomPromise(fn) {
  fn(
    value => {
      console.log('value', value);
    },
    reason => {
      console.log('reason', reason);
    },
  );
}
const { promise, resolve, reject } = Promise.withResolvers.call(CustomPromise);

resolve('成功');
promise.then(res => {
  console.log('res', res);
});
```

**all**

结果：所有都是成功才是成功，否则为失败
**any**
结果：第一个成功的，如果一个成功都没有结果就是失败

```js
const arr1 = [
  Promise.reject(0),
  new Promise(r => {
    r(1);
  }),
];

Promise.any(arr1)
  .then(res => {
    console.log('res', res);
  })
  .catch(err => {
    console.log('err', err);
  });
```

**race**
结果：第一个完成的（成功、失败）

```js
const arr1 = [
  Promise.reject(0),
  new Promise(r => {
    console.log('resolve');
    r(1);
  }),
];
Promise.race(arr1)
  .then(res => {
    console.log('res', res);
  })
  .catch(err => {
    console.log('err', err);
  });
```

**allSettled**

allSettled 返回值 promise,其结果基本上都是成功
与all的主要区别：即使传入的 promise 是失败状态，结果依然是成功，并且返回的是一个对象

```ts
type res = {
  status: 'rejected' | 'fulfilled';
  value: any; // rejected是为空
  reason: string;
};
```

```js
Promise.allSettled(arr1)
  .then(res => {
    console.log('res', res);
  })
  .catch(err => {
    console.log('err', err);
  });
```

只有当传入的不是可迭代对象返回值才是失败

```js
Promise.allSettled({})
  .then(res => {
    console.log('res', res);
  })
  .catch(err => {
    console.log('err', err);
  });
```

## 实例方法

**catch**

**finally**
