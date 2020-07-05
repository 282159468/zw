---
title: React Effect 更新链
---

## Fiber 中的副作用

## 创建 Effect 链

创建 Effect 链是在 completeWork 过程中进行的，所以为深度优先的遍历，从最内层开始创建 effect 链

```js
function completeUnitOfWork(unitOfWork: Fiber): void {
  let completedWork = unitOfWork;
  do {
    const current = completedWork.alternate;
    const returnFiber = completedWork.return;
    // 副作用中不包括异常
    if ((completedWork.effectTag & Incomplete) === NoEffect) {
      next = completeWork(current, completedWork, renderExpirationTime);
      if (next !== null) {
        workInProgress = next;
        return;
      }

      if (
        returnFiber !== null &&
        // 如果父节点有异常不会处理了
        (returnFiber.effectTag & Incomplete) === NoEffect
      ) {
        // 自身子节点有更新
        // 如果completedWork的子节点有更新，这些更新是挂在completedWork.firstEffect上的，
        // returnFiber.firstEffect就等于completedWork.firstEffect
        if (returnFiber.firstEffect === null) {
          returnFiber.firstEffect = completedWork.firstEffect;
        }
        // 非最内层时 completedWork.lastEffect可能有值
        if (completedWork.lastEffect !== null) {
          // 非第一次，链接尾首
          if (returnFiber.lastEffect !== null) {
            returnFiber.lastEffect.nextEffect = completedWork.firstEffect;
          }
          // 第一次初始化父节点lastEffect等当前节点completedWork.lastEffect
          returnFiber.lastEffect = completedWork.lastEffect;
        }

        // 自身有更新
        const effectTag = completedWork.effectTag;
        if (effectTag > PerformedWork) {
          // lastEffect不为空，firstEffect肯定也不空
          if (returnFiber.lastEffect !== null) {
            // 处理同级的更新链 prevCompletedWork.nextEffect = completedWork
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
      workInProgress = siblingFiber;
      return;
    }
    completedWork = returnFiber;
    workInProgress = completedWork;
  } while (completedWork !== null);
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

## 首次渲染 Effect 链

打 effectTag 标记是根据 shouldTrackSideEffects 决定的，workInProgress.alternate 有值时 shouldTrackSideEffects 为 true， 首次渲染时只有 RootFiber.alternate 有值

所以只有 RootFiber 的子节点 App-fiber.effectTag 大于 PerformedWork

因为只有 App-fiber.effectTag 自身有更新，所以只有 RootFiber.firstEffect=App-fiber，

其他 Fiber.firstEffect 都是 null

小结：

- 只有一个子节点时 firstEffect 和 lastEffect 是相等的
- 首次渲染只有 RootFiber.firstEffect 有值
- 随后的 commit phase 就可以根据 RootFiber.firstEffect 进行真实 DOM 添加了

## 二次更新 Effect 链

当 setState 更新 color 后

```js
const effectTag = completedWork.effectTag;
if (effectTag > PerformedWork) {
  if (returnFiber.lastEffect !== null) {
    // 假如元素是：<div><b/><i/></div>
    // 第二次 div.lastEffect = b
    // 第三次 b.nextEffect = c
    returnFiber.lastEffect.nextEffect = completedWork;
  } else {
    // 第一次div.firstEffect = div.lastEffect = c
    returnFiber.firstEffect = completedWork;
  }
  // 最后div.lastEffect = c
  returnFiber.lastEffect = completedWork;
}
```

- [ ] 更新时 Foo 的 effecTage = 1
- [ ] i-fiber.nextEffect = p-fiber
