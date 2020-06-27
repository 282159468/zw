---
title: React首次渲染创建fiber树
---

## 初始化 workInProgress

理解为正在进程中的任务，workInProgress 就是一个 Fiber 对象，可以简单的把他理解为全局变量；首次渲染会通过 RootFiber 初始化 workInProgress，

这里的 RootFiber 视为 current，创建好的 workInProgress 和 current 互为替身 alternate，即：

```js
function ReactDOM_render() {
  prepareFreshStack();
}

function prepareFreshStack() {
  workInProgress = createFiber();
  // current = RootFiber
  // 互为替身，后续创建的fiber节点等等都是挂在current.alternate
  // 如果最终完成更新会用alternate替换current
  workInProgress.alternate = current;
  current.alternate = workInProgress;
  workInProgress = RootFiber;
  workLoopSync();
}
```

下面会通过 workLoopSync 在 workInProgress 上递归创建 child Fiber，注意这里的 workInProgress 只是 RootFiber 的替身(RootFiber.alternate)，而不是 RootFiber 本身

## 执行递归

workLoopSync 从 初始化的 workInProgress(RootFiber)开始循环执行同步任务:

```js
function workLoopSync() {
  while (workInProgress !== null) {
    performUnitOfWork(workInProgress);
  }
}
```

开始执行单元任务

```js
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
```

## beginWork 阶段

beginWork 会实例化组件(new)，把实例赋值给 Fiber.stateNode；

调用组件 render 函数，函数组件直接执行，获取到 ReactElment，然后从外到内遍历 ReactElment 根据不同的 ReactElment.type 创建不同类型的 Fiber

beginWork 另外一个作用是打 effectTag

```js
function placeSingleChild(newFiber: Fiber): Fiber {
  // This is simpler for the single child case. We only need to do a
  // placement for inserting new children.
  if (shouldTrackSideEffects && newFiber.alternate === null) {
    newFiber.effectTag = Placement;
  }
  return newFiber;
}

workInProgress.effectTag |= PerformedWork;
```

### 类组件生命周期

```js
let instance = workInProgress.stateNode;
if (instance === null) {
  instance = new ctor(props, context);
  ctor.getDerivedStateFromProps(nextProps, prevState);
  // In order to support react-lifecycles-compat polyfilled components,
  // Unsafe lifecycles should not be invoked for components using the new APIs.
  // 使用新周期就不会执行旧的生命周期
  if (
    typeof ctor.getDerivedStateFromProps !== 'function' &&
    typeof instance.getSnapshotBeforeUpdate !== 'function' &&
    (typeof instance.UNSAFE_componentWillMount === 'function' ||
      typeof instance.componentWillMount === 'function')
  ) {
    componentWillMount(workInProgress, instance);
  }
  workInProgress.stateNode = instance;
}
// 最后执行render函数获取Element创建子Fiber
const next = instance.render();
```

## JSX 示例

```jsx | pure
<div>
  <span id="S1">
    <i>A</i>
  </span>
  <span id="S2">B</span>
  <span id="S3">C</span>
</div>
```

1.  beginWork 创建 DivFiber
2.  beginWork 创建 S1Fiber，S2Fiber，S3Fiber 三个 Fiber，Element 的 props 是{children:[]}

    DivFiber.child = S1Fiber

    S1Fiber.return = DivFiber

    S1Fiber.sibling = S2Fiber

    S2Fiber.sibling = S3Fiber

3.  beginWork 创建 IFiber

    S1Fiber.child = IFiber

    IFiber.return = S1Fiber

4.  i 标签下面没有子节点，所以流程跳转到 completeWork，如果这里 S2、S3 还有子节点也会跳转到 completeWork

