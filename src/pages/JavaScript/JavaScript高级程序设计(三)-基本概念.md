---
route: /js-base
---

## 数据类型

- Undefined 类型只有一个值 `undefined`
- Null 类型只有一个值`null`
- String
- Number
- Boolean 只有`true`、`false`两个值
- Symbol
- Object

## undefined 和 null

- `undefined`表示声明一个变量，但未对他初始化

- `null` 表示的是一个空对象指针，这正是 typeof null 为`object`的原因

- 使用惯例一个变量在将来是一个对象，在声明时通常初始化`null`，var foo = null

## Number

### 精度丢失问题

```js
0.1 + 0.2 === 0.3; // false
```

`ECMAScript`中所有数值都以`IEEE-754`标准 64 位格式存储

> IEEE 二进制浮点数算术标准（IEEE 754）是 20 世纪 80 年代以来最广泛使用的浮点数运算标准，为许多 CPU 与浮点运算器所采用。这个标准定义了表示浮点数的格式（包括负零-0）与反常值（denormal number）），一些特殊数值（无穷（Inf）与非数值（NaN）），以及这些数值的“浮点数运算符”；它也指明了四种数值舍入规则和五种例外状况（包括例外发生的时机与处理方式）

计算是需要先把十进制数值转换为二进制，而十进制小数转为二进制规则为`乘2取整，顺序排列`

数值小于 1，即整数位为 0

**用数值小数部分乘 2，得到结果积且 0<积<2，取（记录）积的整数，再用积循环该过程，如果积等于 1 退出循环，最终把记录的整数顺序排列**

数值大于 1

需要分别计算整数、小数两部分然后相加

小数 0.25 转为二进制过程

```js
0.25 * 2; // 0.5 记录整数 0
0.5 * 2; // 1 记录 1
// 记录整数为01最后二进制小数为 0.01
```

0.1 计算结果

```js
0.1 * 2; // 0.2 记录整数 0
0.2 * 2; // 0.4 记录 0
0.4 * 2; // 0.8 => 0
0.8 * 2; // 1.6 => 1
0.6 * 2; // 1.2 => 1
0.2 * 2; // 0.4 => 0
// ...
```

可以看到 0.1 转换为二进制时出现了无限循环，而`IEEE-754`是用 64 位格式存储数值的，所以肯定会丢掉一部分数据，导致最终精度不准

### NaN

```js
NaN === NaN; // false
```

- [ ] 为什么 NaN 不等于 NaN？

针对这个奇怪的事情`ECMAScript`先后定义了两个`isNaN`函数检查`NaN`值

- window.isNaN(num) 如果`num`不是数字会先强制转换为数值

```js
isNaN(NaN); // true
isNaN('x'); // true
```

可以看出这个方法挺鸡肋的，于是又有了

- Number.isNaN

```js
Number.isNaN(NaN); // true
Number.isNaN('x'); // false
```

### 其他类型转为数值类型

- undefined => NaN
- null => 0
- 对象转数值

《高程》这本书大概这样描述的

> 调用对象`valueOf`方法把返回值转换为数值，如果转换后的值为`NaN`，继续调用对象`toString`方法再把结果转换为数值。

明显是错误的，猜测可能是由于标准更新的原因。正确转换规则是先调用`valueOf`，如果返回值是原始值则返回，否则调用`toString`如果返回值是原始值则返回，否则抛出异常。

https://sinaad.github.io/xfe/2016/04/15/ToPrimitive/

```js
var o = {
  valueOf() {
    console.log(`call valueOf`);
    return 'x';
  },
  toString() {
    console.log(`call toString`); // 并不会执行toString
    return 'x';
  },
};
console.log(Number(o));
```

```js
var o = {
  valueOf() {
    console.log(`call valueOf`);
    return {};
  },
  toString() {
    console.log(`call toString`); // 执行toString
    return 'x';
  },
};
console.log(Number(o));
```

```js
var o = {
  valueOf() {
    console.log(`call valueOf`);
    return {};
  },
  toString() {
    console.log(`call toString`);
    return {};
  },
};
console.log(Number(o)); // 报错
```

## typeof

`typeof`是一个操作符不是函数

```js
typeof typeof; // 报错
```
