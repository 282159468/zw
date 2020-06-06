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

## Fiber Tree

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
  // Fiber的类型,具体的WorkTag类型在下面
  tag: WorkTag,

  // Unique identifier of this child.
  key: null | string,

  // The value of element.type which is used to preserve the identity during
  // reconciliation of this child.
  elementType: any,

  // The resolved function/class/ associated with this fiber.
  type: any,

  // The local state associated with this fiber.
  stateNode: any,

  // Conceptual aliases
  // parent : Instance -> return The parent happens to be the same as the
  // return fiber since we've merged the fiber and instance.

  // Remaining fields belong to Fiber

  // The Fiber to return to after finishing processing this one.
  // This is effectively the parent, but there can be multiple parents (two)
  // so this is only the parent of the thing we're currently processing.
  // It is conceptually the same as the return address of a stack frame.
  // 父级和React Element相对应
  return: Fiber | null,

  // Singly Linked List Tree Structure.
  // 链表的next，指向第一个子节点
  child: Fiber | null,
  sibling: Fiber | null,
  index: number,

  // The ref last used to attach this node.
  // I'll avoid adding an owner field for prod and model that as functions.
  ref:
    | null
    | (((handle: mixed) => void) & {_stringRef: ?string, ...})
    | RefObject,

  // Input is the data coming into process this fiber. Arguments. Props.
  pendingProps: any, // This type will be more specific once we overload the tag.
  // 记录组件props数据
  memoizedProps: any, // The props used to create the output.

  // A queue of state updates and callbacks.
  updateQueue: mixed,

  // The state used to create the output
  // 记录组件的state数据
  memoizedState: any,

  // Dependencies (contexts, events) for this fiber, if it has any
  dependencies: Dependencies | null,

  // Bitfield that describes properties about the fiber and its subtree. E.g.
  // the ConcurrentMode flag indicates whether the subtree should be async-by-
  // default. When a fiber is created, it inherits the mode of its
  // parent. Additional flags can be set at creation time, but after that the
  // value should remain unchanged throughout the fiber's lifetime, particularly
  // before its child fibers are created.
  mode: TypeOfMode,

  // Effect
  effectTag: SideEffectTag,

  // Singly linked list fast path to the next fiber with side-effects.
  nextEffect: Fiber | null,

  // The first and last fiber with side-effect within this subtree. This allows
  // us to reuse a slice of the linked list when we reuse the work done within
  // this fiber.
  firstEffect: Fiber | null,
  lastEffect: Fiber | null,

  // Represents a time in the future by which this work should be completed.
  // Does not include work found in its subtree.
  expirationTime: ExpirationTime,

  // This is used to quickly determine if a subtree has no pending changes.
  childExpirationTime: ExpirationTime,

  // This is a pooled version of a Fiber. Every fiber that gets updated will
  // eventually have a pair. There are cases when we can clean up pairs to save
  // memory if we need to.
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

## return child sibling 属性

通过 return child sibling 三个属性构造 Fiber 树

return 表示父节点

child 表示第一个子节点

sibling 表示兄弟节点

- [ ] Fiber 和 Element 对照图片

## alternate current 属性

初始渲染时生成 Fiber 树（A），更新时生成一个包含新状态的 Fiber 树（B），B.FiberX.current 指向 A.FiberX，A.FiberX.alternate 指向 B

即 current 表示当前状态的 Fiber，alternate 表示即将更新的 Fiber

```ts
export type WorkTag =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22;

export const FunctionComponent = 0;
export const ClassComponent = 1;
export const IndeterminateComponent = 2; // Before we know whether it is function or class
// ReactDom.render()的根节点
export const HostRoot = 3; // Root of a host tree. Could be nested inside another node.
export const HostPortal = 4; // A subtree. Could be an entry point to a different renderer.
// 原生DOM组件
export const HostComponent = 5;
export const HostText = 6;
export const Fragment = 7;
export const Mode = 8;
export const ContextConsumer = 9;
export const ContextProvider = 10;
export const ForwardRef = 11;
export const Profiler = 12;
export const SuspenseComponent = 13;
export const MemoComponent = 14;
export const SimpleMemoComponent = 15;
export const LazyComponent = 16;
export const IncompleteClassComponent = 17;
export const DehydratedFragment = 18;
export const SuspenseListComponent = 19;
export const FundamentalComponent = 20;
export const ScopeComponent = 21;
export const Block = 22;
```

## requestIdleCallback

上面提到的 Fiber 会让权给浏览器，等待浏览空闲时再恢复执行，这里的空闲就需要借助 requestIdleCallback 借口，requestIdleCallback(fn )，表示 fn 在下一次事件循环前执行

## 优先级如何计算

## 组件数据的输出

组件的通过 Fiber 上的数据更新 state props，所以才有 Hooks 让函数组件有了状态，在这之前因为函数组件没有 this 没办法保存 state

https://github.com/jianjiachenghub/react-deeplearn/tree/master/%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0
