---
title: React Fiber
---

# 了解 Fiber

从宏观角度大概了解 Fiber，不纠结细节

## Fiber 能做什么

Fiber 之前 React 渲染组件时生成虚拟 DOM 以及对比新旧虚拟 DOM 时，会长时间占用线程，由于单线程原因导致浏览器不能响应用户操作。Fiber 作用在于分拆这部分任务，执行时可以暂停，把权限交给浏览器如果有优先级高的任务优先让浏览器执行。然后再恢复之前暂停的任务。

React 渲染主要有以下三个部分

1. Virtual DOM 表示页面 DOM
2. Reconciler 对比 Virtual DOM 差异，执行生命周期函数
3. Renderer 渲染器，比如 ReactDOM 、ReactNative

由于以上机制 16 之前的生命周期 compoentWillMount componentWillReceiveProps componentWillUpdate 将会废弃，因为暂停=>恢复会造成多次执行，所以生命周期内副作用就会变的不可控

组件在第一次渲染时根据 render 函数返回的 React Element 元素创建对应的 Fiber Tree 可以称为 current，当更新时会创建新的 Fiber 称为 alternate，对比 current 和 alternate 的变化(side effect)记录到 alternate 上，更新结束后 alternate 取代 current

## 什么是 Fiber

Fiber 是一个普通对象，Fiber 和 React Element 对应，所以 Fiber 也会形成树，只不过是以 return child sibling 三个属性关联以链表形式创建

通过 return child sibling 三个属性构造 Fiber 树

- return 表示父节点

- child 表示第一个子节点

- sibling 表示兄弟节点

- [ ] Fiber 和 Element 对照图片

