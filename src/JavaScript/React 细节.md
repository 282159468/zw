---
title: React specific
---

## 位运算

## Sync

```js
// Max 31 bit integer. The max integer size in V8 for 32-bit systems.
// Math.pow(2, 30) - 1
// 0b111111111111111111111111111111
export const MAX_SIGNED_31_BIT_INT = 1073741823;
```

https://medium.com/@justjavac/v8-internals-how-small-is-a-small-integer-ba5e17a3ae5f

setTimeout 最大、最小执行时间

## finally

```js
let currentPriorityLevel = 0;
function eventHandler() {
  console.log('eventHandler:currentPriorityLevel', currentPriorityLevel);
}
function foo(priorityLevel) {
  var previousPriorityLevel = currentPriorityLevel;
  currentPriorityLevel = priorityLevel;
  try {
    return eventHandler();
  } finally {
    console.log('finally');
    currentPriorityLevel = previousPriorityLevel;
  }
}
foo(1);
```
