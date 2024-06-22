# innerText、innerHTML、textContent

## 共用点

- 使用方法相同，node.innerText 获取，node.innerText = 'xx'设置

## get 不同点

- textContent 会获取节点下面所有节点，包括注释节点、style、script
- innerText 返回的是元素中已被渲染的内容，不会包含隐藏的节点，比如被样式隐藏掉的，所以在调用 innerText 时会触发回流以计算最新的样式结果

```html
<div id="zw">
  <!-- zhao wei -->
  <style>
    .zhao {
      display: none;
    }
    .wei {
      visibility: hidden;
    }
    .dot {
      color: red;
    }
  </style>
  <div class="zhao">zhao</div>
  <div class="wei">wei</div>
  <div class="dot">.</div>
</div>
<script>
  var zw = document.getElementByID('zw');
</script>
```

输出

<img src="/images/innerText_textContent.jpg" />


- [ ] textContent 返回结果注释内容那行显示为空行，并没有显示注释原生内容，需要在其他浏览器测试看下

## set 不同点

- textContent 会自动转义输入内容，这点可以防止 XSS