```ts
export type Fiber = {|
  // These first fields are conceptually members of an Instance. This used to
  // be split into a separate type and intersected with the other Fiber fields,
  // but until Flow fixes its intersection bugs, we've merged them into a
  // single type.

  // An Instance is shared between all versions of a component. We can easily
  // break this out into a separate object to avoid copying so much to the
  // alternate versions of the tree. We put this on a single object for now to
  // minimize the number of objects created during the initial render.

  // Tag identifying the type of fiber.
  // Fiber的类型,常见的ClassComponent、FunctionComponent、HostComponent(DOM)
  tag: WorkTag,

  // Unique identifier of this child.
  // 暂时没看
  key: null | string,

  // The value of element.type which is used to preserve the identity during
  // reconciliation of this child.

  // 暂时没看
  elementType: any,

  // The resolved function/class/ associated with this fiber.
  // 和Element的type差不多的，对应组件的类、函数、DOM.tagName(div)
  type: any,

  // The local state associated with this fiber.
  // 英文注释意思是Fiber的本地状态
  // 但实际是"组件"实例，Host类型组件document.createElement('div')
  stateNode: any,

  // Conceptual aliases
  // parent : Instance -> return The parent happens to be the same as the
  // return fiber since we've merged the fiber and instance.

  // Remaining fields belong to Fiber

  // The Fiber to return to after finishing processing this one.
  // This is effectively the parent, but there can be multiple parents (two)
  // so this is only the parent of the thing we're currently processing.
  // It is conceptually the same as the return address of a stack frame.
  // 父级Fiber
  return: Fiber | null,

  // Singly Linked List Tree Structure.
  // 链表的next，指向第一个子Fiber
  child: Fiber | null,
  // 兄弟Fiber
  sibling: Fiber | null,
  // 暂时没看
  index: number,

  // The ref last used to attach this node.
  // I'll avoid adding an owner field for prod and model that as functions.
  // 暂时没看
  ref:
    | null
    | (((handle: mixed) => void) & {_stringRef: ?string, ...})
    | RefObject,

  // Input is the data coming into process this fiber. Arguments. Props.
  // 即将更新的props
  pendingProps: any, // This type will be more specific once we overload the tag.
  // 当前的props
  memoizedProps: any, // The props used to create the output.

  // A queue of state updates and callbacks.
  // 更新队列
  updateQueue: mixed,

  // The state used to create the output
  // 当前组件的state
  memoizedState: any,

  // Dependencies (contexts, events) for this fiber, if it has any
  // 暂时没看
  dependencies: Dependencies | null,

  // Bitfield that describes properties about the fiber and its subtree. E.g.
  // the ConcurrentMode flag indicates whether the subtree should be async-by-
  // default. When a fiber is created, it inherits the mode of its
  // parent. Additional flags can be set at creation time, but after that the
  // value should remain unchanged throughout the fiber's lifetime, particularly
  // before its child fibers are created.
  // 严格模式、异步更新模型等
  mode: TypeOfMode,

  //更新类型
  // Effect
  effectTag: SideEffectTag,

  // 链表，下一个有更新的Fiber
  // Singly linked list fast path to the next fiber with side-effects.
  nextEffect: Fiber | null,

  // The first and last fiber with side-effect within this subtree. This allows
  // us to reuse a slice of the linked list when we reuse the work done within
  // this fiber.
  firstEffect: Fiber | null,
  lastEffect: Fiber | null,

  // Represents a time in the future by which this work should be completed.
  // Does not include work found in its subtree.
  // 过期时间
  expirationTime: ExpirationTime,

  // This is used to quickly determine if a subtree has no pending changes.
  childExpirationTime: ExpirationTime,

  // This is a pooled version of a Fiber. Every fiber that gets updated will
  // eventually have a pair. There are cases when we can clean up pairs to save
  // memory if we need to.
  // 创建更新时会基于当前的CurrentFiber(current)，克隆一个新的WorkInProgerssFiber
  // 他们互为替身
  // current.alternate = WorkInProgerssFiber
  // WorkInProgerssFiber.alternate = current
  alternate: Fiber | null,

  // Time spent rendering this Fiber and its descendants for the current update.
  // This tells us how well the tree makes use of sCU for memoization.
  // It is reset to 0 each time we render and only updated when we don't bailout.
  // This field is only set when the enableProfilerTimer flag is enabled.
  actualDuration?: number,

  // If the Fiber is currently active in the "render" phase,
  // This marks the time at which the work began.
  // This field is only set when the enableProfilerTimer flag is enabled.
  actualStartTime?: number,

  // Duration of the most recent render time for this Fiber.
  // This value is not updated when we bailout for memoization purposes.
  // This field is only set when the enableProfilerTimer flag is enabled.
  selfBaseDuration?: number,

  // Sum of base times for all descendants of this Fiber.
  // This value bubbles up during the "complete" phase.
  // This field is only set when the enableProfilerTimer flag is enabled.
  treeBaseDuration?: number,

  // Conceptual aliases
  // workInProgress : Fiber ->  alternate The alternate used for reuse happens
  // to be the same as work in progress.
  // __DEV__ only
  _debugID?: number,
  _debugSource?: Source | null,
  _debugOwner?: Fiber | null,
  _debugIsCurrentlyTiming?: boolean,
  _debugNeedsRemount?: boolean,

  // Used to verify that the order of hooks does not change between renders.
  _debugHookTypes?: Array<HookType> | null,
|};
```

Fiber 属性具体含义详细https://juejin.im/post/5d5aa4695188257573635a0d

另外一个更详细的https://github.com/y805939188/simple-react/tree/master/procedure/%E6%BA%90%E7%A0%81%E9%98%85%E8%AF%BB/fiber2

## FiberRoot

RootFiber 的实例

