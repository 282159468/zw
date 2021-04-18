---
title: dispatchAction
group:
  path: /React Hooks/useState
---

最近有个问题一直比较头痛，具体代码如下，间隙性点击 div 考虑`render`的输出情况，即 re-render 次数

```jsx
import React from 'react';

export default () => {
  const [state, setCount] = React.useState(0);
  const onClick = () => {
    setCount(1);
  };
  console.log('render');

  return <div onClick={onClick}>{state}</div>;
};
console.log(React);
```

chrome 结果：

- 第 1 次点击会输出`render`
- 第 2 次点击会输出`render`
- 之后的点击不会输出`render`

有点不符合自己的理解，首先 useState 的 setXXX 其实执行的是 dispatchAction

**第二次点击应该就不会引起更新，因为 dispatchAction 里有 is(prev, next)对比前后数据，相同则直接返回**

调试发现第二次没有进入下面这个分支，即不会进入 is 对比分支

```js
if(fiber.expirationTime === NoWork &&
    (alternate === null || alternate.expirationTime === NoWork))
```

这里反复调试了很多次

~~**这段代码在 firefox 中执行是符合预期的**~~

怀疑是 chrome 安装了 React dev Tools 插件，然后在隐藏模式下或者删除插件测试问题依旧

## 分析过程一

setCount 实际执行的 dispatchAction，而 dispatchAction 是在组件首次渲染 useState 中绑定的,所以 setCount 最终执行的是 dispatchAction，`dispatchAction`中对前后 state 作了类似 Object.is(prev, now)的对比，即如果 setCount 传入的值和这前相等，是不会进入到调度`schedule`阶段的,也就不会 re-render 了。但是第 2 次为什么会 re-render?

先理一下 dispatchAction 代码，入参的 action 其实就是 setCount 的参数 1，另外 fiber 和 queue 是在首次渲染时 mountState 是 bind 的

```js
function dispatchAction<S, A>(
  fiber: Fiber,
  queue: UpdateQueue<S, A>,
  action: A,
) {
  const eventTime = requestEventTime();
  const lane = requestUpdateLane(fiber);

  const update: Update<S, A> = {
    lane,
    action,
    eagerReducer: null,
    eagerState: null,
    next: (null: any),
  };

  // Append the update to the end of the list.
  const pending = queue.pending;
  if (pending === null) {
    // This is the first update. Create a circular list.
    update.next = update;
  } else {
    update.next = pending.next;
    pending.next = update;
  }
  queue.pending = update;

  const alternate = fiber.alternate;
  if (
    fiber === currentlyRenderingFiber ||
    (alternate !== null && alternate === currentlyRenderingFiber)
  ) {
    // This is a render phase update. Stash it in a lazily-created map of
    // queue -> linked list of updates. After this render pass, we'll restart
    // and apply the stashed updates on top of the work-in-progress hook.
    didScheduleRenderPhaseUpdateDuringThisPass = didScheduleRenderPhaseUpdate = true;
  } else {
    // 第二次点击没有进入这个分支
    if (
      fiber.lanes === NoLanes &&
      (alternate === null || alternate.lanes === NoLanes)
    ) {
      // The queue is currently empty, which means we can eagerly compute the
      // next state before entering the render phase. If the new state is the
      // same as the current state, we may be able to bail out entirely.
      const lastRenderedReducer = queue.lastRenderedReducer;
      if (lastRenderedReducer !== null) {
        let prevDispatcher;
        if (__DEV__) {
          prevDispatcher = ReactCurrentDispatcher.current;
          ReactCurrentDispatcher.current = InvalidNestedHooksDispatcherOnUpdateInDEV;
        }
        try {
          const currentState: S = (queue.lastRenderedState: any);
          const eagerState = lastRenderedReducer(currentState, action);
          // Stash the eagerly computed state, and the reducer used to compute
          // it, on the update object. If the reducer hasn't changed by the
          // time we enter the render phase, then the eager state can be used
          // without calling the reducer again.
          update.eagerReducer = lastRenderedReducer;
          update.eagerState = eagerState;
          //   这里对比前后state
          if (is(eagerState, currentState)) {
            // Fast path. We can bail out without scheduling React to re-render.
            // It's still possible that we'll need to rebase this update later,
            // if the component re-renders for a different reason and by that
            // time the reducer has changed.
            return;
          }
        } catch (error) {
          // Suppress the error. It will throw again in the render phase.
        } finally {
          if (__DEV__) {
            ReactCurrentDispatcher.current = prevDispatcher;
          }
        }
      }
    }
    scheduleUpdateOnFiber(fiber, lane, eventTime);
  }

  if (enableSchedulingProfiler) {
    markStateUpdateScheduled(fiber, lane);
  }
}
```

