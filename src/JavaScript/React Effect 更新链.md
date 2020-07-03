---
title: React Effect 更新链
---

## Fiber 中的副作用

## 更新副作用链

```js
function completeUnitOfWork(unitOfWork: Fiber): void {
  let completedWork = unitOfWork;
  do {
    const current = completedWork.alternate;
    const returnFiber = completedWork.return;

    // 副作用中不包括异常
    if ((completedWork.effectTag & Incomplete) === NoEffect) {
      setCurrentDebugFiberInDEV(completedWork);
      let next;
      if (
        !enableProfilerTimer ||
        (completedWork.mode & ProfileMode) === NoMode
      ) {
        next = completeWork(current, completedWork, renderExpirationTime);
      } else {
        startProfilerTimer(completedWork);
        next = completeWork(current, completedWork, renderExpirationTime);
        stopProfilerTimerIfRunningAndRecordDelta(completedWork, false);
      }
      resetCurrentDebugFiberInDEV();
      resetChildExpirationTime(completedWork);

      if (next !== null) {
        workInProgress = next;
        return;
      }

      if (
        returnFiber !== null &&
        // 如果父节点有异常不会处理了
        (returnFiber.effectTag & Incomplete) === NoEffect
      ) {
        // 处理子节点更新
        // 如果父节点副作用还是空的，第一个吃爬海的副作用
        // completedWork的子节点有更新并挂在completedWork.firstEffect上的，
        // 但是completedWork自己没有更新，所以把子节点的更新再往上挂到returnFiber.firstEffect上
        if (returnFiber.firstEffect === null) {
          returnFiber.firstEffect = completedWork.firstEffect;
        }
        if (completedWork.lastEffect !== null) {
          if (returnFiber.lastEffect !== null) {
            returnFiber.lastEffect.nextEffect = completedWork.firstEffect;
          }
          returnFiber.lastEffect = completedWork.lastEffect;
        }

        // 处理自身更新
        // 这里是completedWork自己有更新就把自己挂到父节点的returnFiber.firstEffect上
        const effectTag = completedWork.effectTag;
        if (effectTag > PerformedWork) {
          if (returnFiber.lastEffect !== null) {
            returnFiber.lastEffect.nextEffect = completedWork;
          } else {
            returnFiber.firstEffect = completedWork;
          }
          returnFiber.lastEffect = completedWork;
        }
      }
    } else {
      // 有异常的情况
    }

    const siblingFiber = completedWork.sibling;
    if (siblingFiber !== null) {
      // If there is more work to do in this returnFiber, do that next.
      workInProgress = siblingFiber;
      return;
    }
    // Otherwise, return to the parent
    completedWork = returnFiber;
    // Update the next thing we're working on in case something throws.
    workInProgress = completedWork;
  } while (completedWork !== null);

  // We've reached the root.
  if (workInProgressRootExitStatus === RootIncomplete) {
    workInProgressRootExitStatus = RootCompleted;
  }
}
```

例子

```jsx | pure
import React, { PureComponent } from 'react';

export default class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      color: 'red',
      cls: 'big',
    };
  }

  componentDidMount() {
    this.setState({ color: 'blue', cls: 'small' });
  }

  render() {
    const { color, cls } = this.state;
    return (
      <div className={cls}>
        {cls === 'big' && <b>cls=small</b>}
        {cls === 'small' && <i>cls=small</i>}
        <Foo color={color} />
      </div>
    );
  }
}

const Foo = ({ color }) => {
  return [<p style={{ color }}>AAA</p>, <span style={{ color }}>BBB</span>];
};
```

上面两个组件会创建以下 Fiber 节点

- RootFiber
- App-fiber
- div-fiber
- b-fiber
- i-fiber
- Foo-fiber
- p-fiber
- span-fiber

## 首次渲染更新链

打 effectTag 标记是根据 shouldTrackSideEffects 决定的，workInProgress.alternate 有值时 shouldTrackSideEffects 为 true， 首次渲染时只有 RootFiber.alternate 有值

所以只有 RootFiber 的子节点 App-fiber.effectTag 大于 PerformedWork

## 处理子节点更新

因为只有 App-fiber.effectTag 自身有更新，所以只有 RootFiber.firstEffect 有值，

所以`returnFiber.firstEffect = completedWork.firstEffect;`这句在首次渲染时基本上是摆设

```js
if (returnFiber.firstEffect === null) {
  // 一直在执行，一直都是null
  returnFiber.firstEffect = completedWork.firstEffect;
}
// 完全的摆设因为lastEffect全是空的除了RootFiber
if (completedWork.lastEffect !== null) {
  if (returnFiber.lastEffect !== null) {
    returnFiber.lastEffect.nextEffect = completedWork.firstEffect;
  }
  returnFiber.lastEffect = completedWork.lastEffect;
}
```

### 处理自身更新

```js
const effectTag = completedWork.effectTag;
if (effectTag > PerformedWork) {
  // 父节点RootFiber.lastEffect肯定为空
  if (returnFiber.lastEffect !== null) {
    returnFiber.lastEffect.nextEffect = completedWork;
  } else {
    // RootFiber.firstEffect = App-fiber
    returnFiber.firstEffect = completedWork;
  }
  // RootFiber.lastEffect = App-fiber
  returnFiber.lastEffect = completedWork;
}
```

小结：

- 只有一个子节点时 firstEffect 和 lastEffect 是相等的
- 首次渲染只有 RootFiber.firstEffect 有值
- 随后的 commit phase 就可以根据 RootFiber.firstEffect 进行真实 DOM 添加了

## 二次更新链

当 setState 更新 color 后

```js
const effectTag = completedWork.effectTag;
if (effectTag > PerformedWork) {
  if (returnFiber.lastEffect !== null) {
    returnFiber.lastEffect.nextEffect = completedWork;
  } else {
    returnFiber.firstEffect = completedWork;
  }
  returnFiber.lastEffect = completedWork;
}
```
