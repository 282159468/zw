# Promise.all

## 注意点

- 入参是可迭代对象
- 迭代元素需要包装成 promise 对象

```tsx
import { useState } from 'react';
Promise.myAll = (promises) => {
  const { promise, resolve, reject } = Promise.withResolvers();
  try {
    const promiseArr = [...promises];
    const result = [];
    let i = 0;
    promiseArr.forEach((promise) => {
      Promise.resolve(promise)
        .then((res) => {
          result[i] = res;
          i++;
          if (i === promiseArr.length) {
            resolve(result);
          }
        })
        .catch(reject);
    });
  } catch (e) {
    reject(e);
  }

  return promise;
};
export default () => {
  const getPromise = (data, time) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(data);
      }, time);
    });
  };
  const onClick = () => {
    // Promise.myAll().then(console.log, console.log);
    // Promise.myAll([{ a: 3 }, getPromise(123, 4000)]).then(console.log, console.log);
    Promise.myAll([{ a: 3 }, Promise.reject('error')]).then(console.log, console.log);
  };

  return <div onClick={onClick}>onClick</div>;
};
```
