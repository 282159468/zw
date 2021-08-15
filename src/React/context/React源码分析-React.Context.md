---
route: /react-context-analysis

title: React源码分析-React.Context
---

# React源码分析-React.Context

## 带着问题看源码

- `useContext`组件外部如果没有调用`Context.Provider`是否能获取到默认值?
- 当`value`值更新时，`react`是如何通知相应组件更新的?

## 基础用法

以下为官网的示例

```jsx | pure
const ThemeContext = React.createContext('light');

class App extends React.Component {
  render() {
    // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
    // 无论多深，任何组件都能读取这个值。
    // 在这个例子中，我们将 “dark” 作为当前的值传递下去。
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  // 指定 contextType 读取当前的 theme context。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  // 在这个例子中，当前的 theme 值为 “dark”。
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}
```

## React.createContext

先看`createContext`类型定义

```ts
interface Context<T> {
  // `Provider`提供上下文值
  Provider: Provider<T>;
  // `Consumer`用来获取提供的值
  Consumer: Consumer<T>;
  // 跟组件displayName差不多意思，主要调试用
  displayName?: string | undefined;
}
function createContext<T>(
  // If you thought this should be optional, see
  // https://github.com/DefinitelyTyped/DefinitelyTyped/pull/24509#issuecomment-382213106
  defaultValue: T,
): Context<T>;
```

```tsx
import React from 'react';

const context = React.createContext(null);
console.log(context);
export default () => '代码调试';
```

然后`createContext`的实现其实很简单就是创建一个`context`对象并返回，

```ts
export function createContext<T>(
  defaultValue: T,
  calculateChangedBits?: (a: T, b: T) => number,
): ReactContext<T> {
  const context: ReactContext<T> = {
    $$typeof: REACT_CONTEXT_TYPE,
    _calculateChangedBits: calculateChangedBits,
    // As a workaround to support multiple concurrent renderers, we categorize
    // some renderers as primary and others as secondary. We only expect
    // there to be two concurrent renderers at most: React Native (primary) and
    // Fabric (secondary); React DOM (primary) and React ART (secondary).
    // Secondary renderers store their context values on separate fields.
    _currentValue: defaultValue,
    _currentValue2: defaultValue,
    // Used to track how many concurrent renderers this context currently
    // supports within in a single renderer. Such as parallel server rendering.
    _threadCount: 0,
    // These are circular
    Provider: null,
    Consumer: null,
  };

  context.Provider = {
    $$typeof: REACT_PROVIDER_TYPE,
    _context: context,
  };

  context.Consumer = context;

  return context;
}
```

## Context.Provider

一个有意思的问题是，`ThemeContext.Provider`和`ThemeContext.Consumer`是被当作组件使用的，比如`<ThemeContext.Provider ... />`，但从上面的`createContext`实现可以看到`Provider`即不是类组件也不是函数组件，他是如何"调用"的呢

其实严格的说不应该叫**调用**，应该叫实现，当看了`beginWork`函数后，恍然这不是`OOP`中的多态么，在`beginWork`对不同类型组件对应不同的处理方式，

- `Provider`对象虽然不是类也不是函数，但该对象包含`$$typeof: REACT_PROVIDER_TYPE`属性
- `JSX`转换后实际是 `React.createElement(Context.Provider, { value: null }, "1")`
- 在`render`阶段的`beginWork`会调用`createFiberFromElement`创建`fiber`节点，且`Context.Provider`的`fiber`节点的`fiber.tag = REACT_PROVIDER_TYPE`

  ```js
  beginWork(current, rootFiber);
  // ...
  child = createFiberFromElement(ContextProviderElement);
  beginWork(current, child);
  ```

  在处理 Provider 父节点时，创建 Provider Fiber，下次再进入`beginWork`就 ok 了

  ```ts
  function beginWork(
    current: Fiber | null,
    workInProgress: Fiber,
    renderLanes: Lanes,
  ): Fiber | null {
    switch (workInProgress.tag) {
      case FunctionComponent: {
      }
      case ClassComponent: {
      }
      case ForwardRef: {
      }
      case Fragment:
        return updateFragment(current, workInProgress, renderLanes);
      case ContextProvider:
        return updateContextProvider(current, workInProgress, renderLanes);
      case ContextConsumer:
        return updateContextConsumer(current, workInProgress, renderLanes);
      case MemoComponent: {
      }
      // ...
    }
  }
  ```

  **updateContextProvider**

