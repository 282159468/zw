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
      size: 'big',
    };
  }

  componentDidMount() {
    this.setState({ color: 'blue', size: 'small' });
  }

  render() {
    const { color, size } = this.state;
    return (
      <div className={size}>
        {size === 'big' && <b>size=small</b>}
        {size === 'small' && <i>size=small</i>}
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

```js
function placeSingleChild(newFiber: Fiber): Fiber {
  if (shouldTrackSideEffects && newFiber.alternate === null) {
    newFiber.effectTag = Placement;
  }
  return newFiber;
}
```

所以只有 RootFiber 的子节点 App-fiber.effectTag 大于 PerformedWork

因为只有 App-fiber.effectTag 自身有更新，所以只有 RootFiber.firstEffect=App-fiber，

其他 Fiber.firstEffect 都是 null

小结：

- 只有一个子节点时 firstEffect 和 lastEffect 是相等的
- 首次渲染只有 RootFiber.firstEffect 有值
- 随后的 commit phase 就可以根据 RootFiber.firstEffect 进行真实 DOM 添加了

## 二次更新 Effect 链

```js
if (returnFiber.firstEffect === null) {
  returnFiber.firstEffect = completedWork.firstEffect;
}
/**
 * 处理子节点有更新
 * 当前节点不是叶子节点的情况，不是叶子节点completedWork.lastEffect才可能有值
 */
if (completedWork.lastEffect !== null) {
  // 存在lastEffect情况链接尾首
  if (returnFiber.lastEffect !== null) {
    returnFiber.lastEffect.nextEffect = completedWork.firstEffect;
  }
  // 父级lastEffect指向当前层lastEffect
  returnFiber.lastEffect = completedWork.lastEffect;
}

/**
 * 自身有更新
 * 把自身更新添加到上层
 */
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

Effect 链多数在 complateWork 中完成更新，有一个例外，删除类型的副作用在 beginWork 调度子节点中处理

```js
function deleteChild(returnFiber: Fiber, childToDelete: Fiber): void {
  if (!shouldTrackSideEffects) {
    return;
  }
  const last = returnFiber.lastEffect;
  if (last !== null) {
    // 之前父节点的lastEffect.nextEffect指向该节点
    last.nextEffect = childToDelete;
    // 把要删除的节点更新到父节点lastEffect上
    returnFiber.lastEffect = childToDelete;
  } else {
    // 跟上面套路一样firstEffect->N1Fiber->nextEffect->N2Fiber->...->lastEffect
    returnFiber.firstEffect = returnFiber.lastEffect = childToDelete;
  }
  childToDelete.nextEffect = null;
  // 这里并没有真正删除Fiber节点，只是打标记
  childToDelete.effectTag = Deletion;
}
```

### completedWork = i-fiber

二次更新 alternate 树上没有 b-fiber 了，所以第一个循环处理的就是 i-fiber

> div-fiber.lastEffect = div-fiber.firstEffect = b-fiber

**子节点更新**

无（i-fiber 是叶子）

**自身更新**

div-fiber.lastEffect(b-fiber).nextEffect = completedWork;

div-fiber.lastEffect = completedWork;

## 自答题

- [ ] 为什么更新时 Foo 的 effecTage = 1
- [ ] i-fiber.nextEffect = p-fiber
- [ ] 为什么`{ false &&</i> }`不会显示 false
