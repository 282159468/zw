---
route: /faq/this-in-reload
---

# window.location.reload 非法调用

## 场景

组件库中封装了一个所有应用异常的边界组件 React componentDimCatch，组件里有一个按钮“刷新页面”

代码大致如下：

```tsx
import React from 'react';

function Foo() {
  return <ErrorCatch onClick={window.location.reload} />;
}

function ErrorCatch(props) {
  return <button onClick={props.onClick}>刷新页面</button>;
}

export default Foo;
```

一点击就报错 `Uncaught TypeError: Illegal invocation`，一查才知道 window.location.reload 依赖的 this 必需为 location

```js
const fn = window.location.reload;

// this = window
fn();
```
