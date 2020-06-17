---
title: React首次渲染commit阶段
---

# 优先级等级

```js
// **********************************************************
// The section below is copied from files in React repo.
// Keep it in sync, and add version guards if it changes.
//
// Technically these priority levels are invalid for versions before 16.9,
// but 16.9 is the first version to report priority level to DevTools,
// so we can avoid checking for earlier versions and support pre-16.9 canary releases in the process.
const ReactPriorityLevels: ReactPriorityLevelsType = {
  ImmediatePriority: 99,
  UserBlockingPriority: 98,
  NormalPriority: 97,
  LowPriority: 96,
  IdlePriority: 95,
  NoPriority: 90,
};
```

## commitRoot

root 参数是 fiberRoot

```js
function commitRoot(root) {
  const renderPriorityLevel = getCurrentPriorityLevel();
  runWithPriority(
    ImmediatePriority,
    commitRootImpl.bind(null, root, renderPriorityLevel),
  );
  return null;
}
```
