## vue 双向绑定和单向数据流

## 单向数据流

即数据是从父极流向子级，子级只能通过回调、action修改流入的数据，而不能直接修改流入的数据。就是常说的MV。我理解为value、onChange模式

优点：数据改变可记录、可跟踪，源头易追溯，后期维护成本低.
缺点：重复的样板代码、需要手动调用更新

vue、react都是推崇单向数据流的，vue多了一个双向绑定

## 双向绑定

```vue
<!-- Parent.vue -->
<Child v-model="countModel" />
```

```vue
<!-- Child.vue -->
<script setup>
const model = defineModel();

function update() {
  model.value++;
}
</script>

<template>
  <div>Parent bound v-model is: {{ model }}</div>
  <button @click="update">Increment</button>
</template>
```

其实就是MVVM，在view层也能修改数据，在子组件中直接修改了数据model.value++，但是这并没有破坏单向数据流。可以看经过编译过后的Child

```js
import { useModel as _useModel } from 'vue';

const __sfc__ = {
  __name: 'App',
  props: {
    modelValue: {},
    modelModifiers: {},
  },
  emits: ['update:modelValue'],
  setup(__props, { expose: __expose }) {
    __expose();

    const model = _useModel(__props, 'modelValue');

    function update() {
      model.value++;
    }

    const __returned__ = { model, update };
    Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
    return __returned__;
  },
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return null;
}
__sfc__.render = render;
__sfc__.__file = 'src/App.vue';
export default __sfc__;
```

经过编译后defineModel宏函数已经变成了useModel函数，而useModel函数的返回值是一个ref对象。注意这个是ref对象不是props，所以才可以在组件内直接修改defineModel的返回值。当对这个ref对象进行“读操作”时，会像Proxy一样被拦截到ref对象的get方法。在get方法中会返回本地维护localValue变量，localValue变量依靠watchSyncEffect让localValue变量始终和父组件传递的modelValue的props值一致。

## 总结

个人不看好双向绑定这个设计，理由是主要是双向绑定会引入不确定性增加项目后期维护成本。

- 如上Child组件如果在update回调中我要更新多个数据，我需要知道某个数据绑定形式只能通过人肉查找。这点在后期多人参与迭代时更为明显
- 还有就是在封装一个组件的时候，就要考虑是使用双向绑定，还是单向绑定或者两者都支持。这点在团队开发一致性上也会存在问题

另外react也可以实现双向绑定，但是并没有流行起来也是因为上述原因

```tsx
import { useState, useMemo } from 'react';
const Parent = () => {
  const [value, onChange] = useState(0);
  //   这步可能通过babel等构建工具做转换 v-model  => modelValue={value} onChange={onChange}
  return <Child modelValue={value} onChange={onChange} />;
};

function useModel(props, name) {
  const proxy = useMemo(() => {
    return new Proxy(
      { value: undefined },
      {
        get(target, key, receiver) {
          console.log(' props[name]', props[name]);
          return props[name];
          //   return Reflect.get(target, key, receiver);
        },
        set(target, key, val, receiver) {
          props.onChange(val);
          return true;
        },
      },
    );`
  }, [props[name], props.onChange]);

  return proxy;
}
const Child = (props) => {
  const model = useModel(props, 'modelValue');
  function update() {
    model.value++;
  }
  return (
    <button type="button" onClick={update}>
      button {model.value}
    </button>
  );
};

export default Parent;
```

https://juejin.cn/post/7085139499767840782

https://www.cnblogs.com/heavenYJJ/p/18107195
