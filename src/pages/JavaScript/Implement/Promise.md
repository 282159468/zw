# Promise

## 注意点

- executor 异常
- 三种状态，状态变更不可逆
- 每个 then 都是新的 promise 对象，每个 promise 对象 value 不可变

```tsx
import React from 'react';

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

const isPromiseLike = (obj) => {
  return typeof obj?.then === 'function';
};

const runWithMirco = (cb) => {
  queueMicrotask(cb);
};

class MyPromise {
  constructor(executor) {
    if (!new.target) {
      throw new MyPromise(executor);
    }
    this.status = PENDING;
    this.fulfilledCallbacks = [];
    this.rejectedCallbacks = [];
    const resolve = (value) => {
      if (isPromiseLike(value)) {
        return value.then(resolve, reject);
      }
      if (this.status === PENDING) {
        this.value = value;
        this.status = FULFILLED;
        this.fulfilledCallbacks.forEach((cb) => cb());
      }
    };
    const reject = (reason) => {
      if (isPromiseLike(reason)) {
        return reason.then(resolve, reject);
      }
      if (this.status === PENDING) {
        this.reason = reason;
        this.status = REJECTED;
        this.rejectedCallbacks.forEach((cb) => cb());
      }
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(fulfilledCb, rejectedCb) {
    const onFulfilled = typeof fulfilledCb === 'function' ? fulfilledCb : (v) => v;
    const onRejected =
      typeof rejectedCb === 'function'
        ? rejectedCb
        : (reason) => {
            throw reason;
          };
    return new this.constructor((resolve, reject) => {
      const handlePromiseData = (type, currentData) => {
        runWithMirco(() => {
          try {
            const data = type(currentData);
            if (typeof data?.then === 'function') {
              data?.then(resolve, reject);
            } else {
              resolve(data);
            }
          } catch (err) {
            reject(err);
          }
        });
      };

      if (this.status === FULFILLED) {
        handlePromiseData(onFulfilled, this.value);
      } else if (this.status === REJECTED) {
        handlePromiseData(onRejected, this.reason);
      } else {
        this.fulfilledCallbacks.push(() => {
          handlePromiseData(onFulfilled, this.value);
        });
        this.rejectedCallbacks.push(() => {
          handlePromiseData(onRejected, this.reason);
        });
      }
    });
  }

  catch(rejectedCb) {
    return this.then(undefined, rejectedCb);
  }
}

export default () => {
  const onClick = () => {
    new MyPromise(function (resolve, reject) {
      console.log('ctro');
      setTimeout(() => {
        resolve('init 1');
      }, 200);
    })
      .then(null, (res) => {
        console.log('then1', res);
        return 3;
      })
      // .catch((err) => {
      //   console.log('err', err);
      // })
      .then(function (res) {
        console.log('then2', this);
        return 4;
      })
      .then((res) => {
        console.log('then3', res);
        return 5
      })
      .then((res) => {
        console.log('then3', res);
      });
  };
  return <div onClick={onClick}>click</div>;
};
```

[https://github.com/YvetteLau/Blog/issues/2](https://github.com/YvetteLau/Blog/issues/2)