```js
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

## completeWork 阶段

completeWork 以从内到外的方式递归，创建 DOM 节点，给节点添加内容，处理 style、dangerouslySetInnerHTML、Event 等任务

> React 中 DOM 添加内容使用的是 textContent，innerText,innerHTML 的区别，其中需要处理一些特殊情况

- ReactDOM.createProtal()
- input、textarea

创建完成最后，通过判断 Fiber.child 是否有值，有的话执行 appendAllChildren 把 DOM 一步一步往上添加，

```js
function appendAllChildren(Fiber) {
  if (Fiber.child) {
    Fiber.stateNode.appendChild(Fiber.child.stateNode);
  }
}
```

接上面第 4 步

5.  completeWork 创建 i

    ```js
    const instance = document.createElement('i');
    instance.textContent = 'A';
    IFiber.stateNode = instance;
    appendAllChildren(IFiber);
    ```

6.  i 没有兄弟节点返回到父级，completeWork 创建 span

    ```js
    const instance = document.createElement('span');
    S1Fiber.stateNode = instance;
    appendAllChildren(S1Fiber);
    ```

7.  S1 有兄弟节点 S2，workInProgerss = S2，workLoopSync 循环继续

重复 5，6，7 步骤

上面的 JSX 示例中全是 DOM 节点，没有组件调用，其实组件调用在 complateWork 阶段基本啥也不干，

`<Button/>`其最终结果就是 React Element，而在 beginWork 阶段就使用 Element 把 Fiber 创建好了

8. S3 没有兄弟节点返回到父级，completeWork 创建 div

   ```js
   const instance = document.createElement('div');
   S1Fiber.stateNode = instance;
   appendAllChildren(DivFiber);
   ```

9. 向上递归到 RootFiber，没有兄弟、父亲循环结束

```js
function completeUnitOfWork() {
  do {
    next = completeWork(current, completedWork, renderExpirationTime);
    // 有子节点继续处理
    if (next !== null) {
      workInProgress = next;
      return;
    }

    // 处理副作用
    if (
      returnFiber !== null &&
      (returnFiber.effectTag & Incomplete) === NoEffect
    ) {
      if (returnFiber.firstEffect === null) {
        returnFiber.firstEffect = completedWork.firstEffect;
      }
      if (completedWork.lastEffect !== null) {
        if (returnFiber.lastEffect !== null) {
          returnFiber.lastEffect.nextEffect = completedWork.firstEffect;
        }
        returnFiber.lastEffect = completedWork.lastEffect;
      }

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

    // 没有子节点，接着处理兄弟节点
    if (siblingFiber !== null) {
      workInProgress = siblingFiber;
      return;
    }
    // 没有兄弟节点返回父级，workLoopSync进入下一次循环
    completedWork = returnFiber;
    // Update the next thing we're working on in case something throws.
    workInProgress = completedWork;
  } while (completedWork !== null);
}
```

## 总结写在这

- 主要分为 beginWork、completeWork
- beginWork 从 RootFiber 开始从上到下的路径创建 Fiber 节点，当该路径没有子节点时会转到 completeWork
- completeWork 通过 sibling、return 从下到上路径根据 Fiber 完成节点的 stateNode，即创建完成 DOM 事件、样式、内容等
- completeWork 递归到 sibling 兄弟节点时会转到 beginWork 继续创建 Fiber 节点
- completeWork 一直递归（return）到 RootFiber 层时完成创建
- 创建完成后的 Fiber Tree 指向的是 RootFiber.alternate

## 另一个示例

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

渲染入口调用 prepareFreshStack，初始化 workInProgress

```js
function ReactDOM_render() {
  prepareFreshStack();
}

function prepareFreshStack() {
  workInProgress = createFiber();
  // current = RootFiber
  // 互为替身，后续创建的fiber节点等等都是挂在current.alternate
  // 如果最终完成更新会用alternate替换current
  workInProgress.alternate = current;
  current.alternate = workInProgress;
  workInProgress = RootFiber;
  workLoopSync();
}

// workLoopSync 从 RootFiber 开始循环执行同步任务:
function workLoopSync() {
  while (workInProgress !== null) {
    performUnitOfWork(workInProgress);
  }
}

// 开始执行单元任务
function performUnitOfWork(unitOfWork: Fiber): void {
  //
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
  do {
    // completeWork内的分支大部分都返回null，只有个别情况有值，猜测是render中有产生新的更新
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
    // 没有兄弟节点返回父级，workLoopSync进入下一次循环
    // 直到RootFiber.return = null退出循环
    completedWork = returnFiber;
    // Update the next thing we're working on in case something throws.
    workInProgress = completedWork;
  } while (completedWork !== null);
}
```

入口执行 ReactDOM.render 开始创建 Fiber 树，从上 RootFiber 到下开始创建 Fiber

## 1

```js
workInProgress = RootFiber = {
  stateNode: FiberRootNode,
};

const ClassAppFiber = {
  type: ClassApp,
  stateNode: new ClassApp(),
};
const next = ClassAppFiber;
RootFiber.child = next;
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
// 然后递归的时候通过sibling处理所有兄弟节点
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
const instance = document.createElement('span');
instance.textContent = '0';
appendAllChildren(instance, workInProgress, false, false);

// HOST类型组件其实就是DOM节点
spanFiber.stateNode = instance;

const appendAllChildren = function(
  parent: Instance,
  workInProgress: Fiber,
  needsVisibilityToggle: boolean,
  isHidden: boolean,
) {
  let node = workInProgress.child;
  while (node !== null) {
    if (node.tag === HostComponent || node.tag === HostText) {
      appendInitialChild(parent, node.stateNode);
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
    // 继续递归兄弟节点
    node = node.sibling;
  }
};
```

处理完后返回 null，即 next 为空，循环进入 completeUnitOfWork 分支，这时 workInProgress 还是等于 spanFiber