```ts
function updateContextProvider(
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes,
) {
  const providerType: ReactProviderType<any> = workInProgress.type;
  const context: ReactContext<any> = providerType._context;

  const newProps = workInProgress.pendingProps;
  const oldProps = workInProgress.memoizedProps;

  const newValue = newProps.value;

  pushProvider(workInProgress, newValue);

  if (oldProps !== null) {
    const oldValue = oldProps.value;
    const changedBits = calculateChangedBits(context, newValue, oldValue);
    if (changedBits === 0) {
      // No change. Bailout early if children are the same.
      if (
        oldProps.children === newProps.children &&
        !hasLegacyContextChanged()
      ) {
        return bailoutOnAlreadyFinishedWork(
          current,
          workInProgress,
          renderLanes,
        );
      }
    } else {
      // The context value changed. Search for matching consumers and schedule
      // them to update.
      propagateContextChange(workInProgress, context, changedBits, renderLanes);
    }
  }

  const newChildren = newProps.children;
  reconcileChildren(current, workInProgress, newChildren, renderLanes);
  return workInProgress.child;
}
```

- `pushProvider`：把新的值推到栈中
- `propagateContextChange`: 通过下面提到的`firstContext`，找到当前节点下面所有有`context`依赖的子节点，创建添加更新
- `reconcileChildren`调和子节点更新

其中`pushProvider`和`popProvider`的实现大致如下

```js
const stack = [];

const context = {
  currentValue: 'context init value',
};

function pushProvider(nextValue) {
  stack.unshift(context.currentValue);
  context.currentValue = nextValue;
}

function popProvider() {
  const value = stack.shift();
  context.currentValue = value;
}
```

这样设计的目的是为了多次调用同一`Context`的`Provider`能正常获取到`value`，如

```jsx
/**
 * defaultShowCode: true
 *
 */
import React from 'react';

const ThemeContext = React.createContext('a');

class App extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value={`b`}>
        <ThemeContext.Provider value={`c`}>
          <ThemedButton />
        </ThemeContext.Provider>
        <ThemedButton />
      </ThemeContext.Provider>
    );
  }
}

const ThemedButton = () => {
  const value = React.useContext(ThemeContext);
  return <div>value:{value}</div>;
};

export default App;
```

`render`阶段深度优先遍历，`beginWork`遍历某一路径最深节点，然后开始向上回退开始`completeWork`

- Provider-b => pushProvider('b')

  currentValue = 'b'

  stack = ['a']

- Provider-c => pushProvider('c')

  currentValue = 'c'

  stack = ['b','a']

- ThemedButton 获取到 currentValue = 'c'

- 转到`completeWork`，Provider-c => popProvider

  currentValue = 'b'

  stack = ['a']

- 第二个 ThemedButton 获取到正确的 currentValue = 'b'

## useContext

`Provider`的调用整清楚了，下面看下如何获取`value`，先看下通过`hook`形式获取，还是用官网给的例子

```jsx
import React from 'react';

const ThemeContext = React.createContext('light');

class App extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

const ThemedButton = () => {
  const value = React.useContext(ThemeContext);
  return <div>value:{value}</div>;
};
export default App;
```

```ts
export function useContext<T>(
  Context: ReactContext<T>,
  unstable_observedBits: number | boolean | void,
): T {
  //
  const dispatcher = resolveDispatcher();
  return dispatcher.useContext(Context, unstable_observedBits);
}
```

`ReactCurrentDispatcher`是在`renderWithHooks`中赋值的

```js
ReactCurrentDispatcher.current =
  current === null || current.memoizedState === null
    ? HooksDispatcherOnMount
    : HooksDispatcherOnUpdate;
```

`HooksDispatcherOnMount`和`HooksDispatcherOnUpdate`分别定义了首次渲染、更新渲染对应的不同的`hook`，比如`useState`，但是`useContext`在这两个阶段处理函数都是`readContext`

