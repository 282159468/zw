---
route: /foreach-object
---

```js
const obj = {
  a: 1,
  [Symbol('y')]: {
    value: 8,
    enumerable: true,
  },
};
Object.defineProperties(obj, {
  e: {
    enumerable: false,
    value: 2,
  },
  f: {
    enumerable: true,
    value: 3,
  },
});
const o = Object.create(obj, {
  b: {
    enumerable: false,
    value: 4,
  },
  c: {
    enumerable: true,
    value: 5,
  },
  [Symbol('x')]: {
    value: 6,
    enumerable: true,
  },
  [Symbol('z')]: {
    value: 7,
    enumerable: true,
  },
});

/**
 * 不包含enumerable:false的属性
 * 包含原型链的属性，enumerable:false除外
 * 不包含Symbol
 *
 * */
console.log('for in');
for (var n in o) {
  console.log(n, o[n]); // a,f,c
}

/**
 * 不包含enumerable:false的属性
 * 不包含原型链的属性
 * 不包含Symbol
 * */
console.log('keys');
Object.keys(o).forEach(key => {
  console.log(key); // c
});

/**
 * 包含enumerable:false的属性
 * 不包含原型链的属性
 * 不包含Symbol
 * */
console.log('getOwnPropertyNames:');
Object.getOwnPropertyNames(o).forEach(key => {
  console.log(key, o[key]); // b,c
});

/**
 * 包含enumerable:false的属性
 * 不包含原型链的属性
 * 包含Symbol
 * */
console.log('getOwnPropertyDescriptors:');
const descriptors = Object.getOwnPropertyDescriptors(o);
console.log(descriptors); // b,c,Symbol(x)

/**
 * 包含enumerable:false的属性
 * 不包含原型链的Symbol
 * 只包含Symbol，即使enumerable:false
 * */
console.log('getOwnPropertySymbols:');
const symbols = Object.getOwnPropertySymbols(o).forEach(symbol => {
  console.log(symbol); // Symbol(x)
});

/**
 * 包含enumerable:false的属性
 * 不包含原型链的属性
 * 包含Symbol
 * */
console.log('ownKeys:');
const onwKeys = Reflect.ownKeys(o).forEach(key => {
  console.log('ownKeys', key); // b,c,Symbol(x)
});

/**
 * 包含enumerable:false的属性
 * 不包含原型链的属性
 * 包含Symbol
 * */
console.log('entries:');
const extries = Object.entries(o);
const values = Object.values(o);
extries.forEach(item => {
  console.log(item); // [c, 5]
});
values.forEach(item => {
  console.log(item); // 5
});
```

## Object.entries,keys,values

这个返回的属性一致，只是值不同。只包含自身 enumerable:true 属性，不包含 Symbol

## for in

以前遍历对象用的最多就是 for in，不包含 Symbol，缺点会包括原型链上的属性 enumerable:false 除外，所以经常会看到 Object.prototype.hasOwnProperty.call(obj, 'key')处理

> **记住啦 for of 是用来遍历可以迭代对象的，不是遍历对象的**

js 数组内置了迭代器，可以 for of 遍历，普通对象除非手动实现迭代器

## getOwnPropertyNames,getOwnPropertyDescriptors,getOwnPropertySymbols

三个 `getOwnProperty`关键点在强调**自有**(`Own`)，只要是自己的即使`enumberable:false`也会返回，反之原型链上的都不返回

- Names 不包括 Symbol 属性
- Descriptors 只要是自己的 descriptor，包括 Symbol 属性
  getOwnPropertyDescriptors 不是只返回由 Object.defineProperty 声明的属性，且返回的是描述符，不是对象的 keys

  ```js
  var a = { b: 1 };
  Object.getOwnPropertyDescriptors(a);
  var res = {
    b: {
      value: 3,
      writable: true,
      enumerable: true,
      configurable: true,
    },
  };
  ```

- Symbols 只包括 Symbol 属性

**三个方法会包括 enumberable:false**

## Reflect.ownKeys

和 getOwnPropertyDescriptors 返回属性数量一样
