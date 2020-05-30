---
route: /javascript-in-html
---

## script 元素

script 元素有几个属性需要关注的

### type

表示脚本语言的内容类型，默认值`text/javascript`，有意思的是 js 文件在传送过程中请求头中的 MIME 类型是`application/x-javascript`，如果`type`设置为该值有可能导致脚本被忽略

### defer 延迟脚本

HTML4 定义了 defer 属性，表示脚本不会影响页面构造，立即下载脚本但可以延迟到文档完全加载后再执行。HTML5 规范规定按脚本出现先后顺序执行，但实际上不一定

### async 异步脚本

HTML5 定义的，表示应该立即下载脚本，但不阻塞其他资源加载。执行顺序不固定

`async`和`defer`属性的脚本加载顺序执行顺序有点复杂，另外单独学习

## 解释 script

- 阻塞

解释器对页面所有`script`除`defer`、`async`所有代码求值完毕前，页面其他内容不会被浏览器加载显示。就是白屏

- 加载外部域

`script`通过`scr`值可以是非本域 URI 地址，这种方式需要考虑安全性问题，因为外部脚本可能存在恶意代码，这点可以通过 CSP 控制

## 外部脚本优点

- 维护性
- 可缓存

## 文档模式

在`HTML`中通过`doctye`声明，如果没有声明文档类型，默认为混杂模式，`HTML5`标准模式声明方式

```html
<!DOCTYPE html>
```

- [ ] `text/javascript`和`application/x-javascript`之间应该有点啥关系?
