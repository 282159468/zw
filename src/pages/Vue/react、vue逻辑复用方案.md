# react、vue 逻辑复用方案.md

react、vue 逻辑复用方案大致相同

## mixin 缺点

- 不清晰的数据来源：当使用了多个 mixin 时，根本不知道实例上的数据属性来自哪个 mixin，只有挨个查看搜索

- 命名空间冲突：多个 mixin 可能会使用相同的属性名，造成命名冲突。

- mixin 之间耦合：多个 mixin 需要依赖共享的属性名来进行相互作用，这使得它们隐性地耦合在一起。

总结：混合在一起啥啥分不清，mixin 之间依赖不清晰，越往后维护成本越高

## hoc

**优点**
通过 prop 传递数据，理论上不影响被包裹组件的内部数据，相较 mixin 维护成本低

**缺点**
prop 命名冲突，嵌套地狱，一个组件为了复用多个逻辑包括 4，5 层 hoc，维护成本上升

## render props

vue 中的插槽 slots

```jsx
// 逻辑复用组件
function Common(props) {
  const state = { name: 'zw' };
  // ...逻辑处理
  return props.render(state);
}

// 业务方
<DataProvider render={(data) => <h1>Hello {data.name}</h1>} />;
```

render props 和 hoc 本质上没有明显区别，都存在嵌套地狱问题，硬要说的话有下面几点：

- 多层级不会命名冲突
- 使用形式上不一样，hoc 调用方是执行函数传入渲染组件，render props 是声明自定义渲染函数
- 如果不做处理被 hoc 包裹的组件通常是被动接受 props，render props 自主选择使用数据

## hooks

优势是可以避免 mixin 的缺点

- 数据来源：每个 hook 返回相应数据
- 命名冲突: hook 函数设计加上 es6，不存在命名冲突
- 耦合：hook 函数入参显式表示 hook 的依赖
