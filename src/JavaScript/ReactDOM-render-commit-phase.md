---
title: React首次渲染commit阶段
---

## React 首次渲染 commit 阶段

React render 阶段只是根据 React Element 创建好对应的 Fiber 树，并初始化好 stateNode 实例和 DOM 相关的创建和初始化，该树指向 RootFiber.alternate，render 阶段完成后就会进入 commit 阶段，通过 render 阶段创建的 Fiber 树提交真实的 DOM 节点

## 获取完成的任务

root.current.alternate

```js
function performSyncWorkOnRoot(root: FiberRoot) {
  // render阶段创建Fiber
  render();

  // commit
  // finishedWork的就是render阶段创建的Fiber树
  const finishedWork: Fiber = (root.current.alternate: any);
  root.finishedWork = finishedWork;
  commitRoot(root);
}
```

## commitRoot

root 参数是 FiberRoot

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

```js
let nextEffect = null;
function commitRootImpl(root: FiberRoot) {
  const finishedWork = root.finishedWork;
  const firstEffect = finishedWork.firstEffect;
  nextEffect = firstEffect;

  // 递归执行类组件的getsnaphotbeforeUpdate
  do {
    if ((effectTag & Snapshot) !== NoEffect) {
      commitBeforeMutationEffects();
    }
  } while (nextEffect !== null);
  // 重置 nextEffect
  nextEffect = firstEffect;
}
```

## 提交改变前的副作用

通过判断 effectTag 是否包含`Snapshot`副作用，有则递归执行类组件的 getsnaphotbeforeUpdate

```js
function commitBeforeMutationEffects() {
  while (nextEffect !== null) {
    instance.getSnapshotBeforeUpdate(
      // 这里elementType和type有不相等情况
      finishedWork.elementType === finishedWork.type
        ? prevProps
        : resolveDefaultProps(finishedWork.type, prevProps),
      prevState,
    );
    nextEffect = nextEffect.nextEffect;
  }
}
```

## 提交改变/Mutation

DOM 节点的增、删、改

> primaryEffectTag = effectTag & (Placement | Update | Deletion | Hydrating)

这句意思是 effectTag 包含哪些副作用，比如在创建 Fiber 树的时候有以下代码

```js
if (typeof instance.componentDidMount === 'function') {
  workInProgress.effectTag |= Update;
}
```

根据 effectTag 匹配对应的处理

```js
function commitMutationEffects(root: FiberRoot, renderPriorityLevel) {
  while (nextEffect !== null) {
    const effectTag = nextEffect.effectTag;
    const primaryEffectTag =
      effectTag & (Placement | Update | Deletion | Hydrating);
    switch (primaryEffectTag) {
      case Placement: {
        commitPlacement(nextEffect);
        nextEffect.effectTag &= ~Placement;
        break;
      }
      case PlacementAndUpdate: {
        commitPlacement(nextEffect);
        nextEffect.effectTag &= ~Placement;
        const current = nextEffect.alternate;
        commitWork(current, nextEffect);
        break;
      }
      case Hydrating: {
        nextEffect.effectTag &= ~Hydrating;
        break;
      }
      case HydratingAndUpdate: {
        nextEffect.effectTag &= ~Hydrating;
        const current = nextEffect.alternate;
        commitWork(current, nextEffect);
        break;
      }
      case Update: {
        const current = nextEffect.alternate;
        commitWork(current, nextEffect);
        break;
      }
      case Deletion: {
        commitDeletion(root, nextEffect, renderPriorityLevel);
        break;
      }
    }
    nextEffect = nextEffect.nextEffect;
  }
}
```

## 自答题

- [ ] 为什么`{ false &&</i> }`不会显示 false
