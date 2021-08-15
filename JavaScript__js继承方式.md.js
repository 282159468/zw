(self["webpackChunkzw"]=self["webpackChunkzw"]||[]).push([[5577],{46717:function(e,n,t){"use strict";t.r(n);var l=t(67294),a=t(96089),o=t(65659);t(53132);n["default"]=e=>(l.useEffect((()=>{var n;null!==e&&void 0!==e&&null!==(n=e.location)&&void 0!==n&&n.hash&&a.AnchorLink.scrollToAnchor(decodeURIComponent(e.location.hash.slice(1)))}),[]),l.createElement(l.Fragment,null,l.createElement("div",{className:"markdown"},l.createElement("h2",{id:"\u539f\u578b\u94fe\u7ee7\u627f"},l.createElement(a.AnchorLink,{to:"#\u539f\u578b\u94fe\u7ee7\u627f","aria-hidden":"true",tabIndex:-1},l.createElement("span",{className:"icon icon-link"})),"\u539f\u578b\u94fe\u7ee7\u627f"),l.createElement("p",null,"\u81ea\u5df1\u6700\u5148\u63a5\u89e6\u7684\u7ee7\u627f\u65b9\u5f0f"),l.createElement(o.Z,{code:"function SuperType() {\n  this.name = 'foo';\n  this.books = ['js', 'css'];\n}\n\nSuperType.bar = 1;\nSuperType.prototype.sayName = function() {\n  return this.name;\n};\n\nfunction SubType(name) {\n  this.name = name;\n}\n\nSubType.prototype = new SuperType();\n\nconst c = new SubType('foo1');\nc.sayName(); // foo1\nc.bar; // undefined\nc.books.push('html');\n\nconst c2 = new SubType('foo2');\nc2.sayName(); // foo2\nc2.books; // [\"js\", \"css\", \"html\"]",lang:"js"}),l.createElement("h3",{id:"\u4f18\u70b9"},l.createElement(a.AnchorLink,{to:"#\u4f18\u70b9","aria-hidden":"true",tabIndex:-1},l.createElement("span",{className:"icon icon-link"})),"\u4f18\u70b9"),l.createElement("ul",null,l.createElement("li",null,"\u5b9e\u4f8b\u5171\u4eab\u8d85\u7c7b\u539f\u578b\u4e2d\u7684\u5c5e\u6027\u3001\u65b9\u6cd5\uff0c\u907f\u514d\u5355\u72ec\u7ed9\u6bcf\u4e2a\u5b9e\u4f8b\u521b\u5efa")),l.createElement("h3",{id:"\u7f3a\u70b9\uff1a"},l.createElement(a.AnchorLink,{to:"#\u7f3a\u70b9\uff1a","aria-hidden":"true",tabIndex:-1},l.createElement("span",{className:"icon icon-link"})),"\u7f3a\u70b9\uff1a"),l.createElement("ul",null,l.createElement("li",null,l.createElement("strong",null,"\u6b63\u662f\u7531\u4e8e\u5171\u4eab\u539f\u578b\u4e2d\u7684\u5c5e\u6027\uff0c\u4f1a\u9020\u6210\u5f15\u7528\u7c7b\u578b\u7684\u6570\u636e\u88ab\u5b9e\u4f8b\u4fee\u6539")),l.createElement("li",null,l.createElement("strong",null,"\u521b\u5efa\u5b9e\u4f8b\u65f6 new SubType()\u65f6\u65e0\u6cd5\u5411\u8d85\u7c7b SuperType \u4f20\u9012\u53c2\u6570")),l.createElement("li",null,"c instanceof SuperType false"),l.createElement("li",null,"\u9700\u8981\u624b\u52a8\u7ed1\u5b9a\u4e0b SubType.prototype.constructor = SubType")),l.createElement("h3",{id:"instanceof-\u7684\u7406\u89e3"},l.createElement(a.AnchorLink,{to:"#instanceof-\u7684\u7406\u89e3","aria-hidden":"true",tabIndex:-1},l.createElement("span",{className:"icon icon-link"})),"instanceof \u7684\u7406\u89e3"),l.createElement("p",null,"\u66fe\u7ecf\u8bf4 c instanceof SuperType \u7684\u610f\u601d\u662f\u68c0\u67e5 c \u662f\u5426\u4e3a SuperType \u7684\u5b9e\u4f8b\uff0c\u4f46\u5b9e\u9645 MDN \u4e0a\u7684\u89e3\u91ca\u4e3a"),l.createElement("blockquote",null,l.createElement("p",null,"instanceof \u8fd0\u7b97\u7b26\u7528\u4e8e\u68c0\u6d4b\u6784\u9020\u51fd\u6570\u7684 prototype \u5c5e\u6027\u662f\u5426\u51fa\u73b0\u5728\u67d0\u4e2a\u5b9e\u4f8b\u5bf9\u8c61\u7684\u539f\u578b\u94fe\u4e0a\u3002")),l.createElement("p",null,"\u901a\u8fc7\u8fd9\u4e2a\u4f8b\u5b50\u597d\u7406\u89e3\u70b9"),l.createElement(o.Z,{code:"function SuperType() {\n  this.name = 'a';\n}\n\nSuperType.foo = 1;\n\nfunction SubType() {}\n\nSubType.prototype = Object.create(SuperType.prototype);\n\nconst c = new SubType();\n\nconsole.log(c instanceof SuperType); // true",lang:"js"}),l.createElement("p",null,"\u539f\u578b\u94fe"),l.createElement("p",null,"c.__proto__ - SubType.prototype - SubType.prototype.__proto__ - SuperType.prototype"),l.createElement("p",null,"\u68c0\u6d4b\u6784\u9020\u51fd\u6570\u7684 prototype \u5c5e\u6027\u662f\u5426\u51fa\u73b0\u5728\u67d0\u4e2a\u5b9e\u4f8b\u5bf9\u8c61\u7684\u539f\u578b\u94fe\u4e0a"),l.createElement("p",null,"\u8f6c\u6362\u4e3a"),l.createElement("p",null,"\u6784\u9020\u51fd\u6570 SuperType.prototype \u662f\u5426\u51fa\u73b0\u5728\u5b9e\u4f8b\u5bf9\u8c61 c \u7684\u539f\u578b\u94fe\u4e0a"),l.createElement("p",null,"\u8fd8\u6709\u4e00\u70b9 instanceof \u53f3\u4fa7\u5fc5\u9700\u662f\u4e00\u4e2a callable \u5bf9\u8c61\uff0c\u5373\u6784\u9020\u51fd\u6570\uff0c\u5426\u5219\u4f1a\u62a5\u9519\uff0c"),l.createElement("blockquote",null,l.createElement("p",null,"Right-hand side of 'instanceof' is not callable")),l.createElement("p",null,"\u8fd9\u91cc\u4e0d\u592a\u6e05\u695a\u5982\u679c\u7528 proxy \u4ee3\u7406\u4e00\u4e2a\u666e\u901a\u5bf9\u8c61\u7684 call \u80fd\u4e0d\u80fd\u9a97\u8fc7 instanceof"),l.createElement("h2",{id:"\u501f\u7528\u6784\u9020\u51fd\u6570\u7ee7\u627f"},l.createElement(a.AnchorLink,{to:"#\u501f\u7528\u6784\u9020\u51fd\u6570\u7ee7\u627f","aria-hidden":"true",tabIndex:-1},l.createElement("span",{className:"icon icon-link"})),"\u501f\u7528\u6784\u9020\u51fd\u6570\u7ee7\u627f"),l.createElement(o.Z,{code:"function SuperType(name) {\n  this.name = name;\n  this.books = ['js', 'css'];\n}\n\nSuperType.prototype.sayName = function() {\n  return this.name;\n};\n\nfunction SubType(name) {\n  const o = SuperType.call(this, name);\n  this.age = 35;\n}\n\nconst inst = new SubType('zw');\ninst.books.push('html');\nconsole.log(inst.age); // 35\nconsole.log(inst.name); // zw\nconsole.log(inst instanceof SuperType); // false\nconsole.log(inst.sayName()); // error\n\nconst inst2 = new SubType('zw');\nconsole.log(inst2.books); // [\"js\", \"css\"]",lang:"js"}),l.createElement("h3",{id:"\u4f18\u70b9-1"},l.createElement(a.AnchorLink,{to:"#\u4f18\u70b9-1","aria-hidden":"true",tabIndex:-1},l.createElement("span",{className:"icon icon-link"})),"\u4f18\u70b9"),l.createElement("ul",null,l.createElement("li",null,"\u53ef\u4ee5\u5411\u8d85\u7c7b\u4f20\u9012\u53c2\u6570"),l.createElement("li",null,"\u72ec\u7acb\u7684\u5b9e\u4f8b\u5c5e\u6027")),l.createElement("h3",{id:"\u7f3a\u70b9"},l.createElement(a.AnchorLink,{to:"#\u7f3a\u70b9","aria-hidden":"true",tabIndex:-1},l.createElement("span",{className:"icon icon-link"})),"\u7f3a\u70b9"),l.createElement("ul",null,l.createElement("li",null,l.createElement("strong",null,"\u4e0d\u80fd\u7ee7\u627f\u8d85\u7c7b\u539f\u578b\u4e2d\u7684\u5c5e\u6027\u3001\u65b9\u6cd5")),l.createElement("li",null,"\u539f\u578b\u94fe\u65ad\u5f00\uff0c\u4e0d\u80fd\u6b63\u786e\u5224\u65ad\u7c7b\u578b")),l.createElement("h2",{id:"\u7ec4\u5408\u7ee7\u627f"},l.createElement(a.AnchorLink,{to:"#\u7ec4\u5408\u7ee7\u627f","aria-hidden":"true",tabIndex:-1},l.createElement("span",{className:"icon icon-link"})),"\u7ec4\u5408\u7ee7\u627f"),l.createElement("p",null,"\u8fd9\u79cd\u7ee7\u627f\u65b9\u5f0f\u5c31\u662f\u539f\u578b\u94fe\u7ee7\u627f\u548c\u501f\u7528\u6784\u9020\u51fd\u6570\u7ee7\u627f\u4e24\u79cd\u65b9\u5f0f\u7ec4\u5408\u800c\u6210\uff0c\u7efc\u5408\u4e24\u79cd\u65b9\u5f0f\u7684\u4f18\u70b9"),l.createElement(o.Z,{code:'function SuperType(name) {\n  this.name = name;\n  this.books = [\'js\', \'css\'];\n}\n\nSuperType.prototype.sayName = function() {\n  return this.name;\n};\n\nSuperType.prototype.works = [\'foo\', \'bar\'];\n\nfunction SubType(name) {\n  const o = SuperType.call(this, name);\n  this.age = 35;\n}\n\nSubType.prototype = new SuperType();\n\nconst inst = new SubType(\'zw\');\nconst inst2 = new SubType();\ninst.books.push(\'html\');\ninst.works.push(\'baz\');\nconsole.log(inst instanceof SuperType); // true\nconsole.log(inst.sayName()); // zw\nconsole.log(inst.books); // ["js", "css", "html"]\nconsole.log(SubType.prototype.books); // ["js", "css"]\nconsole.log(inst2.books); // ["js", "css"]\nconsole.log(inst2.works); // ["foo", "bar", "baz"]',lang:"js"}),l.createElement("h3",{id:"\u4f18\u70b9-2"},l.createElement(a.AnchorLink,{to:"#\u4f18\u70b9-2","aria-hidden":"true",tabIndex:-1},l.createElement("span",{className:"icon icon-link"})),"\u4f18\u70b9"),l.createElement("ul",null,l.createElement("li",null,l.createElement("p",null,"\u89e3\u51b3\u539f\u578b\u94fe\u7ee7\u627f\uff1a\u5f15\u7528\u7c7b\u578b\u7684\u539f\u578b\u5c5e\u6027\u88ab\u5b9e\u4f8b\u4fee\u6539\u5f71\u54cd\u6240\u6709\u5b9e\u4f8b"),l.createElement("p",null,l.createElement("em",null,"\u539f\u578b\u4e0a\u7684\u5f15\u7528\u7c7b\u578b\u6570\u636e\u88ab\u4fee\u6539\u8fd8\u662f\u4f1a\u5f71\u54cd\uff0c\u8fd9\u79cd\u7ee7\u627f\u9002\u5408\u628a\u5f15\u7528\u7c7b\u578b\u6570\u636e\u8d85\u7c7b\u6784\u9020\u51fd\u6570\u4e2d"))),l.createElement("li",null,l.createElement("p",null,"\u89e3\u51b3\u539f\u578b\u94fe\u7ee7\u627f\uff1a\u65e0\u6cd5\u5411\u8d85\u7c7b\u4f20\u53c2\u6570")),l.createElement("li",null,l.createElement("p",null,"\u89e3\u51b3\u501f\u7528\u6784\u9020\u51fd\u6570\u7ee7\u627f\uff1a\u65e0\u6cd5\u7ee7\u627f\u8d85\u7c7b\u539f\u578b\u4e0a\u7684\u5c5e\u6027[1]")),l.createElement("li",null,l.createElement("p",null,"\u539f\u578b\u94fe\u6b63\u5e38"))),l.createElement("h3",{id:"\u7f3a\u70b9-1"},l.createElement(a.AnchorLink,{to:"#\u7f3a\u70b9-1","aria-hidden":"true",tabIndex:-1},l.createElement("span",{className:"icon icon-link"})),"\u7f3a\u70b9"),l.createElement("ul",null,l.createElement("li",null,"\u8c03\u7528\u4e24\u6b21\u8d85\u7c7b\u51fd\u6570"),l.createElement("li",null,"\u7531\u7f3a\u70b9 1 \u5bfc\u81f4\u5b9e\u4f8b(inst.books)\u548c\u5b50\u7c7b\u539f\u578b(SubType.prototype.books)\u4e0a\u6709\u91cd\u590d\u6570\u636e")),l.createElement("h2",{id:"\u539f\u578b\u7ee7\u627f\u5b9e\u4f8b\u7ee7\u627f"},l.createElement(a.AnchorLink,{to:"#\u539f\u578b\u7ee7\u627f\u5b9e\u4f8b\u7ee7\u627f","aria-hidden":"true",tabIndex:-1},l.createElement("span",{className:"icon icon-link"})),"\u539f\u578b\u7ee7\u627f/\u5b9e\u4f8b\u7ee7\u627f"),l.createElement(o.Z,{code:"function SuperType(name) {\n  this.name = name;\n  this.books = ['js', 'css'];\n}\n\nSuperType.prototype.sayName = function() {\n  return this.name;\n};\n\nfunction SubType(name) {\n  const o = Object.create(SuperType.prototype);\n  // \u6216\u8005\n  // const o = new SuperType()\n  o.name = name;\n  return o;\n}\n\nconst inst = new SubType('zw');",lang:"js"}),l.createElement("p",null,"\u8fd9\u79cd\u7ee7\u627f\u65b9\u5f0f\u7279\u70b9\u521b\u5efa\u5b9e\u4f8b\u65f6 SubType()\u548c new SubType()\u6548\u679c\u662f\u4e00\u6837\u7684"),l.createElement("h3",{id:"\u7f3a\u70b9-2"},l.createElement(a.AnchorLink,{to:"#\u7f3a\u70b9-2","aria-hidden":"true",tabIndex:-1},l.createElement("span",{className:"icon icon-link"})),"\u7f3a\u70b9"),l.createElement("ol",null,l.createElement("li",null,"\u539f\u578b\u94fe\u6df7\u4e71\uff0cinst \u4e0d\u662f SubType \u7684\u5b9e\u4f8b\uff0c\u53cd\u800c\u662f SuperType \u7684\u5b9e\u4f8b")),l.createElement("h2",{id:"\u5bc4\u751f\u7ec4\u5408\u7ee7\u627f"},l.createElement(a.AnchorLink,{to:"#\u5bc4\u751f\u7ec4\u5408\u7ee7\u627f","aria-hidden":"true",tabIndex:-1},l.createElement("span",{className:"icon icon-link"})),"\u5bc4\u751f\u7ec4\u5408\u7ee7\u627f"),l.createElement(o.Z,{code:"function SuperType(name) {\n  this.name = name;\n  this.books = ['js', 'css'];\n}\n\nSuperType.prototype.sayName = function() {\n  return this.name;\n};\n\nfunction SubType(name) {\n  SuperType.call(this);\n  this.name = name;\n}\n\nSubType.prototype = new SuperType();\nSubType.prototype.constructor = SubType;\nconst inst = new SubType('zw');",lang:"js"}),l.createElement("p",null,"\u4e0a\u9762\u662f\u7ec4\u5408\u7ee7\u627f\u4ee3\u7801\uff0c\u5bc4\u751f\u7ec4\u5408\u53ea\u9700\u8981\u4fee\u6539 SubType.prototype = new SuperType();"),l.createElement(o.Z,{code:"SubType.prototype = Object.create(SuperType.prototype);\n// \u6216\u8005\nconst Fn = function() {};\nFn.prototype = new SuperType();\nSubType.prototype = new Fn();",lang:"js"}),l.createElement("p",null,"\u5b8c\u6574\u4ee3\u7801"),l.createElement(o.Z,{code:"function SuperType(name) {\n  this.name = name;\n  this.books = ['js', 'css'];\n}\n\nSuperType.prototype.sayName = function() {\n  return this.name;\n};\n\nfunction SubType(name) {\n  SuperType.call(this);\n  this.name = name;\n}\n\nconst Fn = function() {};\nFn.prototype = new SuperType();\nSubType.prototype = new Fn();\nSubType.prototype.constructor = SubType;\nconst inst = new SubType('zw');",lang:"js"}),l.createElement("p",null,"\u901a\u8fc7\u4e2d\u95f4\u8fd9\u4e2a Fn \u6784\u9020\u51fd\u6570\u89e3\u51b3\u4e86\u7ec4\u5408\u7ee7\u627f\u8c03\u7528\u4e24\u6b21 SuperType \u9020\u6210\u6bcf\u4e2a\u5b9e\u4f8b\u548c SubType.prototype \u4e0a\u90fd\u6709\u91cd\u590d\u5c5e\u6027\u7684\u95ee\u9898;\u539f\u578b\u94fe\u4e5f\u6b63\u5e38 inst \u540c\u65f6\u662f SubType\u3001SuperType \u7684\u5b9e\u4f8b\u7b26\u5408\u9884\u671f"),l.createElement("h2",{id:"es6-class"},l.createElement(a.AnchorLink,{to:"#es6-class","aria-hidden":"true",tabIndex:-1},l.createElement("span",{className:"icon icon-link"})),"ES6 Class"),l.createElement("p",null,"ES6 CLass \u4ee3\u7801\u901a\u8fc7 babel \u7f16\u8bd1\u540e\u8fd8\u662f\u4f7f\u7528\u539f\u578b\u94fe\u5b9e\u73b0\u7ee7\u627f\u7684\uff0c\u4f46\u73b0\u4ee3\u6d4f\u89c8\u5668\u5df2\u5f00\u59cb\u539f\u751f\u652f\u6301 Class"))))}}]);