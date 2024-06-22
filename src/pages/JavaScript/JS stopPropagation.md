# stopPropagation

stopPropagation 阻止事件传播，捕获和冒泡两个阶段都能阻止

### 冒泡

阻止事件传播到父级元素

```tsx
import { useRef, useEffect } from 'react';
export default () => {
  const divRef = useRef();
  const pRef = useRef();
  useEffect(() => {
    divRef.current.addEventListener('click', (e) => {
      console.log('div click');
    });
    pRef.current.addEventListener('click', (e) => {
      e.stopPropagation();
      console.log('p click');
    });
  }, []);
  return (
    <div ref={divRef}>
      <p ref={pRef}>click</p>
    </div>
  );
};
```

### 捕获

阻止事件传播到子级元素

```tsx
import { useRef, useEffect } from 'react';
export default () => {
  const divRef = useRef();
  const pRef = useRef();
  useEffect(() => {
    divRef.current.addEventListener(
      'click',
      (e) => {
        e.stopPropagation();
        console.log('div click');
      },
      true,
    );
    pRef.current.addEventListener(
      'click',
      (e) => {
        console.log('p click');
      },
      true,
    );
  }, []);
  return (
    <div ref={divRef}>
      <p ref={pRef}>click</p>
    </div>
  );
};
```

## stopImmediatePropagation

stopImmediatePropagation 相对于 stopPropagation 阻止下层（父、子）事件的传播，同时还会阻止该元素之后的同名事件的传播

```tsx
import { useRef, useEffect } from 'react';
export default () => {
  const divRef = useRef();
  const pRef = useRef();
  useEffect(() => {
    divRef.current.addEventListener('click', (e) => {
      console.log('div click');
    });

  // isImmediatePropagationStopped之前绑定事件并不会阻止
    pRef.current.addEventListener('click', (e) => {
      console.log('p1 click', e.isImmediatePropagationStopped);
    });
    pRef.current.addEventListener('click', (e) => {
      e.stopImmediatePropagation();
      console.log('p2 click');
    });


    pRef.current.addEventListener('click', (e) => {
      console.log('p3 click', e.isImmediatePropagationStopped);
    });
  }, []);
  return (
    <div ref={divRef}>
      <p
        ref={pRef}
        onClick={(e) => {
          console.log(e);
        }}
      >
        click
      </p>
    </div>
  );
};
```

一些库比如 jQuery 封装了事件处理，给事件对象添加 isImmediatePropagationStopped 方法来判断是否调用过 stopImmediatePropagation

https://api.jquery.com/event.isImmediatePropagationStopped/
