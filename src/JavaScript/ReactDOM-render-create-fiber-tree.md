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

function completeUnitOfWork() {
  let next;
  if (!enableProfilerTimer || (completedWork.mode & ProfileMode) === NoMode) {
    next = completeWork(current, completedWork, renderExpirationTime);
  } else {
    startProfilerTimer(completedWork);
    next = completeWork(current, completedWork, renderExpirationTime);
  }

  // 有子节点继续转到beginWork生成Fiber
  if (next !== null) {
    workInProgress = next;
    return;
  }
  // 处理兄弟、父级
  const siblingFiber = completedWork.sibling;
  if (siblingFiber !== null) {
    workInProgress = siblingFiber;
    return;
  }
  completedWork = returnFiber;
  workInProgress = completedWork;
}
```

## 第一阶段

执行 ReactDOM_render 开始创建 fiber 树，从上/rootFiber 到下开始处理

## 1

```js
workInProgress = rootFiber = {
  stateNode: FiberRootNode,
};

const ClassAppFiber = {
  type: ClassApp,
  stateNode: new ClassApp(),
};
const next = ClassAppFiber;
rootFiber.child = next;
workInProgress = next;
```

## 2

```js
const divfiber = {
  type: `div`,
  pendingProps: {
    children: [
      { $$typeof: Symbol(react.element), type: 'span' },
      // ...
      {
        $$typeof: Symbol(react.element),
        props: { count: 0 },
        type: ClassA,
      },

      {
        $$typeof: Symbol(react.element),
        props: { count: 0 },
        type: FuncC,
      },
    ],
  },
  stateNode: document.createComment('div'),
};
const next = divfiber;
ClassAppFiber.child = next;
workInProgress = next;
```

## 3

这一步有点特殊，由于 workInProgress = divfiber，他的 pendingProps.children 是数组所以会调用一个`reconcileChildrenArray`
的方法处理兄弟节点关系，可以看到这步是一下创建了同级所有兄弟 Fiber

```js
function reconcileChildrenArray(returnFiber) {
  for (; newIdx < newChildren.length; newIdx++) {
    const newFiber = createChild(returnFiber);
    if (previousNewFiber === null) {
      resultingFirstChild = newFiber;
    } else {
      previousNewFiber.sibling = newFiber;
    }
    previousNewFiber = newFiber;
  }
  return resultingFirstChild;
}
// spanFiber就是resultingFirstChild
// 这里就可以看出child是指向第一个子节点
// 然后遍历的时候通过sibling处理所有兄弟节点
const spanFiber = {
  type: `span`,
  pendingProps: { children: 0 },
};
const next = spanFiber;
ClassAppFiber.child = next;
workInProgress = next;
```

## 4

处理 spanFiber 节点

```js
const next = null;
```

## completeUnitOfWork

next 为空，循环进入 completeUnitOfWork 分支，这时 workInProgress 还是等于 spanFiber

注：React 中使用的是 textContent，innerText,innerHTML 的区别

```js
function completeUnitOfWork() {
  next = completeWork(current, completedWork, renderExpirationTime);
  // 有子节点继续处理
  if (next !== null) {
    workInProgress = next;
    return;
  }
  // 没有子节点，接着处理兄弟节点
  if (siblingFiber !== null) {
    workInProgress = siblingFiber;
    return;
  }
}
```

## completeWork

- finalizeInitialChildren

### 处理 DOM 内容

JSX 里的 DOM 和相差内容在这步初始化，通过 key 处理 DOM 的 children、style、dangerouslySetInnerHTML

```js
const instance = document.createElement('span');
instance.textContent = '0';

appendAllChildren(instance, workInProgress, false, false);

spanFiber.stateNode = instance;
```

```js
const appendAllChildren = function(
  parent: Instance,
  workInProgress: Fiber,
  needsVisibilityToggle: boolean,
  isHidden: boolean,
) {
  // We only have the top Fiber that was created but we need recurse down its
  // children to find all the terminal nodes.
  let node = workInProgress.child;
  while (node !== null) {
    if (node.tag === HostComponent || node.tag === HostText) {
      appendInitialChild(parent, node.stateNode);
    } else if (enableFundamentalAPI && node.tag === FundamentalComponent) {
      appendInitialChild(parent, node.stateNode.instance);
    } else if (node.tag === HostPortal) {
      // If we have a portal child, then we don't want to traverse
      // down its children. Instead, we'll get insertions from each child in
      // the portal directly.
    } else if (node.child !== null) {
      node.child.return = node;
      node = node.child;
      continue;
    }
    if (node === workInProgress) {
      return;
    }
    while (node.sibling === null) {
      if (node.return === null || node.return === workInProgress) {
        return;
      }
      node = node.return;
    }
    // 设置兄弟的父节点
    node.sibling.return = node.return;
    // 继续遍历兄弟节点
    node = node.sibling;
  }
};
```
