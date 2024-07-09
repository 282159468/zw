# React bailout 性能优化策略

## 需要 bailout 的原因

React 相较 Vue 没有依赖收集，React 中某一层级组件更新后，理论上 React 不知道更新会涉及到哪些组件，所以会从根节点开始 schedule 更新任务，任务的内容就是 reconcile fiber 节点及后续的 commit 更新 UI

如果没有 bailout 干预， 任务就会跑完整颗树特别效率低，bailout 性能优化目的就是跳转一些没有更新的组件

## bailout 优化策略

bailout 分为完全复用、克隆复用两种优化策略，满足下面的 bailout 前提条件后会选择其一进行优化

```js
function bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes) {
  // 跳过策略：子节点没有更新，直接跳过
  if (!includesSomeLane(renderLanes, workInProgress.childLanes)) {
    {
      return null; // 退出beginWork循环，又当前节点进入completeWork
    }
  }

  // 复用策略：克隆所有子节点Fiber对象
  cloneChildFibers(current, workInProgress);
  return workInProgress.child; // next = child继续beginWork
}
```

## bailout 前提条件

**内部条件**

逻辑上针对的对象主要是子节点

1. 自身不包含更新，包括：state、context、foreUpdate、syncStore 等
2. oldProps === newProps
3. context 没有更新
4. workInProgress.type === current.type `div`=>`p`

```js
function beginWork(current, workInProgress, renderLanes) {
  if (current !== null) {
    var oldProps = current.memoizedProps;
    var newProps = workInProgress.pendingProps;
    if (oldProps !== newProps || hasContextChanged() || workInProgress.type !== current.type) {
      didReceiveUpdate = true;
    } else {
      var hasScheduledUpdateOrContext = checkScheduledUpdateOrContext(current, renderLanes);
      if (!hasScheduledUpdateOrContext && (workInProgress.flags & DidCapture) === NoFlags) {
        didReceiveUpdate = false;
        return attemptEarlyBailoutIfNoScheduledUpdate(current, workInProgress, renderLanes);
      }
      if ((current.flags & ForceUpdateForLegacySuspense) !== NoFlags) {
        didReceiveUpdate = true;
      } else {
        didReceiveUpdate = false;
      }
    }
  }

  // 根据fiber tag类型更新组件
  switch (workInProgress.tag) {
    case IndeterminateComponent: {
      return mountIndeterminateComponent(current, workInProgress, workInProgress.type, renderLanes);
    }
    // ...
  }
}
```

**辅助优化**

逻辑上针对的对象主要是自身节点，fiber 进入 beginWork，当前 fiber 必定会走到更新流程中（调用 render 函数），在更新流程中判断是否命中 bailout，通过内部条件和辅助优化决定是否使用 bailout 策略

优化手段有：memo、shouldComponentUpdate、PureComponent 等

考虑下面代码 setCount 后 Child 组件会 rerender 么？

```tsx | pure
function Parent() {
  const [count, setCount] = useState(0);
  console.log('Parent');
  return (
    <div
      style={{ width: 222, height: 222, background: '#ccc' }}
      onClick={() => {
        setCount(1);
      }}
    >
      <Child />
    </div>
  );
}

const Child = () => {
  console.log('Child');
  return <em>child</em>;
};

export default Parent;
```

## 更新过程

- setCount Parent 标记有更新
- 从 root 开始调度这个更新
- filerRoot 进入到 beginWork，满足**前提条件**，但是因为子节点有更新，选择**复用** bailout 策略

  - bailoutOnAlreadyFinishedWork 返回子节点 Parent
  - Parent 进入 beginWork
  - Parent updateFunctionComponent
    - renderWithHooks 执行组件函数 Parent
      - 执行 useState，比较传入 state 与当前不相等 didReceiveUpdate = true，更新 state`[a]`
      - didReceiveUpdate = true 无法使用优化策略 bailoutOnAlreadyFinishedWork，返回 jsx
      - reconcileChildren(jsx) 返回 DivFiler

- DivFiler 进入 beginWork，oldProps !== newProps，无法使用优化策略 bailoutOnAlreadyFinishedWork，reconcileChildren 返回 Child
- Child 进入 beginWork，没有辅助优化，调用组件函数 rerender

**两次命中机会**

对于每个节点有两次命中优化策略

1. 父节命命中跳过子节点 reconcileChildren，当前 beginWork 返回 null，结束 beginWork 流程
2. 父节点 render，子节点进入 beginWork，子节点自身使用辅助优化命中

如果父组件更新，子组件没有使用辅助优化，必然引起子组件更新

## render 被执行，UI 不更新

考虑下面代码，点击 setCount 后更新过程

```tsx
import React, { useState, memo } from 'react';
function Parent() {
  const [count, setCount] = useState(0);
  console.log('Parent');
  const color = `#${Math.random().toString(16).slice(2, 8)}`;
  return (
    <div
      style={{ width: 222, height: 222, background: color }}
      onClick={() => {
        setCount(1);
        setCount(0);
      }}
    >
      {color}
    </div>
  );
}

export default Parent;
```

点击后，可以看到会输出`Parent`执行，说明组件函数被调用，但是界面上却没有更新，即没有显示最新的`Math.random()`结果

更新过程和原因如下：

- 调度更新任务，rootFiber 进入 beginWork
  - 命中克隆复用策略，返回 ParentFiber
- ParentFiber 进入 beginWork
  - 执行组件函数输出`console.log('Parent')`，
  - 对比前后 state 相等，子节点没有更新，选择跳转策略，
  - 丢弃 Parent 返回的 jsx，所以 UI 不会更新`Math.random()`
  - 退出 beginWork，流程刚好与`[a]`相反

注意：后续点击会组件依然会被调用输出`Parent`，稍微改动一下结果会大不相同，代码如下：

## 组件函数被执行两次

```tsx
import React, { useState, memo } from 'react';

function Parent() {
  const [count, setCount] = useState(0);
  console.log('Parent');
  const color = `#${Math.random().toString(16).slice(2, 8)}`;
  return (
    <div
      style={{ width: 222, height: 222, background: color }}
      onClick={() => {
        setCount(1);
      }}
    >
      {color}
    </div>
  );
}

export default Parent;
```

更新过程

- 第一次点击， 标记 wip 有更新，beginWork 输出 `Parent`，reconcile 后更新 UI，替身交换 current = wip，当前 state:1
- 第二次点击，wip 是上一轮更新后的 current，且包含标记的更新，再次调度进入 renderWithHooks，所以再次输出`Parent`，但是由于 didReceiveUpdate:false,所以命名 bailout 跳过策略，且通过`bailoutHooks`删除更新标记
- 第三次点击， 因为再没有任务标记更新，命中 eagerState 直接退出

```js
while (workInProgress !== null && !shouldYield()) {
  performUnitOfWork(workInProgress);
}
function performUnitOfWork(unitOfWork: Fiber): void {
  let next = beginWork(current, unitOfWork, subtreeRenderLanes);

  if (next === null) {
    completeUnitOfWork(unitOfWork);
  } else {
    workInProgress = next;
  }
}

function renderWithHooks(workInProgress) {
  currentlyRenderingFiber = workInProgress; // 绑定给useState中使用的fiber
  let children = Component(props, secondArg);
}
```

## 参考

[https://github.com/Little-Gee/blog/issues/24](https://github.com/Little-Gee/blog/issues/24)

[https://juejin.cn/post/7214053344808976443](https://juejin.cn/post/7214053344808976443)
