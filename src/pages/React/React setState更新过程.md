---
title: React setState更新过程
---

## `this.setState({i:1})`

setState 更新的入口很简单就是调用组件上的 updater.enqueueSetState 方法

```js
Component.prototype.setState = function(partialState, callback) {
  this.updater.enqueueSetState(this, partialState, callback, 'setState');
};
```

## adoptClassInstance

updater 是在 render phase 通过 adoptClassInstance 添加的

```js
function adoptClassInstance(workInProgress: Fiber, instance: any): void {
  instance.updater = classComponentUpdater;
  workInProgress.stateNode = instance;
  setInstance(instance, workInProgress);
}
```

## classComponentUpdater

```js
const classComponentUpdater = {
  isMounted,
  enqueueSetState(inst, payload, callback) {
    const fiber = getInstance(inst);
    const currentTime = requestCurrentTimeForUpdate();
    const suspenseConfig = requestCurrentSuspenseConfig();
    const expirationTime = computeExpirationForFiber(
      currentTime,
      fiber,
      suspenseConfig,
    );

    const update = createUpdate(expirationTime, suspenseConfig);
    update.payload = payload;
    if (callback !== undefined && callback !== null) {
      update.callback = callback;
    }

    enqueueUpdate(fiber, update);
    scheduleUpdateOnFiber(fiber, expirationTime);
  },
  enqueueReplaceState(inst, payload, callback) {},
  enqueueForceUpdate(inst, callback) {},
};
```

## getInstance

通过组件实例找到对应的 Fiber，Fiber 也是通过 adoptClassInstance 中 setInstance 存到实例上的

## createUpdate

创建这个更新对象 update，`update.payload={i:1}`

```js
// 函数组件更新队列
export type FunctionComponentUpdateQueue = {| lastEffect: Effect | null |};

// 类组件更新队列
export type UpdateQueue<State> = {|
  baseState: State,
  firstBaseUpdate: Update<State> | null,
  lastBaseUpdate: Update<State> | null,
  shared: SharedQueue<State>,
  effects: Array<Update<State>> | null,
|};
```

## enqueueUpdate

```js
export function enqueueUpdate<State>(fiber: Fiber, update: Update<State>) {
  const updateQueue = fiber.updateQueue;
  // 这句表明在unMount周期中setState({})没啥作用
  if (updateQueue === null) {
    // Only occurs if the fiber has been unmounted.
    return;
  }

  const sharedQueue: SharedQueue<State> = (updateQueue: any).shared;
  const pending = sharedQueue.pending;
  if (pending === null) {
    // This is the first update. Create a circular list.
    update.next = update;
  } else {
    update.next = pending.next;
    pending.next = update;
  }
  sharedQueue.pending = update;
}
```

1. 创建更新链表 update.next = update 或者有正在更新的 update.next = pending.next
2. 把更新挂到 Fiber 上 fiber.updateQueue.shared.pending = update

## scheduleUpdateOnFiber

首次渲染时也会进入该函数，setState 进入更新逻辑分支
