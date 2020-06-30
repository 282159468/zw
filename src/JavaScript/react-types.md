---
title: React常见类型、常量
---

## 副作用类型/SideEffectTag

```js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

export type SideEffectTag = number;

// Don't change these two values. They're used by React Dev Tools.
export const NoEffect = /*                 */ 0;
export const PerformedWork = /*            */ 1;

// You can change the rest (and add more).
export const Placement = /*                */ 2;
export const Update = /*                   */ 4;
export const PlacementAndUpdate = /*       */ 0b00000000000110;
export const Deletion = /*                 */ 0b00000000001000;
export const ContentReset = /*             */ 0b00000000010000;
export const Callback = /*                 */ 0b00000000100000;
export const DidCapture = /*               */ 0b00000001000000;
export const Ref = /*                      */ 0b00000010000000;
export const Snapshot = /*                 */ 0b00000100000000;
export const Passive = /*                  */ 0b00001000000000;
export const PassiveUnmountPendingDev = /* */ 0b10000000000000;
export const Hydrating = /*                */ 0b00010000000000;
export const HydratingAndUpdate = /*       */ 0b00010000000100;

// Passive & Update & Callback & Ref & Snapshot
export const LifecycleEffectMask = /*      */ 0b00001110100100;

// Union of all host effects
export const HostEffectMask = /*           */ 0b00011111111111;

export const Incomplete = /*               */ 0b00100000000000;
export const ShouldCapture = /*            */ 0b01000000000000;
```

## 副作用类型(bitwise)/SideEffectTag

```js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

export type SideEffectTag = number;

// Don't change these two values. They're used by React Dev Tools.
export const NoEffect = /*                 */ 0b00000000000000;
export const PerformedWork = /*            */ 0b00000000000001;

// You can change the rest (and add more).
export const Placement = /*                */ 0b00000000000010;
export const Update = /*                   */ 0b00000000000100;
export const PlacementAndUpdate = /*       */ 0b00000000000110;
export const Deletion = /*                 */ 0b00000000001000;
export const ContentReset = /*             */ 0b00000000010000;
export const Callback = /*                 */ 0b00000000100000;
export const DidCapture = /*               */ 0b00000001000000;
export const Ref = /*                      */ 0b00000010000000;
export const Snapshot = /*                 */ 0b00000100000000;
export const Passive = /*                  */ 0b00001000000000;
export const PassiveUnmountPendingDev = /* */ 0b10000000000000;
export const Hydrating = /*                */ 0b00010000000000;
export const HydratingAndUpdate = /*       */ 0b00010000000100;

// Passive & Update & Callback & Ref & Snapshot
export const LifecycleEffectMask = /*      */ 0b00001110100100;

// Union of all host effects
export const HostEffectMask = /*           */ 0b00011111111111;

export const Incomplete = /*               */ 0b00100000000000;
export const ShouldCapture = /*            */ 0b01000000000000;
```

# 优先级等级/ReactPriorityLevels

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

## Fiber 的 tag(WorkTag)类型/WorkTag

```js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */
export const FunctionComponent = 0;
export const ClassComponent = 1;
export const IndeterminateComponent = 2; // Before we know whether it is function or class
// RootFiber类型
export const HostRoot = 3; // Root of a host tree. Could be nested inside another node.
export const HostPortal = 4; // A subtree. Could be an entry point to a different renderer.
// DOM类型
export const HostComponent = 5;
// 文本类型，是指render返回'text'，而不是<div>text</div>这种文本
export const HostText = 6;
export const Fragment = 7;
export const Mode = 8;
export const ContextConsumer = 9;
export const ContextProvider = 10;
export const ForwardRef = 11;
export const Profiler = 12;
export const SuspenseComponent = 13;
export const MemoComponent = 14;
export const SimpleMemoComponent = 15;
export const LazyComponent = 16;
export const IncompleteClassComponent = 17;
export const DehydratedFragment = 18;
export const SuspenseListComponent = 19;
export const FundamentalComponent = 20;
export const ScopeComponent = 21;
export const Block = 22;
export type WorkTag =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22;
```
