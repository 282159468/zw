---
title: React首次渲染文字版
---

# React 首次渲染文字版

```jsx | pure
// app.js
class App extends React.PureComponent {
  render() {
    return <div>hello world</div>;
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
```

这种标签语法称为 JSX，但是这种语法并不是 ES 标准的一部分，并不能直接在浏览器运行，早期的 JSX 是在浏览器端做编译的；现在基本上都是通过 babel 打包时编译为 ES 代码

了解首次渲染之前，需要了解相关的几个概念

- JSX
- React Element
- Fiber

## Fiber

Fiber 让 React 可以中断、恢复中断任务的执行，中断的目的是为了避免 React 长期占用线程，一直阻塞一些优先级比较高的任务，如用户输入、选择文字等。

严格意义上说 Fiber 并没有做性能优化，只是把任务分批按优先级高低来执行。

在 React 内部 Fiber 是一个树形、链表的数据结构，其实就是一个简单的对象

```js
export type Fiber = {|
  /** Fiber的类型,常见的ClassComponent、FunctionComponent、HostComponent(DOM) */
  tag: WorkTag,
  /** Elemnt对应的key */
  key: null | string,
  /** 和Element的type差不多的，对应组件的类、函数、DOM.tagName(div) */
  type: any,
  /** 理解为"组件"实例，Host类型组件document.createElement('div') */
  stateNode: any,
  /** 父级Fiber */
  return: Fiber | null,
  /**   子Fiber */
  child: Fiber | null,
  /** 兄弟Fiber */
  sibling: Fiber | null,

  ref:
    | null
    | (((handle: mixed) => void) & { _stringRef: ?string, ... })
    | RefObject,
  /** 即将更新的props */
  pendingProps: any,
  /** 当前的props */
  memoizedProps: any,
  /** 更新队列 */
  updateQueue: mixed,
  /** 当前组件的state */
  memoizedState: any,
  /** 严格模式、异步更新模型等 */
  mode: TypeOfMode,
  /** 更新/副作用 类型 */
  effectTag: SideEffectTag,
  /** 链表，下一个有更新的Fiber */
  nextEffect: Fiber | null,
  firstEffect: Fiber | null,
  lastEffect: Fiber | null,
  /** 过期时间 */
  expirationTime: ExpirationTime,
  /**
   * 创建更新时会基于当前的CurrentFiber(current)，克隆一个新的WorkInProgerssFiber
   * 他们互为替身
   * current.alternate = WorkInProgerssFiber
   * WorkInProgerssFiber.alternate = current
   */
  alternate: Fiber | null,
  //   ...其他属性
|};
```

### return/child/sibling

JSX(React Element)

```js
class App extends React.PureComponent {
  render() {
    return (
      <div>
        {true && <b>a</b>}
        {false && <i>d</i>}
        <Foo />
      </div>
    );
  }
}

const Foo = () => {
  return (
    <React.Fragment>
      <p>c</p>
      <span>d</span>
    </React.Fragment>
  );
};
```

对应的 Fiber 树，Fragment 和 i 标签并没有创建 Fiber 节点

<img src="/images/fiber树.jpg">

### effectTag

表示 Fiber 有何种更新/副作用，常见的有增、删、改

### firstEffect

更新链表数据，

<hr/>

## 创建容器

其实是创建 FiberRoot 和 RootFiber

RootFiber 是 Fiber 树的根节点，FiberRoot 是 RootFiber 的实例，所以 FiberRoot 不是 Fiber 节点

<img src="/images/fiberRoot-rootFiber.png">

## 更新容器

- updateContainer

  创建更新对象 update，update.payload 携带要渲染的`<App/>`即 React Element，把创建好的 update 存到 RootFiber 上

  下面开始调度这个更新

- scheduleUpdateOnFiber

  通过克隆现在的 RootFiber 初始为 workInProgress，workInProgress 和 RootFiber 互为替身，

  workInProgress.alternate = CurrentRootFiber

  CurrentRootFiber.alternate = workInProgress

workInProgress 是模块内的全局变量，基于 workInProgress 开始进行下面两个阶段

## 两个阶段

React 中不管是首次渲染、还是更新渲染，都会分为两个大的阶段进行

**render phase**

render 阶段可以简单的理解为创建 Fiber 树的过程，从 RootFiber 递归创建之前 update.payload 携带的 Element 元素创建对应的 Fiber 树，有要工作如下

1. 创建/更新 Fiber 树
2. 实例化类组件、调用 render 阶段组件生命周期
3. (仅)创建 DOM 节点保存到 Fiber.stateNode，通过 Fiber.return 属性一层一层

   `ChildFiber.parent.stateNode.append(ChildFiber.stateNode)`

4. 初始化 DOM 样式、事件等其他属性
5. 通过是否有 current 确定是否标记 effect，保存 effect 链到 RootFiber 上

**commit phase**

1. 获取 RootFiber 上的 effect 链
2. 递归 effect 执行组件生命周期、append 真实 DOM
