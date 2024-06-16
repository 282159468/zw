---
route: /to-primitive
---

# 抽象值操作

对象的 Symbol.toPrimitive 函数属性，定义对象转换为原始值的规范，函数的 hint 参数首先确定转换意图的类型，

并生成转换时调用的方法 methodNames，即 valueOf、toString

## 确定 hint

- string 表示想把对象转换成字符

  methodNames = [toString, valueOf]

- number 表示想把对象转换成数字

  methodNames = [valueOf, toString]

- default 表示意图不明确，这种也认为是 number 形式

## 调用 methodNames

依次调用 methodNames 包含的函数，如果返回值为原始值则返回该值，否则继续调用，直到返回原始值，如果最终都没有返回原始值则抛出异常

```js
var o = {
  valueOf: function() {
    console.log(`valueOf`);
    return {};
  },
  toString: function() {
    console.log(`toString`);
    return {};
  },
};

o + '';
```

上面会依次调用 valueOf、toString，但两个方法都没有返回原始值，最终报错

> Uncaught TypeError: Cannot convert object to primitive value

在开发过程中碰到的 ToPrimitive 转换意图了除了 Date 和 Symbol 外，其他都为 number，即都会优先调用 valueOf

## 定制 ToPrimitive

```js
var o = {
  [Symbol.toPrimitive]: function(hint) {
    console.log(`hint:${hint}`);
    return 1;
  },
};

Number(o);
String(o);
```

## 误区

```js
var a = {
  valueOf: () => {
    console.log('valueOf');
    return 1;
  },
  toString: () => {
    console.log('toString');
    return 2;
  },
};

var a1 = a + '';
var a2 = a - 0;
```

认为 a+''操作会调用 toString, a-0 调用 valueOf，这样认为的原因是：

> +操作时，如果左、右值其中一个是字符串类型，则把另一个也转换成字符串类型再运算

但是 ECMA 规范定义+操作实际是：

```
12.8.3The Addition Operator ( + )#
NOTE
The addition operator either performs string concatenation or numeric addition.

12.8.3.1Runtime Semantics: Evaluation#
AdditiveExpression:AdditiveExpression+MultiplicativeExpression
Let lref be the result of evaluating AdditiveExpression.
Let lval be ? GetValue(lref).
Let rref be the result of evaluating MultiplicativeExpression.
Let rval be ? GetValue(rref).
Let lprim be ? ToPrimitive(lval).
Let rprim be ? ToPrimitive(rval).
If Type(lprim) is String or Type(rprim) is String, then
Let lstr be ? ToString(lprim).
Let rstr be ? ToString(rprim).
Return the String that is the result of concatenating lstr and rstr.
Let lnum be ? ToNumber(lprim).
Let rnum be ? ToNumber(rprim).
Return the result of applying the addition operation to lnum and rnum. See the Note below 12.8.5.
NOTE 1
No hint is provided in the calls to ToPrimitive in steps 5 and 6. All standard objects except Date objects handle the absence of a hint as if the hint Number were given; Date objects handle the absence of a hint as if the hint String were given. Exotic objects may handle the absence of a hint in some other manner.

NOTE 2
Step 7 differs from step 5 of the Abstract Relational Comparison algorithm, by using the logical-or operation instead of the logical-and operation.

```

这一大堆大概意思是先执行左右两边的表达式，并获取其值分别赋值给 lval、rval，然后对 lval、rval 执行 ToPrimitive()，如果 ToPrimitive 返回值有一个是字符串刚进行 ToString、否则 ToNumber

而普通对象 ToPrimitive 转换意图为 number 所以会先调用 valueOf

## 练习题

```js
[]+[]
{}+{}
[]+{}
{}+[]
```
