# LazyMan

```js
实现一个LazyMan，可以按照以下方式调用:
LazyMan(“Hank”)输出:
Hi! This is Hank!

LazyMan(“Hank”).sleep(10).eat(“dinner”)输出
Hi! This is Hank!
//等待10秒..
Wake up after 10
Eat dinner~

LazyMan(“Hank”).eat(“dinner”).eat(“supper”)输出
Hi This is Hank!
Eat dinner~
Eat supper~

LazyMan(“Hank”).sleepFirst(5).eat(“supper”)输出
//等待5秒
Wake up after 5
Hi This is Hank!
Eat supper
以此类推。
```

```tsx
import React from 'react';

class LazyManCls {
  constructor(name) {
    this.tasks = [];
    this.sayHello(name);
    setTimeout(() => {
      this.$next();
    });
  }

  $next() {
    const task = this.tasks.shift();
    task && task();
  }

  sleepFirst(time) {
    this.sleep(time, true);
    return this;
  }
  sleep(time, isFirst) {
    const fn = () => {
      const ms = time * 1000;
      console.log(`Wake up after ${time}`);
      setTimeout(() => {
        this.$next();
      }, ms);
    };
    if (isFirst) {
      this.tasks.unshift(fn);
    } else {
      this.tasks.push(fn);
    }
    return this;
  }

  eat(name) {
    this.tasks.push(() => {
      console.log(`Eat ${name}!`);
      this.$next();
    });
    return this;
  }

  sayHello(name) {
    this.tasks.push(() => {
      console.log(`Hi This is ${name}!`);
      this.$next();
    });
    return this;
  }
}

function LazyMan(name) {
  return new LazyManCls(name);
}

export default () => {
  const onClick = () => {
    // LazyMan('Hank');

    // LazyMan('Hank').sleep(10).eat('dinner');

    // LazyMan('Hank').eat('dinner').eat('supper');

    LazyMan('Hank').sleepFirst(5).eat('supper');
  };
  return <div onClick={onClick}>click</div>;
};
```

Promise

```tsx
import React from 'react';

class LazyManCls {
  constructor(name) {
    this.tasks = [];
    this.sayHello(name);
    setTimeout(() => {
      this.$run();
    });
  }

  async $run() {
    for (const task of this.tasks) {
      await task();
    }
  }

  sleepFirst(time) {
    this.sleep(time, true);
    return this;
  }
  sleep(time, isFirst) {
    const fn = () => {
      const ms = time * 1000;
      console.log(`Wake up after ${time}`);
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, ms);
      });
    };
    if (isFirst) {
      this.tasks.unshift(fn);
    } else {
      this.tasks.push(fn);
    }
    return this;
  }

  eat(name) {
    this.tasks.push(() => {
      console.log(`Eat ${name}!`);
    });
    return this;
  }

  sayHello(name) {
    this.tasks.push(() => {
      console.log(`Hi This is ${name}!`);
    });
    return this;
  }
}

function LazyMan(name) {
  return new LazyManCls(name);
}

export default () => {
  const onClick = () => {
    // LazyMan('Hank');

    // LazyMan('Hank').sleep(10).eat('dinner');

    // LazyMan('Hank').eat('dinner').eat('supper');

    LazyMan('Hank').sleepFirst(5).eat('supper');
  };
  return <div onClick={onClick}>click</div>;
};
```