```js
function mountState<S>(
  initialState: (() => S) | S,
): [S, Dispatch<BasicStateAction<S>>] {
  const hook = mountWorkInProgressHook();
  if (typeof initialState === 'function') {
    // $FlowFixMe: Flow doesn't like mixed types
    initialState = initialState();
  }
  hook.memoizedState = hook.baseState = initialState;
  const queue = (hook.queue = {
    pending: null,
    dispatch: null,
    lastRenderedReducer: basicStateReducer,
    lastRenderedState: (initialState: any),
  });
  const dispatch: Dispatch<
    BasicStateAction<S>,
  > = (queue.dispatch = (dispatchAction.bind(
    null,
    currentlyRenderingFiber,
    queue,
  ): any));
  return [hook.memoizedState, dispatch];
}
```

调试了很多次了没有结果，后面又切到 React17 测试问题依旧，

另外类组件继承 PureComponent 的表现也符合预期

```jsx
import React from 'react';

export default class extends React.PureComponent {
  state = {
    a: 0,
  };
  onClick = () => {
    this.setState({ a: 1 });
  };
  render() {
    console.log('render');
    return <div onClick={this.onClick}>{this.state.a}</div>;
  }
}
```

发了知乎提问碰下运气https://www.zhihu.com/question/451642077

**更新于 2021-4-18**

firefox 执行结果是和 chrome 一致的，firefox 中 console.log()输出相同的内容，次数会标记的右边，之前没有看到

强大的乱乎，原来 React 官网有这种场景的介绍，怪自己之前没有仔细看。

<blockquote>

## 跳过 state 更新

调用 State Hook 的更新函数并传入当前的 state 时，React 将跳过子组件的渲染及 effect 的执行。（React 使用 Object.is 比较算法 来比较 state。）

需要注意的是，React 可能仍需要在跳过渲染前渲染该组件。不过由于 React 不会对组件树的“深层”节点进行不必要的渲染，所以大可不必担心。如果你在渲染期间执行了高开销的计算，则可以使用 useMemo 来进行优化。

https://reactjs.org/docs/hooks-reference.html#bailing-out-of-a-state-update

</blockquote>

虽然文档中介绍了产生这个现象的原因"React 可能仍需要在跳过渲染前渲染该组件"，但 React 这样设计的目的是什么呢？

然后在这个 issue 中 React 成员提到，再次执行的原因是为了确保跳过更新是安全的

<blockquote>
This issue doesn't look like a "bug" so much as a question for clarification? 😄

The next paragraph below the section of the docs you referenced says this:

Note that React may still need to render that specific component again before bailing out. That shouldn’t be a concern because React won’t unnecessarily go “deeper” into the tree.

React bails out early when it knows it's safe to. In some cases, it needs to do a little more work to be sure that it's safe to bail out.

The reasons for why this is can't be explained without going fairly deep into the current implementation details- which probably wouldn't be that useful and they're likely to change in an upcoming release as we continue working on new APIs like concurrent mode and suspense.

The good news is, as the docs mention, the amount of additional work React does in either case should be small!

https://github.com/facebook/react/issues/17672

</blockquote>

**end 更新于 2021-4-18**

- [x] 基本解决
- [ ] 如果不再次执行组件函数会引起什么样的问题
