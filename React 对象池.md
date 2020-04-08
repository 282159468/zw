---
route: /react-object-pool
---

## 为什么需要对象池

- 频繁创建对象申请内存
- 创建（实例化）过程性能消耗过大

## React@15 对象池

```js
/**
 * Static poolers. Several custom versions for each potential number of
 * arguments. A completely generic pooler is easy to implement, but would
 * require accessing the `arguments` object. In each of these, `this` refers to
 * the Class itself, not an instance. If any others are needed, simply add them
 * here, or in their own files.
 */
var oneArgumentPooler = function(copyFieldsFrom) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, copyFieldsFrom);
    return instance;
  } else {
    return new Klass(copyFieldsFrom);
  }
};

var twoArgumentPooler = function(a1, a2) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2);
    return instance;
  } else {
    return new Klass(a1, a2);
  }
};

var threeArgumentPooler = function(a1, a2, a3) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3);
    return instance;
  } else {
    return new Klass(a1, a2, a3);
  }
};

var fourArgumentPooler = function(a1, a2, a3, a4) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3, a4);
    return instance;
  } else {
    return new Klass(a1, a2, a3, a4);
  }
};

var standardReleaser = function(instance) {
  var Klass = this;
  !(instance instanceof Klass)
    ? process.env.NODE_ENV !== "production"
      ? invariant(
          false,
          "Trying to release an instance into a pool of a different type."
        )
      : _prodInvariant("25")
    : void 0;
  instance.destructor();
  if (Klass.instancePool.length < Klass.poolSize) {
    Klass.instancePool.push(instance);
  }
};

var DEFAULT_POOL_SIZE = 10;
var DEFAULT_POOLER = oneArgumentPooler;

/**
 * Augments `CopyConstructor` to be a poolable class, augmenting only the class
 * itself (statically) not adding any prototypical fields. Any CopyConstructor
 * you give this may have a `poolSize` property, and will look for a
 * prototypical `destructor` on instances.
 *
 * @param {Function} CopyConstructor Constructor that can be used to reset.
 * @param {Function} pooler Customizable pooler.
 */
var addPoolingTo = function(CopyConstructor, pooler) {
  // Casting as any so that flow ignores the actual implementation and trusts
  // it to match the type we declared
  var NewKlass = CopyConstructor;
  NewKlass.instancePool = [];
  NewKlass.getPooled = pooler || DEFAULT_POOLER;
  if (!NewKlass.poolSize) {
    NewKlass.poolSize = DEFAULT_POOL_SIZE;
  }
  NewKlass.release = standardReleaser;
  return NewKlass;
};

var PooledClass = {
  addPoolingTo: addPoolingTo,
  oneArgumentPooler: oneArgumentPooler,
  twoArgumentPooler: twoArgumentPooler,
  threeArgumentPooler: threeArgumentPooler,
  fourArgumentPooler: fourArgumentPooler,
};
```

### 添加对象 addPoolingTo(Constructor, getPooledFn)

Constructor 是需要添加到对象池的构造函数，getPooledFn 定义如何获取相应的实例，默认值为 DEFAULT_POOLER = oneArgumentPooler，即函数签名只有一个参数构造函数

```js
function Fn(name) {
  this.name = name;
}
var FnWithPool = addPoolingTo(Fn);
```

返回的 FnWithPool 还是构造函数，并不是实例，只是在 Fn 装饰上属性和方法

- instancePool 储存实例的池子
- getPooled 获取实例的方法 默认值 oneArgumentPooler
- release 释放对象的方法值为 standardReleaser
- poolSize instancePool 储存实例个数 默认值 DEFAULT_POOL_SIZE:10

### 获取实例 getPooled(arg)

```js
var inst = FnWithPool.getPooled("zw");
```

因为 var FnWithPool = addPoolingTo(Fn)没有添加第二个参数，所以 getPooled 为 oneArgumentPooler

```js
var oneArgumentPooler = function(copyFieldsFrom) {
  // 这里的this指向FnWithPool
  var Klass = this;
  // FnWithPool.instancePool在addPoolingTo初始化为[]，即池子里没有实例
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, copyFieldsFrom);
    return instance;
  } else {
    // 所以需要new创建实例
    // 实际执行new Fn('zw')
    return new Klass(copyFieldsFrom);
  }
};
```

### 释放 release(inst)

当实例使用完后需要把实例释放到池子里以便下次复用

```js
FnWithPool.release(inst);
```

