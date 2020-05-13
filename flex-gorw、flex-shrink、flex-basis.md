---
route: /flex-basis
---

## flex-basis

定义 flex 元素初始主轴尺寸，也可以理解为预期基础尺寸，优先级 max[min]-width>flex-basis>width，注意这里的 width 是针对 flex-direction: row 的情况

<Playground>
<div style={{display: 'flex',width: 700,height:100, background: '#eee'}}>
    <div style={{width: 60, flex:1, minWidth:180, background: '#111'}}>1</div>
    <div style={{width: 60, flexBasis:100, background: '#222'}}>2</div>
    <div style={{width: 60, flexBasis:100, background: '#333'}}>3</div>
</div>
</Playground>

## flex-basis 和 width 的关系

- flex-basis:auto 特殊值

flex-basis 可伸缩，width 是定死的

同时设置 flex-basis、width 且元素自身尺寸大于设置值时在浏览器表现不一致，所以尽量避免同时使用这两个属性

## 属性 flex

> flex: none | auto | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]

- flex:1
- flex:100px
- flex:1 100px
- flex:1 1
- flex:1 1 100px

flex: flex-grow flex-shrink flex-basis

分摊剩余空间

分摊收缩空间

测试几种特殊值

### flex:initial

### flex:auto

### flex:none

### 默认值

flex-grow
flex-shrink
flex-basis