```js
HooksDispatcherOnMount = {
  useContext: readContext,
  // ...
};
```

```js
export function readContext<T>(
  context: ReactContext<T>,
  observedBits: void | number | boolean,
): T {
  if (lastContextWithAllBitsObserved === context) {
    // Nothing to do. We already observe everything in this context.
  } else if (observedBits === false || observedBits === 0) {
    // Do not observe any updates.
  } else {
    let resolvedObservedBits; // Avoid deopting on observable arguments or heterogeneous types.
    if (
      typeof observedBits !== 'number' ||
      observedBits === MAX_SIGNED_31_BIT_INT
    ) {
      // Observe all updates.
      lastContextWithAllBitsObserved = context as ReactContext<mixed>;
      resolvedObservedBits = MAX_SIGNED_31_BIT_INT;
    } else {
      resolvedObservedBits = observedBits;
    }

    const contextItem = {
      context: context as  ReactContext<mixed>,
      observedBits: resolvedObservedBits,
      next: null,
    };

    if (lastContextDependency === null) {
      invariant(
        currentlyRenderingFiber !== null,
        'Context can only be read while React is rendering. ' +
          'In classes, you can read it in the render method or getDerivedStateFromProps. ' +
          'In function components, you can read it directly in the function body, but not ' +
          'inside Hooks like useReducer() or useMemo().',
      );

      // This is the first dependency for this component. Create a new list.
      lastContextDependency = contextItem;
      currentlyRenderingFiber.dependencies = {
        lanes: NoLanes,
        firstContext: contextItem,
        responders: null,
      };
    } else {
      // Append a new context item.
      lastContextDependency = lastContextDependency.next = contextItem;
    }
  }
  // 在react-dom中isPrimaryRenderer为true
  return isPrimaryRenderer ? context._currentValue : context._currentValue2;
}
```

- 全局变量`lastContextDependency`保存着有`context`依赖的链表，这个后面再分析
- `readContext`返回值是`context._currentValue`
- `context._currentValue`值的更新有两个地方，第一个是`crateContext`初始化时；第二个是`<Provider value={} />`

## Context.Consumer

`Context.Consumer`和`useContext`大体相同

```ts
function updateContextConsumer(
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes,
) {
  let context: ReactContext<any> = workInProgress.type;
  // The logic below for Context differs depending on PROD or DEV mode. In
  // DEV mode, we create a separate object for Context.Consumer that acts
  // like a proxy to Context. This proxy object adds unnecessary code in PROD
  // so we use the old behaviour (Context.Consumer references Context) to
  // reduce size and overhead. The separate object references context via
  // a property called "_context", which also gives us the ability to check
  // in DEV mode if this property exists or not and warn if it does not.
  const newProps = workInProgress.pendingProps;
  const render = newProps.children;

  prepareToReadContext(workInProgress, renderLanes);
  const newValue = readContext(context, newProps.unstable_observedBits);
  let newChildren;
  if (__DEV__) {
  } else {
    newChildren = render(newValue);
  }

  // React DevTools reads this flag.
  workInProgress.flags |= PerformedWork;
  reconcileChildren(current, workInProgress, newChildren, renderLanes);
  return workInProgress.child;
}
```

## ContextType

使用`ContextType`，不管是首次渲染还是更新，判断组件有没有`contextType`静态属性，如果有也是调用`readContext`获取值

```js
const contextType = ctor.contextType;
// 首次
if (typeof contextType === 'object' && contextType !== null) {
  context = readContext((contextType: any));
}
const instance = new ctor(props, context);
instance.context = context;

// 更新渲染
let nextContext = emptyContextObject;
if (typeof contextType === 'object' && contextType !== null) {
  nextContext = readContext(contextType);
}
instance.UNSAFE_componentWillReceiveProps(newProps, nextContext);
instance.componentWillReceiveProps(newProps, nextContext);
instance.context = nextContext;
```

```jsx | pure
import React from 'react';

const ThemeContext = React.createContext('light');

class App extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value="dark">
        <ThemedButton />
      </ThemeContext.Provider>
    );
  }
}

class ThemedButton extends React.Component {
  static contextType = ThemeContext;

  render() {
    return <div>value:{this.context}</div>;
  }
}
export default App;
```
