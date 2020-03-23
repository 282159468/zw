---
route: /foreach-object
---

## for in

```js
const o = function() {};
Object.defineProperty(o, "b", {
  value: 222,
  enumerable: true
});

for (let key in o) {
  console.log(key);
}
```
