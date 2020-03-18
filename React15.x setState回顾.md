前几天读了 React16.x 的 useState 源码，其中时不时碰到 Fiber，但 16 的 Fiber 一块很难啃的，一直没有攻下来，啃 Fiber 之前自己想回顾下 React15.x 的 setState 批量更新，为读Fiber做准备

```jsx
class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      a: 1
    };
  }

  onClick = () => {
    this.setState({ a: this.state.a + 1 });
    console.log(this.state.a); // 1
  };

  render() {
    console.log("this.state.a");
    return <div onClick={this.onClick}>{this.state.a}</div>;
  }
}
```

onClick 中的 this.setState({ a: this.state.a + 1 });执行后，常规理解这时输出 state 中 a 的值应该就是 2 了，但实际输出的还是 1。为什么会出现这种情况，肯定就是 setState 把数据保存下来了，因为 React 出于性能考虑，多于同一个任务中执行多次 setState，最终全合并为一次对界面进行刷新

执行 setState 后最终会进入

```js
var queue =
  internalInstance._pendingStateQueue ||
  (internalInstance._pendingStateQueue = []);
queue.push(partialState);
// partialState的值就是setState({a:this.state.a+1})中参数对象，
// 所以internalInstance._pendingStateQueue = [{a:2}]
ReactUpdates.enqueueUpdate(internalInstance);

function enqueueUpdate(component) {
  ensureInjected();

  if (!batchingStrategy.isBatchingUpdates) {
    batchingStrategy.batchedUpdates(enqueueUpdate, component);
    return;
  }
  dirtyComponents.push(component);
}
```

由于 batchingStrategy.isBatchingUpdates 为 true,然后执行完 dirtyComponents.push(component)后整个 setState()操作就完成了，这里又产生两个问题

- batchingStrategy.isBatchingUpdates 是在什么时候设置为 true 的
- setState 整个调用执行完了也没看到更新 state 值，但最终 render 时 state 的值输出是 2，是在什么时候处理的

## isBatchingUpdates 什么时候赋值为 true

因为 React 合成事件，派发 onClick 的事件是实际上执行了

```js
  dispatchEvent: function (topLevelType, nativeEvent) {
    if (!ReactEventListener._enabled) {
      return;
    }

    var bookKeeping = TopLevelCallbackBookKeeping.getPooled(topLevelType, nativeEvent);
    try {
        // 这句的意思就是我要开始一个批量更新了
      batchingStrategy.batchedUpdates(handleTopLevelImpl, bookKeeping);
    } finally {
      TopLevelCallbackBookKeeping.release(bookKeeping);
    }
  }
```

```js
var ReactDefaultBatchingStrategy = {
  isBatchingUpdates: false,
  batchedUpdates: function(callback, a, b, c, d, e) {
    var alreadyBatchingUpdates = ReactDefaultBatchingStrategy.isBatchingUpdates;
    // 这里赋值，表示当前处于批量更新中
    ReactDefaultBatchingStrategy.isBatchingUpdates = true;

    if (alreadyBatchingUpdates) {
      return callback(a, b, c, d, e);
    } else {
      return transaction.perform(callback, null, a, b, c, d, e);
    }
  }
};
```

有了以上两步经过合成事件最终触发了 onClick 处理函数，再执行 setState({})，然后进入 enqueueUpdate 这里判断 isBatchingUpdates 就为 true，把 setState({a:this.state.a+1})=>setState({a:2})的数据简单的添加到
dirtyComponents.push(component)，component.\_pendingStateQueue = [{a:2}]，所以这里输出 state.a 的值还是之前的值

## 什么时候更新了 state 数据

要理清这个，首先要理解事务 Transaction，简单说事务就是给一个函数添加 wrapper，wrapper 分 before、after,要执行这个函数，首先执行 beforeWrapper=>fn=>afterWrapper

```js
function fn() {
  console.log(1);
}

const wrappers = [
  { before: () => console.log(0), after: () => console.log(2) }
];

const transaction = new Transaction(fn, wrappers);
transaction.perform(fn);
// 0
// 1
// 2
```

派发事件中 batchingStrategy.batchedUpdates 就开启了一个事务 transaction.perform(callback, null, a, b, c, d, e)，主要关注实例化 transaction 时的 wrapper

```js
// initialize、colse相当于上面理解的beforeWrapper、afterWrapper
var RESET_BATCHED_UPDATES = {
  initialize: emptyFunction,
  close: function() {
    ReactDefaultBatchingStrategy.isBatchingUpdates = false;
  }
};

var FLUSH_BATCHED_UPDATES = {
  initialize: emptyFunction,
  close: ReactUpdates.flushBatchedUpdates.bind(ReactUpdates)
};

var TRANSACTION_WRAPPERS = [FLUSH_BATCHED_UPDATES, RESET_BATCHED_UPDATES];
```

FLUSH_BATCHED_UPDATES 的 colse 定义了 ReactUpdates.flushBatchedUpdates，这个方法会在事件处理函数执行完后执行。

```js
var flushBatchedUpdates = function() {
  while (dirtyComponents.length || asapEnqueued) {
    if (dirtyComponents.length) {
      var transaction = ReactUpdatesFlushTransaction.getPooled();
      transaction.perform(runBatchedUpdates, null, transaction);
      ReactUpdatesFlushTransaction.release(transaction);
    }

    if (asapEnqueued) {
      asapEnqueued = false;
      var queue = asapCallbackQueue;
      asapCallbackQueue = CallbackQueue.getPooled();
      queue.notifyAll();
      CallbackQueue.release(queue);
    }
  }
};
```
dirtyComponents就是enqueueUpdate中保存的脏组件，最后更新state