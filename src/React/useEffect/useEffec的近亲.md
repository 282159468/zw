---
route: /useEffect-relation

title: useEffect近亲
---

# useEffect近亲

> Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

## 处理副作用

在 React 支持 hooks 之前，通常使用使用类组件的生命周期处理副作用，这样处理的弊端这里不再赘述，通常长这样

```jsx | pure
class Foo extends React.Component {
  componentDidMount() {
    request.get(this.props.id).then(res => {
      this.setState({ dataSource: res });
    });
  }

  componentDidUpdate() {
    if (xxx) {
      request.get(this.props.id).then(res => {
        this.setState({ dataSource: res });
      });
    }
  }
}
```

当有了 useEffect 之后，处理副作用确实方便了、优雅了

```jsx | pure
function Foo() {
  useEffect(() => {
    request.get(props.id).then(res => {
      setState({ dataSource: res });
    });
  }, [props.id]);

  return null;
}
```

## 代替生命周期

在这样的基础上，平时工作中或者网上大家经常听到、看到 useEffect 代替类组件生命周期，比如

- useEffect(fn, []) => componentDidMount
- useEffect(fn, [xxx]) => componentDidUpdate

但真的是这样么？我在 React 面试时经常会问的一个问题：

页面中有如下组件，问当打开页面时 5s 之前能看到 render 返回的内容吗？

```jsx | pure
import React from 'react';
const delay = (time = 5000) => {
  let now = Date.now();
  const start = now;
  while (now - start < time) {
    now = Date.now();
  }
};
class Foo extends React.Component {
  componentDidMount() {
    delay();
  }
  render() {
    return <div>Hi zw</div>;
  }
}
export default Foo;
```

结果 90%+的候选人都回答能看到，理由时 componentDidMount 生命周期是 DOM 节点已被添加到页面中后执行的，但实际并不能看到

但是如果用下面的这样的代码代替，估计都能回答正确，其关键就是同步+单线程，虽然 render 已经把 DOM 节点添加到 body 了，但是后续的 delay 一直占用线程，导致 GUI 线程无法渲染相应的 DOM 节点

```js
const delay = (time = 5000) => {
  let now = Date.now();
  const start = now;
  while (now - start < time) {
    now = Date.now();
  }
};
const render = () => {
  const ele = document.createElement('span');
  ele.appendChild(document.createTextNode('Hi zw'));
  document.body.appendChild(ele);
};
const componentDidMount = () => {
  delay();
};

render();
componentDidMount();
```

下面用 useEffect 模拟 componentDidMount 实现上面的场景，看如果是如何的？

```jsx | pure
import React, { useEffect } from 'react';
const delay = (time = 5000) => {
  let now = Date.now();
  const start = now;
  while (now - start < time) {
    now = Date.now();
  }
};
const Foo = () => {
  useEffect(() => {
    delay();
  }, []);
  return <div>Hi zw</div>;
};
export default Foo;
```

结果打开页面后会看到 DOM 被渲染了，useEffect 官方是这样定义的

## useEffect

> 使用 useEffect 完成副作用操作。赋值给 useEffect 的函数会在组件渲染到屏幕之后执行。你可以把 effect 看作从 React 的纯函数式世界通往命令式世界的逃生通道。

签名：

```ts
function useEffect(effect: EffectCallback, deps?: DependencyList): void;
```

因为可以理解 useEffect 的回调函数是异步执行的，可以简单理解为

```js
const render = () => {
  // ...
};
const effectCallback = () => {
  delay();
};

render();
setTimeout(effectCallback);
```

这样 useEffect 就不会阻塞页面的渲染，这是它的优点，但是由于会渲染多次，在某些场景会变成缺点，比如在做一 DOM 节点样式、位置等信息渲染时就会出现抖动的情况。这个时候就需要使用 useLayoutEffect

## useLayoutEffect

> 其函数签名与 useEffect 相同，但它会在所有的 **DOM 变更之后同步调用 effect**。可以使用它来读取 DOM 布局并同步触发重渲染。在浏览器执行绘制之前，useLayoutEffect 内部的更新计划将被同步刷新。

加粗部分翻译为：

```js
render();
effectCallback();
```

## 总结

- useEffect(cb, [])并不是 componentDidMount，useLayoutEffect 和 componentDidMount 更相近
- useEffect 是在 DOM 添加到页面，并且浏览器完成渲染后才执行的，useLayoutEffect 是在 DOM 添加到页面同步调用的，所以会阻塞页面渲染
