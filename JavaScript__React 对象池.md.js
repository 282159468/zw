(self["webpackChunkzw"]=self["webpackChunkzw"]||[]).push([[6549],{2667:function(e,n,t){"use strict";t.r(n);var o=t(7294),l=t(6089),a=t(5659);t(3132);n["default"]=e=>(o.useEffect((()=>{var n;null!==e&&void 0!==e&&null!==(n=e.location)&&void 0!==n&&n.hash&&l.AnchorLink.scrollToAnchor(decodeURIComponent(e.location.hash.slice(1)))}),[]),o.createElement(o.Fragment,null,o.createElement("div",{className:"markdown"},o.createElement("h2",{id:"\u4e3a\u4ec0\u4e48\u9700\u8981\u5bf9\u8c61\u6c60"},o.createElement(l.AnchorLink,{to:"#\u4e3a\u4ec0\u4e48\u9700\u8981\u5bf9\u8c61\u6c60","aria-hidden":"true",tabIndex:-1},o.createElement("span",{className:"icon icon-link"})),"\u4e3a\u4ec0\u4e48\u9700\u8981\u5bf9\u8c61\u6c60"),o.createElement("ul",null,o.createElement("li",null,"\u9891\u7e41\u521b\u5efa\u5bf9\u8c61\u7533\u8bf7\u5185\u5b58"),o.createElement("li",null,"\u521b\u5efa\uff08\u5b9e\u4f8b\u5316\uff09\u8fc7\u7a0b\u6027\u80fd\u6d88\u8017\u8fc7\u5927")),o.createElement("h2",{id:"react15-\u5bf9\u8c61\u6c60"},o.createElement(l.AnchorLink,{to:"#react15-\u5bf9\u8c61\u6c60","aria-hidden":"true",tabIndex:-1},o.createElement("span",{className:"icon icon-link"})),"React@15 \u5bf9\u8c61\u6c60"),o.createElement(a.Z,{code:"/**\n * Static poolers. Several custom versions for each potential number of\n * arguments. A completely generic pooler is easy to implement, but would\n * require accessing the `arguments` object. In each of these, `this` refers to\n * the Class itself, not an instance. If any others are needed, simply add them\n * here, or in their own files.\n */\nvar oneArgumentPooler = function(copyFieldsFrom) {\n  var Klass = this;\n  if (Klass.instancePool.length) {\n    var instance = Klass.instancePool.pop();\n    Klass.call(instance, copyFieldsFrom);\n    return instance;\n  } else {\n    return new Klass(copyFieldsFrom);\n  }\n};\n\nvar twoArgumentPooler = function(a1, a2) {\n  var Klass = this;\n  if (Klass.instancePool.length) {\n    var instance = Klass.instancePool.pop();\n    Klass.call(instance, a1, a2);\n    return instance;\n  } else {\n    return new Klass(a1, a2);\n  }\n};\n\nvar threeArgumentPooler = function(a1, a2, a3) {\n  var Klass = this;\n  if (Klass.instancePool.length) {\n    var instance = Klass.instancePool.pop();\n    Klass.call(instance, a1, a2, a3);\n    return instance;\n  } else {\n    return new Klass(a1, a2, a3);\n  }\n};\n\nvar fourArgumentPooler = function(a1, a2, a3, a4) {\n  var Klass = this;\n  if (Klass.instancePool.length) {\n    var instance = Klass.instancePool.pop();\n    Klass.call(instance, a1, a2, a3, a4);\n    return instance;\n  } else {\n    return new Klass(a1, a2, a3, a4);\n  }\n};\n\nvar standardReleaser = function(instance) {\n  var Klass = this;\n  !(instance instanceof Klass)\n    ? process.env.NODE_ENV !== 'production'\n      ? invariant(\n          false,\n          'Trying to release an instance into a pool of a different type.',\n        )\n      : _prodInvariant('25')\n    : void 0;\n  instance.destructor();\n  if (Klass.instancePool.length < Klass.poolSize) {\n    Klass.instancePool.push(instance);\n  }\n};\n\nvar DEFAULT_POOL_SIZE = 10;\nvar DEFAULT_POOLER = oneArgumentPooler;\n\n/**\n * Augments `CopyConstructor` to be a poolable class, augmenting only the class\n * itself (statically) not adding any prototypical fields. Any CopyConstructor\n * you give this may have a `poolSize` property, and will look for a\n * prototypical `destructor` on instances.\n *\n * @param {Function} CopyConstructor Constructor that can be used to reset.\n * @param {Function} pooler Customizable pooler.\n */\nvar addPoolingTo = function(CopyConstructor, pooler) {\n  // Casting as any so that flow ignores the actual implementation and trusts\n  // it to match the type we declared\n  var NewKlass = CopyConstructor;\n  NewKlass.instancePool = [];\n  NewKlass.getPooled = pooler || DEFAULT_POOLER;\n  if (!NewKlass.poolSize) {\n    NewKlass.poolSize = DEFAULT_POOL_SIZE;\n  }\n  NewKlass.release = standardReleaser;\n  return NewKlass;\n};\n\nvar PooledClass = {\n  addPoolingTo: addPoolingTo,\n  oneArgumentPooler: oneArgumentPooler,\n  twoArgumentPooler: twoArgumentPooler,\n  threeArgumentPooler: threeArgumentPooler,\n  fourArgumentPooler: fourArgumentPooler,\n};",lang:"js"}),o.createElement("h3",{id:"\u6dfb\u52a0\u5bf9\u8c61-addpoolingtoconstructor-getpooledfn"},o.createElement(l.AnchorLink,{to:"#\u6dfb\u52a0\u5bf9\u8c61-addpoolingtoconstructor-getpooledfn","aria-hidden":"true",tabIndex:-1},o.createElement("span",{className:"icon icon-link"})),"\u6dfb\u52a0\u5bf9\u8c61 addPoolingTo(Constructor, getPooledFn)"),o.createElement("p",null,"Constructor \u662f\u9700\u8981\u6dfb\u52a0\u5230\u5bf9\u8c61\u6c60\u7684\u6784\u9020\u51fd\u6570\uff0cgetPooledFn \u5b9a\u4e49\u5982\u4f55\u83b7\u53d6\u76f8\u5e94\u7684\u5b9e\u4f8b\uff0c\u9ed8\u8ba4\u503c\u4e3a DEFAULT_POOLER = oneArgumentPooler\uff0c\u5373\u51fd\u6570\u7b7e\u540d\u53ea\u6709\u4e00\u4e2a\u53c2\u6570\u6784\u9020\u51fd\u6570"),o.createElement(a.Z,{code:"function Fn(name) {\n  this.name = name;\n}\nvar FnWithPool = addPoolingTo(Fn);",lang:"js"}),o.createElement("p",null,"\u8fd4\u56de\u7684 FnWithPool \u8fd8\u662f\u6784\u9020\u51fd\u6570\uff0c\u5e76\u4e0d\u662f\u5b9e\u4f8b\uff0c\u53ea\u662f\u5728 Fn \u88c5\u9970\u4e0a\u5c5e\u6027\u548c\u65b9\u6cd5"),o.createElement("ul",null,o.createElement("li",null,"instancePool \u50a8\u5b58\u5b9e\u4f8b\u7684\u6c60\u5b50"),o.createElement("li",null,"getPooled \u83b7\u53d6\u5b9e\u4f8b\u7684\u65b9\u6cd5 \u9ed8\u8ba4\u503c oneArgumentPooler"),o.createElement("li",null,"release \u91ca\u653e\u5bf9\u8c61\u7684\u65b9\u6cd5\u503c\u4e3a standardReleaser"),o.createElement("li",null,"poolSize instancePool \u50a8\u5b58\u5b9e\u4f8b\u4e2a\u6570 \u9ed8\u8ba4\u503c DEFAULT_POOL_SIZE:10")),o.createElement("h3",{id:"\u83b7\u53d6\u5b9e\u4f8b-getpooledarg"},o.createElement(l.AnchorLink,{to:"#\u83b7\u53d6\u5b9e\u4f8b-getpooledarg","aria-hidden":"true",tabIndex:-1},o.createElement("span",{className:"icon icon-link"})),"\u83b7\u53d6\u5b9e\u4f8b getPooled(arg)"),o.createElement(a.Z,{code:"var inst = FnWithPool.getPooled('zw');",lang:"js"}),o.createElement("p",null,"\u56e0\u4e3a var FnWithPool = addPoolingTo(Fn)\u6ca1\u6709\u6dfb\u52a0\u7b2c\u4e8c\u4e2a\u53c2\u6570\uff0c\u6240\u4ee5 getPooled \u4e3a oneArgumentPooler"),o.createElement(a.Z,{code:"var oneArgumentPooler = function(copyFieldsFrom) {\n  // \u8fd9\u91cc\u7684this\u6307\u5411FnWithPool\n  var Klass = this;\n  // FnWithPool.instancePool\u5728addPoolingTo\u521d\u59cb\u5316\u4e3a[]\uff0c\u5373\u6c60\u5b50\u91cc\u6ca1\u6709\u5b9e\u4f8b\n  if (Klass.instancePool.length) {\n    var instance = Klass.instancePool.pop();\n    Klass.call(instance, copyFieldsFrom);\n    return instance;\n  } else {\n    // \u6240\u4ee5\u9700\u8981new\u521b\u5efa\u5b9e\u4f8b\n    // \u5b9e\u9645\u6267\u884cnew Fn('zw')\n    return new Klass(copyFieldsFrom);\n  }\n};",lang:"js"}),o.createElement("h3",{id:"\u91ca\u653e-releaseinst"},o.createElement(l.AnchorLink,{to:"#\u91ca\u653e-releaseinst","aria-hidden":"true",tabIndex:-1},o.createElement("span",{className:"icon icon-link"})),"\u91ca\u653e release(inst)"),o.createElement("p",null,"\u5f53\u5b9e\u4f8b\u4f7f\u7528\u5b8c\u540e\u9700\u8981\u628a\u5b9e\u4f8b\u91ca\u653e\u5230\u6c60\u5b50\u91cc\u4ee5\u4fbf\u4e0b\u6b21\u590d\u7528"),o.createElement(a.Z,{code:"FnWithPool.release(inst);",lang:"js"}),o.createElement(a.Z,{code:"var standardReleaser = function(instance) {\n  var Klass = this;\n  instance.destructor();\n  if (Klass.instancePool.length < Klass.poolSize) {\n    // \u628a\u6e05\u7406\u5b8c\u6210\u540e\u7684\u5b9e\u4f8b\u4fdd\u5b58\u5230FnWithPool.instancePool\n    Klass.instancePool.push(instance);\n  }\n};",lang:"js"}),o.createElement("p",null,"\u5b9e\u9645\u5c31\u662f\u8c03\u7528 standardReleaser\uff0cinstance.destructor()\u8c03\u7528\u5bf9\u8c61\u7684\u6790\u6784\u51fd\u6570\u505a\u6e05\u7406\u5de5\u4f5c\uff0c\u6240\u4ee5\u5bf9\u8c61\u9700\u8981\u5b9e\u73b0\u8fd9\u4e2a\u65b9\u6cd5\uff0c\u8fd9\u91cc\u6709\u70b9\u50cf\u5b9e\u73b0\u62bd\u8c61\u65b9\u6cd5\u3002\u6240\u4ee5\u4e0a\u9762\u7684 FnWithPool.release()\u4f1a\u62a5\u9519",o.createElement("code",null,"instance.destructor is not a function"),"\uff0c\u56e0\u4e3a Fn \u6ca1\u6709\u5b9e\u73b0\u8fd9\u4e2a\u65b9\u6cd5"),o.createElement(a.Z,{code:"function Fn(name) {\n  this.name = name;\n}\nFn.prototype.destructor = function() {\n  // \u6e05\u7406\u5de5\u4f5c\uff0c\u91ca\u653e\u5185\u5b58\uff0c\u5b9e\u4f8b\u4e0a\u53ef\u80fd\u5b58\u5728\u5f15\u7528\u7c7b\u578b\u7684\u503c[],{}\n  this.name = undefined;\n};",lang:"js"}),o.createElement("p",null,'\u5f53\u518d\u6b21\u4f7f\u7528\u65f6 var inst2 = FnWithPool.getPooled("zw2");'),o.createElement(a.Z,{code:"var oneArgumentPooler = function(copyFieldsFrom) {\n  var Klass = this;\n  // FnWithPool.instancePool\u5c31\u4e0d\u662f\u7a7a\u7684\u4e86\uff0c\u56e0\u4e3a\u4e0a\u9762release\u65f6\u5b58\u5165\u4e86\u4e00\u4e2a\u6e05\u7406\u540e\u7684\u5b9e\u4f8b\n  if (Klass.instancePool.length) {\n    var instance = Klass.instancePool.pop();\n    // \u8fd9\u91cc\u76f4\u63a5\u628aFn\u5f53\u666e\u901a\u51fd\u6570\u8c03\u7528\n    Klass.call(instance, copyFieldsFrom);\n    return instance;\n  } else {\n    return new Klass(copyFieldsFrom);\n  }\n};",lang:"js"}),o.createElement("ul",{className:"contains-task-list"},o.createElement("li",{className:"task-list-item"},o.createElement("input",{type:"checkbox",disabled:!0})," \u518d\u6b21\u83b7\u53d6\u5b9e\u4f8b\u65f6\uff0c\u540c\u6837\u6267\u884c\u4e86\u6784\u9020\u51fd\u6570\uff0c\u65e2\u7136\u8fd9\u6837\u90a3\u5bf9\u8c61\u6c60\u4e3a\u4ec0\u4e48\u80fd\u4f18\u5316\u6027\u80fd")),o.createElement("h2",{id:"react16-\u5bf9\u8c61\u6c60"},o.createElement(l.AnchorLink,{to:"#react16-\u5bf9\u8c61\u6c60","aria-hidden":"true",tabIndex:-1},o.createElement("span",{className:"icon icon-link"})),"React@16 \u5bf9\u8c61\u6c60"),o.createElement("p",null,"16 \u6ca1\u6709\u628a\u5bf9\u8c61\u6c60\u518d\u5355\u72ec\u62bd\u6210\u4e00\u4e2a\u6587\u4ef6\uff0c\u800c\u662f\u7531\u5177\u4f53\u7684\u6a21\u5757\u91cd\u590d\u5b9e\u73b0\uff0c\u6bd4\u5982\u4e8b\u4ef6"),o.createElement("p",null,"SyntheticEvent.js"),o.createElement(a.Z,{code:"const EVENT_POOL_SIZE = 10;\nfunction SyntheticEvent(\n  dispatchConfig,\n  targetInst,\n  nativeEvent,\n  nativeEventTarget,\n) {\n  //...\n}\nfunction releasePooledEvent(event) {\n  const EventConstructor = this;\n  invariant(\n    event instanceof EventConstructor,\n    'Trying to release an event instance into a pool of a different type.',\n  );\n  event.destructor();\n  if (EventConstructor.eventPool.length < EVENT_POOL_SIZE) {\n    EventConstructor.eventPool.push(event);\n  }\n}\n\nfunction addEventPoolingTo(EventConstructor) {\n  EventConstructor.eventPool = [];\n  EventConstructor.getPooled = getPooledEvent;\n  EventConstructor.release = releasePooledEvent;\n}\n\naddEventPoolingTo(SyntheticEvent);\n\nfunction getPooledEvent(dispatchConfig, targetInst, nativeEvent, nativeInst) {\n  const EventConstructor = this;\n  if (EventConstructor.eventPool.length) {\n    const instance = EventConstructor.eventPool.pop();\n    EventConstructor.call(\n      instance,\n      dispatchConfig,\n      targetInst,\n      nativeEvent,\n      nativeInst,\n    );\n    return instance;\n  }\n  return new EventConstructor(\n    dispatchConfig,\n    targetInst,\n    nativeEvent,\n    nativeInst,\n  );\n}",lang:"js"}),o.createElement("ul",{className:"contains-task-list"},o.createElement("li",{className:"task-list-item"},o.createElement("input",{type:"checkbox",disabled:!0})," React@16 \u4e3a\u4ec0\u4e48\u4f1a\u5220\u9664 PooledClass.js \u6587\u4ef6\u6539\u4e3a\u5177\u4f53\u5bf9\u8c61\u5355\u72ec\u5b9e\u73b0\u5bf9\u8c61\u6c60")),o.createElement("p",null,"google \u641c\u7d22 why React@16 delete PooledClass.js \u53d1\u73b0\u4e86\u8fd9\u4e2a issue",o.createElement(l.Link,{to:"https://github.com/facebook/react/issues/9325"},"https://github.com/facebook/react/issues/9325"),"\u540c\u65f6\u8fd8\u56de\u7b54\u4e86\u53e6\u5916\u4e00\u4e2a\u95ee\u9898\uff0c\u5bf9\u8c61\u6c60\u4ee3\u7801\u91cc\u5b9a\u4e49\u4e86 oneArgumentPooler,tow,three,four \u56db\u4e2a\u83b7\u53d6\u5bf9\u8c61\u7684\u65b9\u6cd5\uff0c\u4ed6\u4eec\u552f\u4e00\u533a\u522b\u5c31\u662f\u53c2\u6570\u4e0d\u4e00\u6837\u3002"),o.createElement(a.Z,{code:"var PooledClass = {\n  addPoolingTo: addPoolingTo,\n  oneArgumentPooler: oneArgumentPooler,\n  twoArgumentPooler: twoArgumentPooler,\n  threeArgumentPooler: threeArgumentPooler,\n  fourArgumentPooler: fourArgumentPooler,\n};",lang:"js"}),o.createElement("p",null,"\u5f53\u65f6\u81ea\u5df1\u548c\u63d0\u8fd9\u4e2a issue \u7684\u54e5\u4eec\u60f3\u6cd5\u4e00\u6837\u5b8c\u5168\u53ef\u4ee5\u5199\u4e00\u4e2a\u901a\u7528\u7684\u3002\u800c\u4e14\u8fd8\u6709\u76f8\u5173\u7684 PR",o.createElement(l.Link,{to:"https://github.com/facebook/react/pull/7814"},"https://github.com/facebook/react/pull/7814"),"\u770b\u4e86\u56de\u7b54\u624d\u660e\u767d\u4e3a\u4ec0\u4e48\u8fd9\u6837\u505a"),o.createElement("ul",null,o.createElement("li",null,o.createElement("p",null,"\u7956\u4f20\u4ee3\u7801\u907f\u514d\u98ce\u9669\u4e00\u76f4\u4fdd\u7559\u7740")),o.createElement("li",null,o.createElement("p",null,"\u51fa\u4e8e\u6027\u80fd\u8003\u8651\u4e0d\u4f7f\u7528",o.createElement("code",null,"arguments")," \u4e5f\u5c31\u4e0d\u540c\u4e2a\u6570\u53c2\u6570\u5199\u4e00\u4e2a\u51fd\u6570 \u6587\u4ef6\u5934\u90e8\u6709\u6bb5\u6ce8\u91ca\u4e4b\u524d\u4e00\u76f4\u6ca1\u6709\u6ce8\u610f"),o.createElement("blockquote",null,o.createElement("p",null,"A completely generic pooler is easy to implement, but would require accessing the ",o.createElement("code",null,"arguments")," object")))),o.createElement("p",null,"\u610f\u601d\u5c31\u662f\u4e00\u4e2a\u901a\u7528\u7684\u5904\u7406\u51fd\u6570\u5f88\u5bb9\u6613\u5b9e\u65bd\uff0c\u4f46\u662f\u9700\u8981\u4f7f\u7528 ",o.createElement("code",null,"arguments")," \uff08\u4f30\u8ba1\u7956\u4f20\u4ee3\u7801\u65f6\u8fd8\u6ca1\u6709...args\uff09 \u7136\u540e\u4e3a\u5565\u662f\u7528 arguments \u4e0d\u5c31\u8fd9\u6837\u641e\u4e86\u3002dan \u795e\u56de\u590d"),o.createElement("blockquote",null,o.createElement("p",null,"The person who wrote this code several years ago was likely worried about JS engine deoptimizations caused by using arguments")),o.createElement("p",null,"\u6211\u53c8\u8ff7\u4e86",o.createElement("code",null,"arguments"),"\u4f1a\u5f71\u54cd\u6027\u80fd\uff0c\u4e4b\u524d\u6709\u5370\u8c61",o.createElement("code",null,"with"),",",o.createElement("code",null,"evel"),"\u4f1a\u5f71\u54cd JS \u5f15\u64ce\u5bf9\u4ee3\u7801\u4f18\u5316\uff0c\u7ed3\u679c\u4e00\u8def\u67e5\u624d\u77e5\u9053\u6709\u4e2a",o.createElement("code",null,"Optimization-killers")),o.createElement("p",null,o.createElement(l.Link,{to:"https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments"},"https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments"),o.createElement(l.Link,{to:"https://div.io/topic/1269"},"https://div.io/topic/1269"),o.createElement(l.Link,{to:"https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#3-managing-arguments"},"https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#3-managing-arguments")),o.createElement("p",null,"\u5927\u6982\u5305\u62ec\u4e0b\u9762\u51e0\u79cd\u60c5\u51b5\u8ba9\u51fd\u6570\u65e0\u6cd5\u88ab\u4f18\u5316"),o.createElement("ul",null,o.createElement("li",null,"with eval \u8fd9\u4e24\u4e2a\u610f\u6599\u4e2d\u7684"),o.createElement("li",null,"\u5305\u542b debugger"),o.createElement("li",null,"arguments \u4f7f\u7528\u4e0d\u5f53"),o.createElement("li",null,o.createElement("code",null,"__proto__"),",",o.createElement("code",null,"get"),",",o.createElement("code",null,"set"))))))}}]);