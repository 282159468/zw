(self["webpackChunkzw"]=self["webpackChunkzw"]||[]).push([[5275],{83966:function(){},9798:function(){},28836:function(){},69800:function(){},78075:function(){},58927:function(){},51624:function(){},22231:function(t,e,a){"use strict";a.d(e,{m:function(){return n.m}});var n=a(9684);a(72255)},49215:function(t,e,a){"use strict";function n(t){return n="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(t)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=u(a(67294)),i=c(a(78320)),l=c(a(96433));function c(t){return t&&t.__esModule?t:{default:t}}function o(t){if("function"!==typeof WeakMap)return null;var e=new WeakMap,a=new WeakMap;return(o=function(t){return t?a:e})(t)}function u(t,e){if(!e&&t&&t.__esModule)return t;if(null===t||"object"!==n(t)&&"function"!==typeof t)return{default:t};var a=o(e);if(a&&a.has(t))return a.get(t);var r={},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var l in t)if("default"!==l&&Object.prototype.hasOwnProperty.call(t,l)){var c=i?Object.getOwnPropertyDescriptor(t,l):null;c&&(c.get||c.set)?Object.defineProperty(r,l,c):r[l]=t[l]}return r["default"]=t,a&&a.set(t,r),r}function s(t,e){return h(t)||d(t,e)||p(t,e)||m()}function m(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function p(t,e){if(t){if("string"===typeof t)return f(t,e);var a=Object.prototype.toString.call(t).slice(8,-1);return"Object"===a&&t.constructor&&(a=t.constructor.name),"Map"===a||"Set"===a?Array.from(t):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?f(t,e):void 0}}function f(t,e){(null==e||e>t.length)&&(e=t.length);for(var a=0,n=new Array(e);a<e;a++)n[a]=t[a];return n}function d(t,e){var a=null==t?null:"undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=a){var n,r,i=[],l=!0,c=!1;try{for(a=a.call(t);!(l=(n=a.next()).done);l=!0)if(i.push(n.value),e&&i.length===e)break}catch(o){c=!0,r=o}finally{try{l||null==a["return"]||a["return"]()}finally{if(c)throw r}}return i}}function h(t){if(Array.isArray(t))return t}function v(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function y(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?v(Object(a),!0).forEach((function(e){g(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):v(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function g(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}var b=function(t,e){var a=function(){for(var t,a=arguments.length,n=new Array(a),r=0;r<a;r++)n[r]=arguments[r];var i=n[1].replace(/([^^])\/$/,"$1");return y(y({},(null===(t=n[0].find((function(t){var e=t.path;return e===i})))||void 0===t?void 0:t.meta)||{}),{},{__pathname:e})},n=(0,r.useState)(a(t,e)),i=s(n,2),l=i[0],c=i[1];return(0,r.useLayoutEffect)((function(){c(a(t,e))}),[e]),l},j=function(t,e){var a=function(){for(var e,a=arguments.length,n=new Array(a),r=0;r<a;r++)n[r]=arguments[r];return(null===(e=n[0].find((function(t){return n[1].startsWith("/".concat(t.name))})))||void 0===e?void 0:e.name)||t[0].name},n=(0,r.useState)(a(t,e)),i=s(n,2),l=i[0],c=i[1];return(0,r.useLayoutEffect)((function(){c(a(t,e))}),[e]),l},E=function(t,e,a){var n=function(){for(var t,e=arguments.length,a=new Array(e),n=0;n<e;n++)a[n]=arguments[n];for(var r=a[0].navs[a[1]]||[],i="*",l=r.length-1;l>=0;l-=1){var c=r[l],o=[c].concat(c.children).filter(Boolean),u=o.find((function(t){return t.path&&new RegExp("^".concat(t.path.replace(/\.html$/,""),"(/|.|$)")).test(a[2])}));if(u){i=u.path;break}}return(null===(t=a[0].menus[a[1]])||void 0===t?void 0:t[i])||[]},i=(0,r.useState)(n(t,e,a)),l=s(i,2),c=l[0],o=l[1];return(0,r.useLayoutEffect)((function(){o(n(t,e,a))}),[t.navs,t.menus,e,a]),c},k=function(t,e,a){var n=function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];return n[0]===n[1][0].name?n[2].path:"".concat(a.path,"/").concat(t).replace(/\/\//,"/")},i=(0,r.useState)(n(t,e,a)),l=s(i,2),c=l[0],o=l[1];return(0,r.useLayoutEffect)((function(){o(n(t,e,a))}),[t]),c},w=function t(e){var a;return null===(a=e.find((function(e){return!!e.__dumiRoot||!!e.routes&&t(e.routes)})))||void 0===a?void 0:a.routes},S=function(t){var e=t.location,a=t.route,n=t.children,c=e.pathname.replace(a.path.replace(/^\/$/,"//"),""),o=w(t.routes)||[],u=b(o,e.pathname),s=j(i["default"].locales,c),m=E(i["default"],s,e.pathname),p=k(s,i["default"].locales,a);return r["default"].createElement(l["default"].Provider,{value:{config:i["default"],meta:u.__pathname===e.pathname?u:{},locale:s,nav:i["default"].navs[s]||[],menu:m,base:p,routes:o}},n)},_=S;e.default=_},48749:function(t,e,a){"use strict";a.r(e),a.d(e,{default:function(){return J}});var n=a(67294),r=a(96089),i=a(22231),l=(a(9798),function(t){var e=t.location,a=(0,n.useContext)(r.context),l=a.base,c=a.locale,o=a.config.locales,u=o.find((function(t){var e=t.name;return e!==c}));function s(t){var a=l.replace("/".concat(c),""),n=e.pathname.replace(l,a)||"/";if(t!==o[0].name){var r="".concat(a,"/").concat(t).replace(/\/\//,"/"),i=e.pathname.replace(l.replace(/^\/$/,"//"),"");return"".concat(r).concat(i).replace(/\/$/,"")}return n}return u?n.createElement("div",{className:"__dumi-default-locale-select","data-locale-count":o.length},o.length>2?n.createElement("select",{value:c,onChange:function(t){return i.m.push(s(t.target.value))}},o.map((function(t){return n.createElement("option",{value:t.name,key:t.name},t.label)}))):n.createElement(r.Link,{to:s(u.name)},u.label)):null}),c=l,o=(a(28836),function(t){var e=t.onMobileMenuClick,a=t.navPrefix,i=t.location,l=t.darkPrefix,o=(0,n.useContext)(r.context),u=o.base,s=o.config,m=s.mode,p=s.title,f=s.logo,d=o.nav;return n.createElement("div",{className:"__dumi-default-navbar","data-mode":m},n.createElement("button",{className:"__dumi-default-navbar-toggle",onClick:e}),n.createElement(r.Link,{className:"__dumi-default-navbar-logo",style:{backgroundImage:f&&"url('".concat(f,"')")},to:u,"data-plaintext":!1===f||void 0},p),n.createElement("nav",null,a,d.map((function(t){var e,a=Boolean(null===(e=t.children)||void 0===e?void 0:e.length)&&n.createElement("ul",null,t.children.map((function(t){return n.createElement("li",{key:t.path},n.createElement(r.NavLink,{to:t.path},t.title))})));return n.createElement("span",{key:t.title||t.path},t.path?n.createElement(r.NavLink,{to:t.path,key:t.path},t.title):t.title,a)})),n.createElement("div",{className:"__dumi-default-navbar-tool"},n.createElement(c,{location:i}),l)))}),u=o,s=(a(58927),["slugs"]);function m(){return m=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(t[n]=a[n])}return t},m.apply(this,arguments)}function p(t,e){if(null==t)return{};var a,n,r=f(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(n=0;n<i.length;n++)a=i[n],e.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(t,a)&&(r[a]=t[a])}return r}function f(t,e){if(null==t)return{};var a,n,r={},i=Object.keys(t);for(n=0;n<i.length;n++)a=i[n],e.indexOf(a)>=0||(r[a]=t[a]);return r}var d=function(t){var e=t.slugs,a=p(t,s);return n.createElement("ul",m({role:"slug-list"},a),e.filter((function(t){var e=t.depth;return e>1&&e<4})).map((function(t){return n.createElement("li",{key:t.heading,title:t.value,"data-depth":t.depth},n.createElement(r.AnchorLink,{to:"#".concat(t.heading)},n.createElement("span",null,t.value)))})))},h=d,v=(a(78075),function(t){var e=t.mobileMenuCollapsed,a=t.location,i=t.darkPrefix,l=(0,n.useContext)(r.context),o=l.config,u=o.logo,s=o.title,m=o.description,p=o.mode,f=o.repository.url,d=l.menu,v=l.nav,y=l.base,g=l.meta,b=Boolean((g.hero||g.features||g.gapless)&&"site"===p)||!1===g.sidemenu||void 0;return n.createElement("div",{className:"__dumi-default-menu","data-mode":p,"data-hidden":b,"data-mobile-show":!e||void 0},n.createElement("div",{className:"__dumi-default-menu-inner"},n.createElement("div",{className:"__dumi-default-menu-header"},n.createElement(r.Link,{to:y,className:"__dumi-default-menu-logo",style:{backgroundImage:u&&"url('".concat(u,"')")}}),n.createElement("h1",null,s),n.createElement("p",null,m),/github\.com/.test(f)&&"doc"===p&&n.createElement("p",null,n.createElement("object",{type:"image/svg+xml",data:"https://img.shields.io/github/stars".concat(f.match(/((\/[^\/]+){2})$/)[1],"?style=social")}))),n.createElement("div",{className:"__dumi-default-menu-mobile-area"},!!v.length&&n.createElement("ul",{className:"__dumi-default-menu-nav-list"},v.map((function(t){var e,a=Boolean(null===(e=t.children)||void 0===e?void 0:e.length)&&n.createElement("ul",null,t.children.map((function(t){return n.createElement("li",{key:t.path||t.title},n.createElement(r.NavLink,{to:t.path},t.title))})));return n.createElement("li",{key:t.path||t.title},t.path?n.createElement(r.NavLink,{to:t.path},t.title):t.title,a)}))),n.createElement(c,{location:a}),i),n.createElement("ul",{className:"__dumi-default-menu-list"},!b&&d.map((function(t){var e,i=Boolean(null===(e=g.slugs)||void 0===e?void 0:e.length),l=t.children&&Boolean(t.children.length),c="menu"===g.toc&&!l&&i&&t.path===a.pathname.replace(/([^^])\/$/,"$1");return n.createElement("li",{key:t.path||t.title},n.createElement(r.NavLink,{to:t.path,exact:!(t.children&&t.children.length)},t.title),Boolean(t.children&&t.children.length)&&n.createElement("ul",null,t.children.map((function(t){return n.createElement("li",{key:t.path},n.createElement(r.NavLink,{to:t.path,exact:!0},n.createElement("span",null,t.title)),Boolean("menu"===g.toc&&"undefined"!==typeof window&&t.path===a.pathname&&i)&&n.createElement(h,{slugs:g.slugs}))}))),c&&n.createElement(h,{slugs:g.slugs}))})))))}),y=v;a(69800);function g(){return g=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(t[n]=a[n])}return t},g.apply(this,arguments)}function b(t,e){return S(t)||w(t,e)||E(t,e)||j()}function j(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function E(t,e){if(t){if("string"===typeof t)return k(t,e);var a=Object.prototype.toString.call(t).slice(8,-1);return"Object"===a&&t.constructor&&(a=t.constructor.name),"Map"===a||"Set"===a?Array.from(t):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?k(t,e):void 0}}function k(t,e){(null==e||e>t.length)&&(e=t.length);for(var a=0,n=new Array(e);a<e;a++)n[a]=t[a];return n}function w(t,e){var a=null==t?null:"undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=a){var n,r,i=[],l=!0,c=!1;try{for(a=a.call(t);!(l=(n=a.next()).done);l=!0)if(i.push(n.value),e&&i.length===e)break}catch(o){c=!0,r=o}finally{try{l||null==a["return"]||a["return"]()}finally{if(c)throw r}}return i}}function S(t){if(Array.isArray(t))return t}var _=function(){var t=(0,n.useState)(""),e=b(t,2),a=e[0],i=e[1],l=(0,n.useState)([]),c=b(l,2),o=c[0],u=c[1],s=(0,n.useRef)(),m=(0,r.useSearch)(a),p=n.createElement("svg",{className:"__dumi-default-search-empty",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"2347",width:"32",height:"32"},n.createElement("path",{d:"M855.6 427.2H168.5c-12.7 0-24.4 6.9-30.6 18L4.4 684.7C1.5 689.9 0 695.8 0 701.8v287.1c0 19.4 15.7 35.1 35.1 35.1H989c19.4 0 35.1-15.7 35.1-35.1V701.8c0-6-1.5-11.8-4.4-17.1L886.2 445.2c-6.2-11.1-17.9-18-30.6-18zM673.4 695.6c-16.5 0-30.8 11.5-34.3 27.7-12.7 58.5-64.8 102.3-127.2 102.3s-114.5-43.8-127.2-102.3c-3.5-16.1-17.8-27.7-34.3-27.7H119c-26.4 0-43.3-28-31.1-51.4l81.7-155.8c6.1-11.6 18-18.8 31.1-18.8h622.4c13 0 25 7.2 31.1 18.8l81.7 155.8c12.2 23.4-4.7 51.4-31.1 51.4H673.4zM819.9 209.5c-1-1.8-2.1-3.7-3.2-5.5-9.8-16.6-31.1-22.2-47.8-12.6L648.5 261c-17 9.8-22.7 31.6-12.6 48.4 0.9 1.4 1.7 2.9 2.5 4.4 9.5 17 31.2 22.8 48 13L807 257.3c16.7-9.7 22.4-31 12.9-47.8zM375.4 261.1L255 191.6c-16.7-9.6-38-4-47.8 12.6-1.1 1.8-2.1 3.6-3.2 5.5-9.5 16.8-3.8 38.1 12.9 47.8L337.3 327c16.9 9.7 38.6 4 48-13.1 0.8-1.5 1.7-2.9 2.5-4.4 10.2-16.8 4.5-38.6-12.4-48.4zM512 239.3h2.5c19.5 0.3 35.5-15.5 35.5-35.1v-139c0-19.3-15.6-34.9-34.8-35.1h-6.4C489.6 30.3 474 46 474 65.2v139c0 19.5 15.9 35.4 35.5 35.1h2.5z"}));return(0,n.useEffect)((function(){Array.isArray(m)?u(m):"function"===typeof m&&m(".".concat(s.current.className))}),[m]),n.createElement("div",{className:"__dumi-default-search"},n.createElement("input",g({className:"__dumi-default-search-input",type:"search",ref:s},Array.isArray(m)?{value:a,onChange:function(t){return i(t.target.value)}}:{})),n.createElement("ul",null,o.length>0&&o.map((function(t){var e;return n.createElement("li",{key:t.path,onClick:function(){return i("")}},n.createElement(r.AnchorLink,{to:t.path},(null===(e=t.parent)||void 0===e?void 0:e.title)&&n.createElement("span",null,t.parent.title),t.title))})),0==o.length&&a&&n.createElement("li",{style:{textAlign:"center"}},p)))};a(83966);function x(t,e){return N(t)||M(t,e)||C(t,e)||O()}function O(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function C(t,e){if(t){if("string"===typeof t)return A(t,e);var a=Object.prototype.toString.call(t).slice(8,-1);return"Object"===a&&t.constructor&&(a=t.constructor.name),"Map"===a||"Set"===a?Array.from(t):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?A(t,e):void 0}}function A(t,e){(null==e||e>t.length)&&(e=t.length);for(var a=0,n=new Array(e);a<e;a++)n[a]=t[a];return n}function M(t,e){var a=null==t?null:"undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=a){var n,r,i=[],l=!0,c=!1;try{for(a=a.call(t);!(l=(n=a.next()).done);l=!0)if(i.push(n.value),e&&i.length===e)break}catch(o){c=!0,r=o}finally{try{l||null==a["return"]||a["return"]()}finally{if(c)throw r}}return i}}function N(t){if(Array.isArray(t))return t}var P=function(t){var e=t.darkSwitch,a=t.onDarkSwitchClick,i=t.isSideMenu,l=["dark","light","auto"],c=(0,r.usePrefersColor)(),o=x(c,2),u=o[0],s=o[1],m=u,p=n.createElement("svg",{viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"4026",width:"22",height:"22"},n.createElement("path",{d:"M915.2 476.16h-43.968c-24.704 0-44.736 16-44.736 35.84s20.032 35.904 44.736 35.904H915.2c24.768 0 44.8-16.064 44.8-35.904s-20.032-35.84-44.8-35.84zM512 265.6c-136.704 0-246.464 109.824-246.464 246.4 0 136.704 109.76 246.464 246.464 246.464S758.4 648.704 758.4 512c0-136.576-109.696-246.4-246.4-246.4z m0 425.6c-99.008 0-179.2-80.128-179.2-179.2 0-98.944 80.192-179.2 179.2-179.2S691.2 413.056 691.2 512c0 99.072-80.192 179.2-179.2 179.2zM197.44 512c0-19.84-19.136-35.84-43.904-35.84H108.8c-24.768 0-44.8 16-44.8 35.84s20.032 35.904 44.8 35.904h44.736c24.768 0 43.904-16.064 43.904-35.904zM512 198.464c19.776 0 35.84-20.032 35.84-44.8v-44.8C547.84 84.032 531.84 64 512 64s-35.904 20.032-35.904 44.8v44.8c0 24.768 16.128 44.864 35.904 44.864z m0 627.136c-19.776 0-35.904 20.032-35.904 44.8v44.736C476.096 940.032 492.16 960 512 960s35.84-20.032 35.84-44.8v-44.736c0-24.768-16.064-44.864-35.84-44.864z m329.92-592.832c17.472-17.536 20.288-43.072 6.4-57.024-14.016-14.016-39.488-11.2-57.024 6.336-4.736 4.864-26.496 26.496-31.36 31.36-17.472 17.472-20.288 43.008-6.336 57.024 13.952 14.016 39.488 11.2 57.024-6.336 4.8-4.864 26.496-26.56 31.296-31.36zM213.376 759.936c-4.864 4.8-26.56 26.624-31.36 31.36-17.472 17.472-20.288 42.944-6.4 56.96 14.016 13.952 39.552 11.2 57.024-6.336 4.8-4.736 26.56-26.496 31.36-31.36 17.472-17.472 20.288-43.008 6.336-56.96-14.016-13.952-39.552-11.072-56.96 6.336z m19.328-577.92c-17.536-17.536-43.008-20.352-57.024-6.336-14.08 14.016-11.136 39.488 6.336 57.024 4.864 4.864 26.496 26.56 31.36 31.424 17.536 17.408 43.008 20.288 56.96 6.336 14.016-14.016 11.264-39.488-6.336-57.024-4.736-4.864-26.496-26.56-31.296-31.424z m527.168 628.608c4.864 4.864 26.624 26.624 31.36 31.424 17.536 17.408 43.072 20.224 57.088 6.336 13.952-14.016 11.072-39.552-6.4-57.024-4.864-4.8-26.56-26.496-31.36-31.36-17.472-17.408-43.072-20.288-57.024-6.336-13.952 14.016-11.008 39.488 6.336 56.96z","p-id":"4027"})),f=n.createElement("svg",{viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"3854",width:"22",height:"22"},n.createElement("path",{d:"M991.816611 674.909091a69.166545 69.166545 0 0 0-51.665455-23.272727 70.795636 70.795636 0 0 0-27.438545 5.585454A415.674182 415.674182 0 0 1 754.993338 698.181818c-209.594182 0-393.472-184.785455-393.472-395.636363 0-52.363636 38.539636-119.621818 69.515637-173.614546 4.887273-8.610909 9.634909-16.756364 14.103272-24.901818A69.818182 69.818182 0 0 0 384.631156 0a70.842182 70.842182 0 0 0-27.438545 5.585455C161.678429 90.298182 14.362065 307.898182 14.362065 512c0 282.298182 238.824727 512 532.38691 512a522.286545 522.286545 0 0 0 453.957818-268.334545A69.818182 69.818182 0 0 0 991.816611 674.909091zM546.679156 954.181818c-248.785455 0-462.941091-192-462.941091-442.181818 0-186.647273 140.637091-372.829091 300.939637-442.181818-36.817455 65.629091-92.578909 151.970909-92.578909 232.727273 0 250.181818 214.109091 465.454545 462.917818 465.454545a488.331636 488.331636 0 0 0 185.181091-46.545455 453.003636 453.003636 0 0 1-393.565091 232.727273z m103.656728-669.323636l-14.266182 83.781818a34.909091 34.909091 0 0 0 50.362182 36.770909l74.775272-39.563636 74.752 39.563636a36.142545 36.142545 0 0 0 16.174546 3.956364 34.909091 34.909091 0 0 0 34.210909-40.727273l-14.289455-83.781818 60.509091-59.345455a35.025455 35.025455 0 0 0-19.223272-59.578182l-83.61891-12.101818-37.376-76.101818a34.56 34.56 0 0 0-62.254545 0l-37.376 76.101818-83.618909 12.101818a34.909091 34.909091 0 0 0-19.246546 59.578182z m70.423272-64.698182a34.280727 34.280727 0 0 0 26.135273-19.083636l14.312727-29.090909 14.336 29.090909a34.257455 34.257455 0 0 0 26.135273 19.083636l32.046546 4.887273-23.272728 22.574545a35.234909 35.234909 0 0 0-10.007272 30.952727l5.46909 32.116364-28.625454-15.127273a34.490182 34.490182 0 0 0-32.302546 0l-28.695272 15.127273 5.469091-32.116364a35.141818 35.141818 0 0 0-9.984-30.952727l-23.272728-22.574545z","p-id":"3855"})),d=n.createElement("svg",{viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"11002",width:"22",height:"22"},n.createElement("path",{d:"M127.658667 492.885333c0-51.882667 10.24-101.717333 30.378666-149.162666s47.786667-88.064 81.92-122.538667 75.093333-61.781333 122.538667-81.92 96.938667-30.378667 149.162667-30.378667 101.717333 10.24 149.162666 30.378667 88.405333 47.786667 122.88 81.92 61.781333 75.093333 81.92 122.538667 30.378667 96.938667 30.378667 149.162666-10.24 101.717333-30.378667 149.162667-47.786667 88.405333-81.92 122.88-75.093333 61.781333-122.88 81.92-97.28 30.378667-149.162666 30.378667-101.717333-10.24-149.162667-30.378667-88.064-47.786667-122.538667-81.92-61.781333-75.093333-81.92-122.88-30.378667-96.938667-30.378666-149.162667z m329.045333 0c0 130.048 13.994667 244.394667 41.984 343.381334h12.970667c46.762667 0 91.136-9.216 133.461333-27.306667s78.848-42.666667 109.568-73.386667 54.954667-67.242667 73.386667-109.568 27.306667-86.698667 27.306666-133.461333c0-46.421333-9.216-90.794667-27.306666-133.12s-42.666667-78.848-73.386667-109.568-67.242667-54.954667-109.568-73.386667-86.698667-27.306667-133.461333-27.306666h-11.605334c-28.672 123.562667-43.349333 237.909333-43.349333 343.722666z","p-id":"11003"})),h=l.filter((function(t){return t!==m})),v=function(t,e){!i&&a&&a(t),e!==m&&s(e)},y=function(t){switch(t){case"dark":return n.createElement("button",{key:"dumi-dark-btn-moon",title:"Dark theme",onClick:function(e){return v(e,t)},className:"__dumi-default-dark-moon ".concat(t===m?"__dumi-default-dark-switch-active":"")},f);case"light":return n.createElement("button",{key:"dumi-dark-btn-sun",title:"Light theme",onClick:function(e){return v(e,t)},className:"__dumi-default-dark-sun ".concat(t===m?"__dumi-default-dark-switch-active":"")},p);case"auto":return n.createElement("button",{key:"dumi-dark-btn-auto",title:"Default to system",onClick:function(e){return v(e,t)},className:"__dumi-default-dark-auto ".concat(t===m?"__dumi-default-dark-switch-active":"")},d);default:}};return n.createElement("div",{className:"__dumi-default-dark"},n.createElement("div",{className:"__dumi-default-dark-switch ".concat(!i&&e?"__dumi-default-dark-switch-open":"")},i?l.map((function(t){return y(t)})):y(m)),!i&&e&&n.createElement("div",{className:"__dumi-default-dark-switch-list"},h.map((function(t){return y(t)}))))},L=P;a(51624);function z(t,e){return D(t)||B(t,e)||I(t,e)||R()}function R(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function I(t,e){if(t){if("string"===typeof t)return H(t,e);var a=Object.prototype.toString.call(t).slice(8,-1);return"Object"===a&&t.constructor&&(a=t.constructor.name),"Map"===a||"Set"===a?Array.from(t):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?H(t,e):void 0}}function H(t,e){(null==e||e>t.length)&&(e=t.length);for(var a=0,n=new Array(e);a<e;a++)n[a]=t[a];return n}function B(t,e){var a=null==t?null:"undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=a){var n,r,i=[],l=!0,c=!1;try{for(a=a.call(t);!(l=(n=a.next()).done);l=!0)if(i.push(n.value),e&&i.length===e)break}catch(o){c=!0,r=o}finally{try{l||null==a["return"]||a["return"]()}finally{if(c)throw r}}return i}}function D(t){if(Array.isArray(t))return t}var $=function(t){return n.createElement(n.Fragment,null,n.createElement("div",{className:"__dumi-default-layout-hero"},t.image&&n.createElement("img",{src:t.image}),n.createElement("h1",null,t.title),n.createElement("div",{dangerouslySetInnerHTML:{__html:t.desc}}),t.actions&&t.actions.map((function(t){return n.createElement(r.Link,{to:t.link,key:t.text},n.createElement("button",{type:"button"},t.text))}))))},T=function(t){return n.createElement("div",{className:"__dumi-default-layout-features"},t.map((function(t){return n.createElement("dl",{key:t.title,style:{backgroundImage:t.icon?"url(".concat(t.icon,")"):void 0}},t.link?n.createElement(r.Link,{to:t.link},n.createElement("dt",null,t.title)):n.createElement("dt",null,t.title),n.createElement("dd",{dangerouslySetInnerHTML:{__html:t.desc}}))})))},U=function(t){var e,a,i=t.children,l=t.location,c=(0,n.useContext)(r.context),o=c.config,s=o.mode,m=o.repository,p=(c.nav,c.meta),f=c.locale,d=m.url,v=m.branch,g=m.platform,b=(0,n.useState)(!0),j=z(b,2),E=j[0],k=j[1],w=(0,n.useState)(!1),S=z(w,2),x=S[0],O=S[1],C="site"===s,A=C&&p.hero,M=C&&p.features,N=!1!==p.sidemenu&&!A&&!M&&!p.gapless,P=!A&&!M&&Boolean(null===(e=p.slugs)||void 0===e?void 0:e.length)&&("content"===p.toc||void 0===p.toc)&&!p.gapless,R=/^zh|cn$/i.test(f),I=new Date(p.updatedTime),H="".concat(I.toLocaleDateString([],{hour12:!1})," ").concat(I.toLocaleTimeString([],{hour12:!1})),B={github:"GitHub",gitlab:"GitLab"}[(null===(a=(d||"").match(/(github|gitlab)/))||void 0===a?void 0:a[1])||"nothing"]||g;return n.createElement("div",{className:"__dumi-default-layout","data-route":l.pathname,"data-show-sidemenu":String(N),"data-show-slugs":String(P),"data-site-mode":C,"data-gapless":String(!!p.gapless),onClick:function(){O(!1),E||k(!0)}},n.createElement(u,{location:l,navPrefix:n.createElement(_,null),darkPrefix:n.createElement(L,{darkSwitch:x,onDarkSwitchClick:function(t){O((function(t){return!t})),t.stopPropagation()},isSideMenu:!1}),onMobileMenuClick:function(t){k((function(t){return!t})),t.stopPropagation()}}),n.createElement(y,{darkPrefix:n.createElement(L,{darkSwitch:x,isSideMenu:!0}),mobileMenuCollapsed:E,location:l}),P&&n.createElement(h,{slugs:p.slugs,className:"__dumi-default-layout-toc"}),A&&$(p.hero),M&&T(p.features),n.createElement("div",{className:"__dumi-default-layout-content"},i,!A&&!M&&p.filePath&&!p.gapless&&n.createElement("div",{className:"__dumi-default-layout-footer-meta"},B&&n.createElement(r.Link,{to:"".concat(d,"/edit/").concat(v,"/").concat(p.filePath)},R?"\u5728 ".concat(B," \u4e0a\u7f16\u8f91\u6b64\u9875"):"Edit this doc on ".concat(B)),n.createElement("span",{"data-updated-text":R?"\u6700\u540e\u66f4\u65b0\u65f6\u95f4\uff1a":"Last update: "},H)),(A||M)&&p.footer&&n.createElement("div",{className:"__dumi-default-layout-footer",dangerouslySetInnerHTML:{__html:p.footer}})))},J=U},72022:function(t){"use strict";t.exports={}},78320:function(t){"use strict";t.exports=JSON.parse('{"menus":{"en-US":{"/css":[{"path":"/css/css bfc\u5757\u7ea7\u683c\u5f0f\u5316\u4e0a\u4e0b\u6587","title":"CSS BFC\u5757\u7ea7\u683c\u5f0f\u5316\u4e0a\u4e0b\u6587","meta":{}},{"path":"/css/css flex\u5143\u7d20\u5bf9\u9f50\u65b9\u5f0f","title":"CSS flex\u5143\u7d20\u5bf9\u9f50\u65b9\u5f0f","meta":{}},{"path":"/css/flex-gorw\u3001flex-shrink\u3001flex-basis","title":"flex-basis","meta":{}}],"/faq":[{"path":"/faq","title":"\u5e38\u89c1\u95ee\u9898","meta":{}},{"path":"/faq/this-in-reload","title":"window.location.reload \u975e\u6cd5\u8c03\u7528","meta":{}}],"/java-script":[{"title":"\u6d4f\u89c8\u5668\u7f13\u5b58\u673a\u5236","path":"/java-script/","meta":{},"children":[]},{"title":"JavaScript","path":"/java-script/React Hooks/useState","meta":{},"children":[{"path":"/java-script/React Hooks/useState/react hooks - dispatch-action","title":"dispatchAction","meta":{}}]},{"path":"/java-script/amd-cmd-umd-common-js","title":"AMD/CMD/UMD/Commonjs","meta":{}},{"path":"/java-script/bitwise-operator","title":"JS\u4f4d\u64cd\u4f5c\u7b26","meta":{}},{"title":"CORS\u8de8\u57df\u8d44\u6e90\u5171\u4eab","path":"/java-script/cors\u8de8\u57df\u8d44\u6e90\u5171\u4eab","meta":{},"children":[]},{"path":"/java-script/ecma\u52a0\u53f7\u8fd0\u7b97","title":"ECMA\u52a0\u53f7\u8fd0\u7b97","meta":{}},{"title":"HTTP-Client-Hints","path":"/java-script/http-client-hints","meta":{},"children":[]},{"path":"/java-script/ieee-754\u4e8c\u8fdb\u5236\u6d6e\u70b9\u6570\u7b97\u672f\u6807\u51c6","title":"IEEE-754\u4e8c\u8fdb\u5236\u6d6e\u70b9\u6570\u7b97\u672f\u6807\u51c6","meta":{}},{"path":"/java-script/inner-text\u3001inner-html\u3001text-content","title":"innerText\u3001innerHTML\u3001textContent","meta":{}},{"path":"/java-script/java-script\u9ad8\u7ea7\u7a0b\u5e8f\u8bbe\u8ba1(\u4e00)-java-script\u7b80\u4ecb","title":"ECMAScript","meta":{}},{"path":"/java-script/java-script\u9ad8\u7ea7\u7a0b\u5e8f\u8bbe\u8ba1(\u4e09)-\u57fa\u672c\u6982\u5ff5","title":"\u6570\u636e\u7c7b\u578b","meta":{}},{"path":"/java-script/java-script\u9ad8\u7ea7\u7a0b\u5e8f\u8bbe\u8ba1(\u4e8c)-\u5728html\u4e2d\u4f7f\u7528java-script","title":"script \u5143\u7d20","meta":{}},{"path":"/java-script/js module\u6a21\u5757","title":"JS module(\u6a21\u5757)","meta":{}},{"path":"/java-script/js new\u8fd0\u7b97\u7b26\u548creflect","title":"\u5b9a\u4e49","meta":{}},{"path":"/java-script/js \u5783\u573e\u56de\u6536","title":"\u5b9a\u4e49","meta":{}},{"path":"/java-script/json","title":"JSON.stringify\u548c\u5faa\u73af\u5f15\u7528","meta":{}},{"path":"/java-script/jsx\u548creact","title":"JSX\u548cReact.createElement","meta":{}},{"path":"/java-script/js\u4e25\u683c\u6a21\u5f0f","title":"\u4fdd\u7559\u5b57\u548c\u5173\u952e\u5b57\u4e0d\u80fd\u4f5c\u4e3a\u6807\u8bc6\u7b26\u548c\u5c5e\u6027\u540d","meta":{}},{"title":"JS\u4e2d\u7684async\u548cdefer","path":"/java-script/js\u4e2d\u7684async\u548cdefer","meta":{},"children":[{"path":"/java-script/js\u4e2d\u7684async\u548cdefer/js\u4e2d\u7684async\u548cdefer","title":"async\u548cdefer","meta":{}}]},{"path":"/java-script/js\u53ef\u8fed\u4ee3\u5bf9\u8c61","title":"Js\u53ef\u8fed\u4ee3\u5bf9\u8c61","meta":{}},{"path":"/java-script/js\u7ee7\u627f\u65b9\u5f0f","title":"\u539f\u578b\u94fe\u7ee7\u627f","meta":{}},{"path":"/java-script/js\u904d\u5386\u5bf9\u8c61\u7684\u65b9\u6cd5","title":"Object.entries,keys,values","meta":{}},{"path":"/java-script/queue-microtask","title":"QueueMicrotask","meta":{}},{"path":"/java-script/react effect \u66f4\u65b0\u94fe","title":"React Effect \u66f4\u65b0\u94fe","meta":{}},{"path":"/java-script/react set-state\u66f4\u65b0\u8fc7\u7a0b","title":"React setState\u66f4\u65b0\u8fc7\u7a0b","meta":{}},{"path":"/java-script/react \u5bf9\u8c61\u6c60","title":"\u4e3a\u4ec0\u4e48\u9700\u8981\u5bf9\u8c61\u6c60","meta":{}},{"path":"/java-script/react \u6570\u636e\u7c7b\u578b","title":"React\u6570\u636e\u7ed3\u6784/\u7c7b\u578b","meta":{}},{"path":"/java-script/react \u7ec6\u8282","title":"React specific","meta":{}},{"path":"/java-script/react \u9996\u6b21\u6e32\u67d3\u6587\u5b57\u7248","title":"React\u9996\u6b21\u6e32\u67d3\u6587\u5b57\u7248","meta":{}},{"path":"/java-script/react-dom-render-commit-phase","title":"React\u9996\u6b21\u6e32\u67d3commit\u9636\u6bb5","meta":{}},{"path":"/java-script/react-dom-render-create-fiber-tree","title":"React\u9996\u6b21\u6e32\u67d3\u521b\u5efafiber\u6811","meta":{}},{"path":"/java-script/react-dom-render-intro","title":"React\u9996\u6b21\u6e32\u67d3\u6d41\u7a0b","meta":{}},{"path":"/java-script/react-dom-render-render-phase","title":"React\u9996\u6b21\u6e32\u67d3render\u9636\u6bb5","meta":{}},{"path":"/java-script/react-fiber","title":"React Fiber","meta":{}},{"path":"/java-script/react-fiber-root","title":"React FiberRoot","meta":{}},{"path":"/java-script/react15","title":"isBatchingUpdates \u4ec0\u4e48\u65f6\u5019\u8d4b\u503c\u4e3a true","meta":{}},{"path":"/java-script/react16","title":"getSnapshotBeforeUpdate","meta":{}},{"path":"/java-script/react\u4e3a\u4ec0\u4e48\u4e0d\u81ea\u52a8\u7ed1\u5b9athis","title":"React\u4e3a\u4ec0\u4e48\u4e0d\u81ea\u52a8\u7ed1\u5b9athis","meta":{}},{"path":"/java-script/react\u4e3a\u4ec0\u4e48\u7528hooks","title":"React\u4e3a\u4ec0\u4e48\u7528Hooks","meta":{}},{"path":"/java-script/to-primitive","title":"\u62bd\u8c61\u503c\u64cd\u4f5c","meta":{}},{"path":"/java-script/umijs-auto-css-modules","title":"UmiJS - \u667a\u80fd\u7684 Css Modules","meta":{}},{"path":"/java-script/\u300a\u4f60\u4e0d\u77e5\u9053\u7684java-script\u4e2d\u5377\u300b-generator","title":"\u751f\u6210\u5668","meta":{}},{"path":"/java-script/\u300a\u4f60\u4e0d\u77e5\u9053\u7684java-script\u4e2d\u5377\u300b-promise","title":"\u4ec0\u4e48\u662f Promise","meta":{}},{"path":"/java-script/\u300a\u4f60\u4e0d\u77e5\u9053\u7684java-script\u4e2d\u5377\u300b-\u7c7b\u578b","title":"\u300a\u4f60\u4e0d\u77e5\u9053\u7684JavaScript\u4e2d\u5377\u300b-\u7c7b\u578b","meta":{}},{"path":"/java-script/\u300a\u6df1\u5165\u7406\u89e3es6\u300b\u7b2c10-12\u7ae0","title":"\u7b2c 10 \u7ae0 \u6570\u7ec4\u589e\u5f3a","meta":{}},{"path":"/java-script/\u5185\u5bb9\u5b89\u5168\u7b56\u7565csp\uff08content security policy\uff09","title":"\u5185\u5bb9\u5b89\u5168\u7b56\u7565CSP\uff08Content Security Policy\uff09","meta":{}},{"path":"/java-script/\u5355\u5411\u7ed1\u5b9a\u3001\u53cc\u5411\u6570\u636e\u7ed1\u5b9a","title":"\u5355\u5411\u6570\u636e\u7ed1\u5b9a","meta":{}},{"path":"/java-script/\u539f\u578b\u3001\u539f\u578b\u94fe","title":"\u539f\u578b\u3001\u539f\u578b\u94fe","meta":{}},{"path":"/java-script/\u56fe","title":"\u56fe","meta":{}},{"path":"/java-script/\u6811\u7684\u904d\u5386","title":"\u6811\u7684\u904d\u5386","meta":{}}],"/react":[{"title":"Context","path":"/react/context","meta":{},"children":[{"path":"/react/context/react\u6e90\u7801\u5206\u6790-react","title":"React\u6e90\u7801\u5206\u6790-React.Context","meta":{}}]},{"title":"UseEffect","path":"/react/use-effect","meta":{},"children":[{"path":"/react/use-effect/use-effec\u7684\u8fd1\u4eb2","title":"useEffect\u8fd1\u4eb2","meta":{}}]}],"/let-is-go":[{"title":"\u56e2\u961f\u7ba1\u7406","path":"/let-is-go/\u56e2\u961f\u7ba1\u7406","meta":{},"children":[{"path":"/let-is-go/\u56e2\u961f\u7ba1\u7406/\u56e2\u961f\u7ba1\u7406","title":"\u7ec4\u5efa\u56e2\u961f\uff08\u4e00\uff09","meta":{}}]}],"*":[{"path":"/","title":"Hello zw!","meta":{}}]}},"locales":[{"name":"en-US","label":"English"}],"navs":{"en-US":[{"path":"/css","title":"CSS"},{"path":"/faq","title":"FAQ"},{"path":"/react","title":"React"},{"path":"/let-is-go","title":"Let-is-go"},{"path":"/java-script","title":"JavaScript"}]},"title":"zw","mode":"site","repository":{"url":"https://github.com/282159468/zw","branch":"master"},"theme":{}}')}}]);