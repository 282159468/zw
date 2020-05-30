---
route: /css-flex-align
---

理清 flex 元素对齐方式之前，需要了解轴的定义，flex 布局中轴分为主轴、交叉轴。轴类型由 flex-direction 决定

`flex-direction:row`横向为主轴，纵向为交叉轴

## align-items

定义元素在交叉轴内的对齐方式，对齐的对象为每一行（交叉轴），flex 项目根据 align-items 的值不同在行移动，支持以下值

- stretch （默认值 ）拉伸元素跟行一样高
- start（默认值 ）
- end
- baseline flex 项目对齐 flex 容器基线
- center

上面有两个默认值，分两种情况，flex 容器固定高度情况，stretch 为默认值 ，反之为 start

<div>
<div style={{display: 'flex',width: 700,height:100, background: '#eee'}}>
    <div style={{width: 60,height:60, background: '#ccc'}}>sdf</div>
    <div style={{width: 60,height:40, background: '#ccc'}}>sdf</div>
    <div style={{width: 60,height:20, background: '#ccc'}}>sdf</div>
</div>
</div>

这里 flex 容器固定高度，但 flex 项目并没有拉伸，stretch 要生效还需要满足 flex 项目的交叉阵方向尺寸为非固定

<div>
<div style={{display: 'flex',width: 700,height:100, background: '#eee'}}>
    <div style={{width: 60 ,background: '#ccc'}}>sdf</div>
</div>
</div>

### 多个交叉轴

<div>
<div style={{display: 'flex',width: 700,height:300, background: '#eee', alignItems: 'center',flexWrap:'wrap'}}>
    <div style={{width: 330,height:60, background: '#ccc'}}>sdf</div>
    <div style={{width: 300,height:40, background: '#ccc'}}>sdf</div>
    <div style={{width: 260,height:20, background: '#ccc'}}>sdf</div>
</div>
</div>

## align-content

> align-content:stretch|start|end|space-between|space-around|space-evenly

align-content 生效条件，多个交叉轴，可以理解成有多行，flex 容器在交叉轴方向有固定尺寸

简单理解 align-content 为 flex 行在剩余空间的对齐方式

<div>
    
这里明显不会生效，因为没有剩余空间，就不存在对齐方式了
<div style={{display: 'flex',width: 700, background: '#eee', alignContent: 'center',flexWrap:'wrap'}}>
    <div style={{width: 130,height:60, background: '#ccc'}}>sdf</div>
</div>
</div>

<div>
  有剩余空间但是flex行为单行也不会生效
<div style={{display: 'flex',width: 700, height:100, background: '#eee',alignContent: 'center'}}>
    <div style={{width: 130,height:60, background: '#ccc'}}>sdf</div>
</div>
</div>

<div>
  但是可以显示的声明flex-wrap:wrap，这时在表现上虽然只有一行，但align-content也会生效
<div style={{display: 'flex',flexWrap: 'wrap', width: 700, height:100, background: '#eee',alignContent: 'center'}}>
    <div style={{width: 130,height:60, background: '#ccc'}}>sdf</div>
</div>
</div>

- space-between

  flex 项目**之间**平均分配剩余空间，需要注意，flex 项目与 flex 容器之间不会分配剩余空间

<div>
<div style={{display: 'flex',flexWrap: 'wrap', width: 200, height:200, background: '#eee',alignContent: 'space-between'}}>
    <div style={{width: 130,height:20, background: '#ccc'}}></div>
    <div style={{width: 130,height:30, background: '#ccc'}}></div>
    <div style={{width: 130,height:50, background: '#ccc'}}></div>
</div>
</div>

- space-around

  剩余空间平均分配环绕在 flex 项目两边，由于是平均环绕，所以 flex 项目之间的空间是两倍

<div>
<div style={{display: 'flex',flexWrap: 'wrap', width: 200, height:200, background: '#eee',alignContent: 'space-around'}}>
    <div style={{width: 130,height:20, background: '#ccc'}}></div>
    <div style={{width: 130,height:30, background: '#ccc'}}></div>
    <div style={{width: 130,height:50, background: '#ccc'}}></div>
</div>
</div>

- space-evenly

  剩余空间平均分配在 flex 项目与 flex 项目、flex 项目与 flex 容器之间，实现所见的空白都是相等的

<div>
<div style={{display: 'flex',flexWrap: 'wrap', width: 200, height:200, background: '#eee',alignContent: 'space-evenly'}}>
    <div style={{width: 130,height:20, background: '#ccc'}}></div>
    <div style={{width: 130,height:30, background: '#ccc'}}></div>
    <div style={{width: 130,height:50, background: '#ccc'}}></div>
</div>
</div>

## justify-content

> justify-content:start|end|center|space-between|space-around|space-evenly|stretch

justify-content 和 align-content 相似，align-content 作用于交叉轴方向的 flex item，jsutify-content 作用于主轴;align-content 需要 flex-wrap:warp

<div>
<div style={{display: 'flex',width: 500, height:200, background: '#eee',justifyContent: 'space-evenly'}}>
    <div style={{width: 130,height:20, background: '#ccc'}}></div>
    <div style={{width: 130,height:30, background: '#ccc'}}></div>
    <div style={{width: 130,height:50, background: '#ccc'}}></div>
</div>
</div>

## 水平、垂直方向居中

<div>
  不加align-items元素不会在行内居中
<div style={{display: 'flex',flexWrap: 'wrap',width: 300, height:200, background: '#eee',alignContent:'center',justifyContent:'center'}}>
    <div style={{width: 70,height:60, background: 'orange'}}></div>
    <div style={{width: 60,height:50, background: 'blue'}}></div>
    <div style={{width: 50,height:42, background: 'red'}}></div>
    <div style={{width: 90,height:20, background: 'yellow'}}></div>
</div>
加align-items哪哪都是居中的
<div style={{display: 'flex',flexWrap: 'wrap',width: 300, height:200, background: '#eee',alignContent:'center',justifyContent:'center',alignItems:'center'}}>
    <div style={{width: 70,height:60, background: 'orange'}}></div>
    <div style={{width: 60,height:50, background: 'blue'}}></div>
    <div style={{width: 50,height:42, background: 'red'}}></div>
    <div style={{width: 90,height:20, background: 'yellow'}}></div>
</div>
</div>
