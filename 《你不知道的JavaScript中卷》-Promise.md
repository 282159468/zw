---
route: /you-do-not-know-JavaScript-medium-promise
---

## 什么是 Promise

`Promise`是异步编程的一种解决方案，相比回调 Promise 对未来值进行了控制反转，让未来值和调用代码一起

## Promise 解决了什么问题

`Promise`主要解决回调异步编程的信任问题

- 回调时机不确定，任务可能是异步的也可能是同步的

```js
foo(1, function(){});
function(num, cb){
    setTimout(()=>cb('done'), 1000)
}
```

- 回调不确定，有可能传入的回调永远不会执行，而`Promise`的回调会在下一个`tick`触发

- 回调参数和`this`上下文不可信，cb.call(obj, a, b, ...)，`Promise`不管是`resolve`、`reject`传入参数都是一个，`this`为全局对象`window`

* 吞掉异常和错误

下面的`foo`可能是同事编写的函数，也可能是第三方提供的，`b.a();`导致异常后回调`cb`根本不会执行，外部也捕获不到异常

```js
try {
  foo(1, function(data) {
    console.log(data);
  });
} catch (err) {
  alert(err);
}
function foo(num, cb) {
  try {
    // ...
    b.a();
    cb(2);
  } catch (err) {
    console.error(err);
  }
}
```

另外一种就是第三方代码没有异常，回调里面有异常。

```js
try {
  foo(1, function(data) {
    b.a();
    console.log(data);
  });
} catch (err) {
  alert(err);
}
function foo(num, cb) {
  try {
    // ...
    cb(2);
  } catch (err) {}
}
```

不管哪种情况都是第三方把异常吞掉了，之前就碰到过一次使用一个第三方插件页面没有任何提示，也没有异常信息死活定位不到问题。最后好不容易找到第三方代码里面`catch (err) {}`捕获了异常然后啥也没干，好歹也打个`console`吧~~~

## thenable 对象

鸭式辨型,具有`then`方法的对象

```js
var obj = {
  then: (cb) => cb(2),
};
// 输出2
Promise.resolve(obj).then((data) => console.log(data));
```

## Promise.resolve()

`Promise.resolve()`的返回值是对传入参数的`promise`包装，可以包装固定值、promise 对象、thenable 对象

`Promise.resolve()`决议是可以是完成或者拒绝、而`Promise.reject()`只能是拒绝

```js
var p = Promise.reject(`no`);
Promise.resolve(p).then(
  (result) => console.log(result),
  // 输出no
  (reason) => console.log(reason)
);
```

## 异常

### onRejected

`onRejected`不能捕获`onFulfilled`中的异常

```js
var p = Promise.resolve(1);
p.then(
  function onFulfilled(result) {
    foo.bar();
    return 2;
  },
  // 不会执行
  function onRejected(reason) {
    console.log(reason);
  }
);
```

原因是`Promise`状态决议后不能理变更，p 是一个立即决议为完成的实例，所以会进入 then 回调，虽然函数内产生了异常，但是 p 已经决议，自然不会触发 onRejected，通常使用 catch 处理异常更稳妥

### 异常重置

以前写过类似的代码

```js
// api请求工具
function ajax(url) {
  // ...
  return Promise.reject(`404`);
}
function request(url) {
  return ajax(url)
    .then((res) => {
      // ....
    })
    .catch((err) => {
      alert("请求出错啦！");
      return err;
    });
}

// 调用端
request("http://zw.com/age")
  .then((res) => {
    console.log(`haha`, res);
  })
  .catch((err) => {
    console.log("获取年龄失败", err);
  });
```

实现的大体功能是 request 函数会统一处理 ajax 的异常信息，同时需要通过调用端，调用端可能为对异常再次处理，但是这里调用端的 catch 永远也不会执行，反而调用端 then 输出了"haha 404"。出现该情况的原因是 catch 会重置当前 promise 链为完成状态，所以 catch 返回一个新的 promise 产生新的链就可以解决该问题

```js
// api请求工具
function ajax(url) {
  // ...
  return Promise.reject(`404`);
}
function request(url) {
  return ajax(url)
    .then((res) => {
      // ....
    })
    .catch((err) => {
      alert("请求出错啦！");
      return Promise.reject(err);
    });
}

// 调用端
request("http://zw.com/age")
  .then((res) => {
    console.log(`haha`, res);
  })
  // 正常输出
  .catch((err) => {
    console.log("获取年龄失败", err);
  });
```

或者在外面包一层

```js
// api请求工具
function ajax(url) {
  // ...
  return Promise.reject(`404`);
}
function request(url) {
  return new Promise((resolve, reject) => {
    return ajax(url)
      .then((res) => {
        // ....
      })
      .catch((err) => {
        alert("请求出错啦！");
        return reject(err);
      });
  });
}

// 调用端
request("http://zw.com/age")
  .then((res) => {
    console.log(`haha`, res);
  })
  // 正常输出
  .catch((err) => {
    console.log("获取年龄失败", err);
  });
```

### 默认的异常 hanlder

### 纠结的 catch 循环

### 全局捕获

### done

### queryObjects

### 构造异常

## 默认的完成 hanlder

## promise 链

## resolve 和 reject

## Promise.all([])和 Promise.race([])

### resolve 化

### 特殊参数

- 立即值
- 空数组

## finally

## Promise 和事件循环

- [ ] 用`all`, `race`实现`none`,`any`,`first`,`last`,`map`
