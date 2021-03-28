---
title: CSS BFC块级格式化上下文
---

## BFC 定义

块级格式化上下文 Block Format Context，创建环境=>制约渲染=>不会影响

块级格式化上下文创建一个虚拟的上下文环境，规定该环境下的元素按什么样规则渲染，创建的每个上下文环境是独立，一下环境下的元素不会影响其他环境的元素渲染

## 如何触发 BFC

给元素定义以下属性就会触发 BFC

- overflow:除 visible 的值
- float:除 none 的值
- display:
  - inline-block
  - tabel-cell table-caption
  - flex grid
- position: absolute,fixed

## BFC 的布局规则

BFC 内的元素布局规则

- 水平方向上元素左边紧贴着 BFC 包含块左边，除非该元素也触发了 BFC
- 垂直方向上一个元素跟着一个元素放置，margin 决定元素之间间距，相邻元素的 margin 会合并
- BFC 内的浮动元素也会参与高度计算，且不会与其他元素重叠,除非其他元素也触发了 BFC

## BFC 的作用

### 清除浮动影响

```jsx
import React from 'react';
export default () => (
  <div>
    浮动元素造成高度消失
    <div style={{ border: `solid blue` }}>
      <div
        style={{ width: 130, height: 20, float: 'left', background: '#ccc' }}
      ></div>
    </div>
  </div>
);
```

```jsx
import React from 'react';
export default () => (
  <div>
    利用“BFC 内的浮动元素也会参与高度计算”，触发BFC问题解决
    <div style={{ border: `solid blue`, overflow: 'hidden' }}>
      <div
        style={{ width: 130, height: 20, float: 'left', background: '#ccc' }}
      ></div>
    </div>
  </div>
);
```

### 两列自适应布局

浮动导致两个元素重叠现象

```jsx
import React from 'react';
export default () => (
  <div style={{ border: `solid blue`, width: 200 }}>
    <div
      style={{ width: 130, height: 20, float: 'left', background: 'red' }}
    ></div>
    <div style={{ background: 'rgba(0,0,0,.3)' }}>
      很早就听说过这句话了：一件事情，如果你坚持22天以上，就变成了习惯。
    </div>
  </div>
);
```

```jsx
import React from 'react';
export default () => (
  <div style={{ border: `solid blue`, width: 200, overflow: 'hidden' }}>
    <div
      style={{ width: 130, height: 20, float: 'left', background: 'red' }}
    ></div>
    <div style={{ overflow: 'hidden', background: 'rgba(0,0,0,.3)' }}>
      利用“BFC 内的浮动元素不会与其他元素重叠”
    </div>
  </div>
);
```

### margin 重叠

```jsx
import React from 'react';
export default () => (
  <div style={{ border: `solid blue`, width: 200, overflow: 'hidden' }}>
    <div
      style={{ width: 130, height: 20, margin: 20, background: '#ccc' }}
    ></div>
    <div
      style={{ width: 130, height: 20, margin: 20, background: '#ccc' }}
    ></div>
    <div
      style={{ width: 130, height: 20, margin: 20, background: '#ccc' }}
    ></div>
  </div>
);
```

```jsx
import React from 'react';
export default () => (
  <div style={{ border: `solid blue`, width: 200, overflow: 'hidden' }}>
    <div
      style={{
        width: 130,
        height: 20,
        margin: 20,
        background: '#ccc',
        float: 'left',
      }}
    ></div>
    <div
      style={{
        width: 130,
        height: 20,
        margin: 20,
        background: '#ccc',
        float: 'left',
      }}
    ></div>
    <div
      style={{
        width: 130,
        height: 20,
        margin: 20,
        background: '#ccc',
        float: 'left',
      }}
    ></div>
  </div>
);
```
