---
title: React首次渲染创建fiber树
---

# React 首次渲染 - 创建 fiber 树

```jsx | pure
export default class App extends React.PureComponent {
  constructor() {
    super();
    this.state = { a: 0 };
  }

  render() {
    return (
      <div>
        <span>{this.state.a}</span>
        <A num={this.state.a} />
        <C count={this.state.a} />
      </div>
    );
  }
}

function C() {
  return (
    <div>
      <span>c-span</span>
      <i>c-i</i>
    </div>
  );
}

class A extends React.PureComponent {
  render() {
    return <div>AAA</div>;
  }
}
```

创建流程

```js
function ReactDOM_render() {
  prepareFreshStack();
}

// 渲染入口调用prepareFreshStack，初始化workInProgress
function prepareFreshStack() {
  workInProgress = rootFiber;
  workLoopSync();
}

// workLoopSync 从 rootFiber 开始循环执行同步任务:

function workLoopSync() {
  while (workInProgress !== null) {
    performUnitOfWork(workInProgress);
  }
}

// 开始按单元执行任务
function performUnitOfWork(unitOfWork: Fiber): void {
  const current = unitOfWork.alternate;
  let next;
  if (enableProfilerTimer && (unitOfWork.mode & ProfileMode) !== NoMode) {
    next = beginWork(current, unitOfWork, renderExpirationTime);
  } else {
    next = beginWork(current, unitOfWork, renderExpirationTime);
  }
  unitOfWork.memoizedProps = unitOfWork.pendingProps;
  if (next === null) {
    completeUnitOfWork(unitOfWork);
  } else {
    workInProgress = next;
  }
}

function completeUnitOfWork() {
  if (siblingFiber !== null) {
    workInProgress = siblingFiber;
    return;
  }
  completedWork = returnFiber;
  workInProgress = completedWork;
}

function beginWork() {
  switch (workInProgress.tag) {
    case IndeterminateComponent: {
    }
    case LazyComponent: {
    }
    case FunctionComponent: {
    }
    case ClassComponent: {
    }
    case HostRoot:
      return updateHostRoot(current, workInProgress, renderExpirationTime);
    case HostComponent:
    case HostText:
    case SuspenseComponent:
    case HostPortal:
  }
}
```

## 第一阶段

执行 ReactDOM_render 开始创建 fiber 树，从上/rootFiber 到下开始处理

第一次

```js
workInProgress = rootFiber;
Fiber = {
  stateNode: FiberRootNode,
};
workInProgress = next = ClassAppFiber;
```

第二次

```js
workInProgress = ClassAppFiber;
Fiber = {
  type: ClassApp,
  stateNode: new ClassApp(),
};
workInProgress = next = divfiber;
```

第二次

```js
workInProgress = divfiber;
Fiber = {
  type: `div`,
  pendingProps: {
    children: [
      { $$typeof: Symbol(react.element), type: 'span' },
      // ...
      {
        $$typeof: Symbol(react.element),
        props: { count: 0 },
        type: C,
      },
    ],
  },
  stateNode: document.createComment('div'),
};
workInProgress = next = divfiber;
```
