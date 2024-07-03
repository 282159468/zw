# LazyMan

```js
/**
实现一个LazyMan，可以按照以下方式调用:
LazyMan('Hank')输出:
Hi! This is Hank!

LazyMan('Hank').sleep(10).eat('dinner')输出
Hi! This is Hank!
//等待10秒..
Wake up after 10
Eat dinner~

LazyMan('Hank').eat('dinner').eat('supper')输出
Hi This is Hank!
Eat dinner~
Eat supper~

LazyMan('Hank').sleepFirst(5).eat('supper')输出
//等待5秒
Wake up after 5
Hi This is Hank!
Eat supper
以此类推。
 */
```

```tsx
import React from 'react';

function LazyMan(name) {
  const tasks = [];

  tasks.push(() => {
    console.log(name);
    execute();
  });

  const execute = () => {
    const task = tasks.shift();
    if (task) {
      task();
    }
  };
  setTimeout(execute);
  return {
    eat(n) {
      tasks.push(() => {
        console.log(`Eat ${n}`);
        execute();
      });

      return this;
    },
    sleep(time, isFirst) {
      const task = () => {
        setTimeout(() => {
          console.log(`Wake up after ${time}`);
          execute();
        }, time * 1000);
      };
      if (isFirst) {
        tasks.unshift(task);
      } else {
        tasks.push(task);
      }

      return this;
    },
    sleepFirst(time) {
      this.sleep(time, true);
      return this;
    },
  };
}

export default () => {
  const onClick = () => {
    LazyMan('Hank').sleepFirst(5).eat('supper');
  };
  return <div onClick={onClick}>click</div>;
};
```

```tsx
import React from 'react';

function LazyMan(name) {
  const tasks = [];
  tasks.push(() => {
    console.log(`Hi! This is ${name}!`);
  });

  const execute = async () => {
    for (const task of tasks) {
      await task();
    }
  };

  setTimeout(execute);

  return {
    sleepFirst(time) {
      this.sleep(time, true);
      return this;
    },
    sleep(time, ifFirst=false) {
      const task = () => {
        return new Promise((r) => {
          setTimeout(() => {
            console.log(`Wake up after ${time}`);
            r(true);
          }, time * 1000);
        });
      };
      ifFirst ? tasks.unshift(task) : tasks.push(task);
      return this;
    },
    eat(food) {
      tasks.push(() => console.log(`Eat ${food}`));
      return this;
    },
  };
}
export default () => {
  const onClick = () => {
    LazyMan('Hank').eat('dinner').eat('supper')
    // LazyMan('Hank').sleep(4).eat('dinner')
    // LazyMan('Hank').sleepFirst(5).eat('supper')
  };
  return <div onClick={onClick}>click</div>;
};
```
