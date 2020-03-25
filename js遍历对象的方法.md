---
route: /foreach-object
---

```js
const o = Object.create(
  { a: 1 },
  {
    b: {
      enumerable: false,
      value: 2
    },
    c: {
      enumerable: true,
      value: 3
    },
    [Symbol("x")]: {
      value: 4,
      enumerable: true
    }
  }
);
```

## for in

ES6 之前遍历对象多数使用 for in，有以下缺点

- 会遍历原型链上的属性
- 在遍历数组时，得到数组下标 key 为字符串形式，实现数组下标为数字类型
- 遍历的顺序在不同浏览器顺序不一

```js
for (let n in o) {
  console.log(n); // c、a
}
```

由于 for in 的缺点，ES6 添加了 for of 方法遍历可迭代对象，需要注意一个普通的对象不是可迭代对象，所以 for of 不能遍历对象，除非手动为这个普通对象添加迭代器属性

** for of 不能遍历对象 **

** for in 不会遍历 enumerable:false 属性 **

## Object.keys

自己实践中用的比较多的，返回的 keys 有以下特点

- 不包含原型链上的属性
- 不包含 Symbol 属性
- 不包含不可枚举属性

```js
Object.keys(o).forEach(key => {
  console.log(key); // c
});
```

## Object.getOwnPropertyNames

- 不包含原型链上的属性
- 不包含 Symbol 属性
- 包含不可枚举属性

```js
Object.getOwnPropertyNames(o).forEach(key => {
  console.log(key); // b、c
});
```

## Object.getOwnPropertyDescriptors

- 不包含原型链上的属性
- 包含 Symbol 属性
- 包含不可枚举属性

```js
Object.getOwnPropertyDescriptors(o).forEach(key => {
  console.log(key); // b、c、Symbol(x)对应的descriptor
});
```

## Reflect.ownKeys

Reflect.ownKeys 返回的 key 和 Object.getOwnPropertyDescriptors 返回的描述符对象包含的 key 一样

```js
Reflect.ownKeys(o).forEach(key => {
  console.log(key); // b、c、Symbol(x)
});
```