```js
var standardReleaser = function(instance) {
  var Klass = this;
  instance.destructor();
  if (Klass.instancePool.length < Klass.poolSize) {
    // 把清理完成后的实例保存到FnWithPool.instancePool
    Klass.instancePool.push(instance);
  }
};
```

实际就是调用 standardReleaser，instance.destructor()调用对象的析构函数做清理工作，所以对象需要实现这个方法，这里有点像实现抽象方法。所以上面的 FnWithPool.release()会报错`instance.destructor is not a function`，因为 Fn 没有实现这个方法

```js
function Fn(name) {
  this.name = name;
}
Fn.prototype.destructor = function() {
  // 清理工作，释放内存，实例上可能存在引用类型的值[],{}
  this.name = undefined;
};
```

当再次使用时 var inst2 = FnWithPool.getPooled("zw2");

```js
var oneArgumentPooler = function(copyFieldsFrom) {
  var Klass = this;
  // FnWithPool.instancePool就不是空的了，因为上面release时存入了一个清理后的实例
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    // 这里直接把Fn当普通函数调用
    Klass.call(instance, copyFieldsFrom);
    return instance;
  } else {
    return new Klass(copyFieldsFrom);
  }
};
```

- [ ] 再次获取实例时，同样执行了构造函数，既然这样那对象池为什么能优化性能

## React@16 对象池

16 没有把对象池再单独抽成一个文件，而是由具体的模块重复实现，比如事件

SyntheticEvent.js

```js
const EVENT_POOL_SIZE = 10;
function SyntheticEvent(
  dispatchConfig,
  targetInst,
  nativeEvent,
  nativeEventTarget
) {
  //...
}
function releasePooledEvent(event) {
  const EventConstructor = this;
  invariant(
    event instanceof EventConstructor,
    "Trying to release an event instance into a pool of a different type."
  );
  event.destructor();
  if (EventConstructor.eventPool.length < EVENT_POOL_SIZE) {
    EventConstructor.eventPool.push(event);
  }
}

function addEventPoolingTo(EventConstructor) {
  EventConstructor.eventPool = [];
  EventConstructor.getPooled = getPooledEvent;
  EventConstructor.release = releasePooledEvent;
}

addEventPoolingTo(SyntheticEvent);

function getPooledEvent(dispatchConfig, targetInst, nativeEvent, nativeInst) {
  const EventConstructor = this;
  if (EventConstructor.eventPool.length) {
    const instance = EventConstructor.eventPool.pop();
    EventConstructor.call(
      instance,
      dispatchConfig,
      targetInst,
      nativeEvent,
      nativeInst
    );
    return instance;
  }
  return new EventConstructor(
    dispatchConfig,
    targetInst,
    nativeEvent,
    nativeInst
  );
}
```

- [ ] React@16 为什么会删除 PooledClass.js 文件改为具体对象单独实现对象池

google 搜索 why React@16 delete PooledClass.js 发现了这个 issue
https://github.com/facebook/react/issues/9325
同时还回答了另外一个问题，对象池代码里定义了 oneArgumentPooler,tow,three,four 四个获取对象的方法，他们唯一区别就是参数不一样。

```js
var PooledClass = {
  addPoolingTo: addPoolingTo,
  oneArgumentPooler: oneArgumentPooler,
  twoArgumentPooler: twoArgumentPooler,
  threeArgumentPooler: threeArgumentPooler,
  fourArgumentPooler: fourArgumentPooler,
};
```

当时自己和提这个 issue 的哥们想法一样完全可以写一个通用的。而且还有相关的 PR
https://github.com/facebook/react/pull/7814
看了回答才明白为什么这样做

- 祖传代码避免风险一直保留着
- 出于性能考虑不使用`arguments` 也就不同个数参数写一个函数
  文件头部有段注释之前一直没有注意

  > A completely generic pooler is easy to implement, but would require accessing the `arguments` object

意思就是一个通用的处理函数很容易实施，但是需要使用 `arguments` （估计祖传代码时还没有...args）
然后为啥是用 arguments 不就这样搞了。dan 神回复

> The person who wrote this code several years ago was likely worried about JS engine deoptimizations caused by using arguments

我又迷了`arguments`会影响性能，之前有印象`with`,`evel`会影响 JS 引擎对代码优化，结果一路查才知道有个`Optimization-killers`

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments
https://div.io/topic/1269
https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#3-managing-arguments

大概包括下面几种情况让函数无法被优化
- with eval 这两个意料中的
- 包含 debugger
- arguments 使用不当
- `__proto__`,`get`,`set`
