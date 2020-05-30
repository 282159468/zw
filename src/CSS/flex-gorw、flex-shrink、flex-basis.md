---
route: /flex-basis
---

## flex-basis

定义 flex 元素初始主轴尺寸，也可以理解为预期基础尺寸，初始值:auto
优先级 max[min]-width>flex-basis>width，注意这里的 width 是针对 flex-direction: row 的情况

<div>
<div style={{display: 'flex',width: 700,height:100, background: '#eee'}}>
    <div style={{width: 60, flex:1, minWidth:180, background: '#111'}}>1</div>
    <div style={{width: 60, flexBasis:100, background: '#222'}}>2</div>
    <div style={{width: 60, flexBasis:100, background: '#333'}}>3</div>
</div>
</div>

## flex-basis 和 width 的关系

- flex-basis:auto 特殊值

flex-basis 可伸缩，width 是定死的

同时设置 flex-basis、width 且元素自身尺寸大于设置值时在浏览器表现不一致，所以尽量避免同时使用这两个属性

## flex-grow

分摊剩余空间，或者说是分摊剩余空间的比例,初始值:0

<div style={{ display: 'flex', width: 700, height: 100, background: '#eee' }}>
  <div style={{ flexBasis: 100, flexGrow: 1, background: '#111' }}>
    flex-grow:1
  </div>
  <div style={{ flexBasis: 100, flexGrow: 2, background: '#111' }}>
    flex-grow:2
  </div>
  <div style={{ flexBasis: 100, flexGrow: 3, background: '#111' }}>
    flex-grow:3
  </div>
</div>

flex 容器最宽度 700，flex items 初始化宽度之和为 300，所以剩余宽度为 400，这 400 被 flexGrow 之和 6，即 400 被分为 6 份

这里假设每份 i = 400\6
flex-grow:1 表示之分一份 400/6
flex-grow:2 表示之分一份 400/6\* 2，所以实际宽度为 100 + 133.33 = 233.33

## flex-shrink

分摊收缩空间，,初始值:1

flex-shrink 和 flex-grow 类似，只是 flex-shrink 是当 flex items 的总初始宽度大于了容器时，每个 item 按照 flex-shrink 设置的比例进行收缩

<div>
<div style={{display: 'flex',width: 100, height:100, background: '#eee'}}>
   <div style={{flexBasis: 100, flexShrink:1,  background: '#111'}}>A</div>
    <div style={{flexBasis: 100, flexShrink:2,  background: '#111'}}>B</div>
    <div style={{flexBasis: 100, flexShrink:3,  background: '#111'}}>C</div>
</div>
</div>

容器总宽度 100，flex items 总宽度 300，所以需要收缩总宽度 200

A 需要收缩 200/6 \* 1 = 33.33 实际宽度 66.66
B 需要收缩 200/6 \* 2 = 66.66 实际宽度 33.33
C 需要收缩 200/6 \* 3 = 100 实际宽度 0

C 收缩的实际宽度是 0，这显然是不能够滴的，收缩上限为元素的 min-content,C 的最小内容宽度为 8.66，所以 A,B 还要按比例另外分摊这 8.66 空间
A 66.66 - 8.66/3 \* 1 = 63.77
A 33.33 - 8.66/3 \* 2 = 27.55

**以上小数精度为手动保留与实际有一定偏差**

## 属性 flex

> flex: none | auto | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]

flex: flex-grow flex-shrink flex-basis

flex 是 flex-grow flex-shrink flex-basis 三个属性的简写形式

_以下几种格式都是正确的_

- flex:1
- flex:100px
- flex:1 100px
- flex:1 1
- flex:1 1 100px

测试几种特殊值，这几值感觉标准一再变更，而且各个浏览器表现形式还不统一，比如 flex-basis

> Note:由于最初规范中没有包括这个值，在一些早期的浏览器实现的 flex 布局中，content 值无效，可以利用设置(width 或 height) 为 auto 达到同样的效果.
> Note:简史

> 最初, "flex-basis:auto" 的含义是 "参照我的 width 和 height 属性".
> 在此之后, "flex-basis:auto" 的含义变成了自动尺寸, 而 "main-size" 变成了 "参照我的 width 和 height 属性"。实际执行于 bug 1032922.
> 然后呢, 这个更改又在 bug 1093316 中被撤销了, 所以 "auto" 变回了原来的含义; 而一个新的关键字 'content' 变成了自动尺寸。 (bug 1105111 包括了增加这个关键字).

### flex:initial

### flex:auto

### flex:none

参考：
https://segmentfault.com/a/1190000004288826