```js
type BaseFiberRootProperties = {|
  // The type of root (legacy, batched, concurrent, etc.)
  tag: RootTag,

  // Any additional information from the host associated with this root.
  containerInfo: any,
  // Used only by persistent updates.
  pendingChildren: any,
  // The currently active root fiber. This is the mutable root of the tree.
  current: Fiber,

  pingCache:
    | WeakMap<Wakeable, Set<ExpirationTime>>
    | Map<Wakeable, Set<ExpirationTime>>
    | null,

  finishedExpirationTime: ExpirationTime,
  // A finished work-in-progress HostRoot that's ready to be committed.
  finishedWork: Fiber | null,
  // Timeout handle returned by setTimeout. Used to cancel a pending timeout, if
  // it's superseded by a new one.
  timeoutHandle: TimeoutHandle | NoTimeout,
  // Top context object, used by renderSubtreeIntoContainer
  context: Object | null,
  pendingContext: Object | null,
  // Determines if we should attempt to hydrate on the initial mount
  +hydrate: boolean,
  // Node returned by Scheduler.scheduleCallback
  callbackNode: *,
  // Expiration of the callback associated with this root
  callbackExpirationTime: ExpirationTime,
  // Priority of the callback associated with this root
  callbackPriority: ReactPriorityLevel,
  // The earliest pending expiration time that exists in the tree
  firstPendingTime: ExpirationTime,
  // The latest pending expiration time that exists in the tree
  lastPendingTime: ExpirationTime,
  // The earliest suspended expiration time that exists in the tree
  firstSuspendedTime: ExpirationTime,
  // The latest suspended expiration time that exists in the tree
  lastSuspendedTime: ExpirationTime,
  // The next known expiration time after the suspended range
  nextKnownPendingLevel: ExpirationTime,
  // The latest time at which a suspended component pinged the root to
  // render again
  lastPingedTime: ExpirationTime,
  lastExpiredTime: ExpirationTime,
  // Used by useMutableSource hook to avoid tearing within this root
  // when external, mutable sources are read from during render.
  mutableSourceLastPendingUpdateTime: ExpirationTime,
|};

// The following attributes are only used by interaction tracing builds.
// They enable interactions to be associated with their async work,
// And expose interaction metadata to the React DevTools Profiler plugin.
// Note that these attributes are only defined when the enableSchedulerTracing flag is enabled.
type ProfilingOnlyFiberRootProperties = {|
  interactionThreadID: number,
  memoizedInteractions: Set<Interaction>,
  pendingInteractionMap: PendingInteractionMap,
|};

export type SuspenseHydrationCallbacks = {
  onHydrated?: (suspenseInstance: SuspenseInstance) => void,
  onDeleted?: (suspenseInstance: SuspenseInstance) => void,
  ...
};

// The follow fields are only used by enableSuspenseCallback for hydration.
type SuspenseCallbackOnlyFiberRootProperties = {|
  hydrationCallbacks: null | SuspenseHydrationCallbacks,
|};

// Exported FiberRoot type includes all properties,
// To avoid requiring potentially error-prone :any casts throughout the project.
// Profiling properties are only safe to access in profiling builds (when enableSchedulerTracing is true).
// The types are defined separately within this file to ensure they stay in sync.
// (We don't have to use an inline :any cast when enableSchedulerTracing is disabled.)
export type FiberRoot = {
  ...BaseFiberRootProperties,
  ...ProfilingOnlyFiberRootProperties,
  ...SuspenseCallbackOnlyFiberRootProperties,
  ...
};
```

## return child sibling 属性

## alternate current 属性

初始渲染时生成 Fiber 树（A），更新时生成一个包含新状态的 Fiber 树（B），B.FiberX.current 指向 A.FiberX，A.FiberX.alternate 指向 B

即 current 表示当前状态的 Fiber，alternate 表示即将更新的 Fiber

## requestIdleCallback

上面提到的 Fiber 会让权给浏览器，等待浏览空闲时再恢复执行，这里的空闲就需要借助 requestIdleCallback 借口，requestIdleCallback(fn )，表示 fn 在下一次事件循环前执行

## 优先级如何计算

## 组件数据的输出

组件的通过 Fiber 上的数据更新 state props，所以才有 Hooks 让函数组件有了状态，在这之前因为函数组件没有 this 没办法保存 state

https://github.com/jianjiachenghub/react-deeplearn/tree/master/%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0

```

```
