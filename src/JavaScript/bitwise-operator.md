---
title: JS位操作符
---

## 按位与(&)

都为 1 时结果为 1，否则为 0

## 按位或(|)

有一个为 1 时结果为 1，否则为 0

## 按位异或(^)

只有一个为 1 时结果为 1，否则为 0

## 按位非(~)

反转，1 变 0，0 变 1

## 应用

### 包含关系

比如系统权限有新增、删除、更新权限，判断一个用户是否拥有某些权限

```js
const test = auth => {
  return ['Placement', 'Update'].includes(auth);
};
```

位实现

乍一看用位表示的代码更多，也不好理解，但是如果用户拥有多个权限的，上面数组的方法操作起来就比较麻烦了，另外如果删除用户某权限也是同样的道理

```js
const NoEffect = /*                 */ 0b00000000000000;
const Placement = /*                */ 0b00000000000010;
const Update = /*                   */ 0b00000000000100;
const PlacementAndUpdate = /*       */ 0b00000000000110;
const Deletion = /*                 */ 0b00000000001000;
const test = auth => {
  return (auth & PlacementAndUpdate) !== NoEffect;
};

const test = auth => {
  return (auth & (Placement | Update)) !== NoEffect;
};
```
