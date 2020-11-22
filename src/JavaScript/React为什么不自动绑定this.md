---
title: React为什么不自动绑定this
---

# React 为什么不自动绑定 this

```jsx | pure
import React, { PureComponent } from 'react';

export default class Foo extends PureComponent {
  handleClick() {
    console.log(this);
  }

  render() {
    return <div onClick={this.handleClick}>xxxx</div>;
  }
}
```

handleClick 处理函数中 this 值是 undefined，处理这个问题通常使用的方法

- constructor 中 this.handleClick = this.handleClick.bind(this)

- onClick={this.handleClick.bind(this)}

- onClick={()=>this.handleClick()}

- handleClick = ()=>console.log(this);

- @autoBind
  装饰器

- ...

上面几种处理方法有和各自优缺点，既然这么麻烦为什么 React 在框架层面帮我们实现自动绑定呢，

## 避免黑魔法

遵循 ECMA 标准，在 React 中函数通过 props、事件处理等最终的调用时 this 本身变的不确定，情况有点类似下面这样

```js
'use static';
var user = {
  userName: 'zw',
  showName() {
    console.log('userName:', this.userName);
  },
};

user.showName(); // zw

var DisplayUser = showName => {
  console.log(showName());
};

var UserList = () => {
  // 子组件
  DisplayUser(user.showName);
};

UserList(); // undefined
```
