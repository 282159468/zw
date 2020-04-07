---
route: /cors
---

CORS 跨域资源共享是一种使用 XMLHttpRequest 实现跨域请求 的方法，CORS 请求分为两种

## 简单请求

### 请求方法必须以下方法之一

- GET
- POST
- HEAD HEAD 请求 Response 不会返回 body

### 请求头只能包含以下字段

- Accept
- Accept-Language
- Last-Event-ID Sever Sent Event 事件 ID，用于连接断开之后再次找到对应的事件恢复连接
- Content-Type

#### Content-Type 只能是以下类型之一

- application/x-www-form-urlencoded

表单 POST 时默认的资源类型，值形式为 a=1&b=2

- multipart/form-data

Content-Type: multipart/form-data

```jsx
boundary=----WebKitFormBoundaryI26Ec4f1hSPAyBfH

------WebKitFormBoundaryI26Ec4f1hSPAyBfH
Content-Disposition: form-data; name="a"

1
------WebKitFormBoundaryI26Ec4f1hSPAyBfH
Content-Disposition: form-data; name="b"

2
------WebKitFormBoundaryI26Ec4f1hSPAyBfH--
```

* text/plain

简单请求以外的都是非简单请求，CORS 对两种请求处理方式不一样，对非简单请求需要先通过一次预检请求，服务端接收预检请求返回同意跨域请求，客户接收返回后再次发送真实请求获取数据;而简单请求只需一次就能完成。

通过上面简单请求的条件，可以确定平时经常用的`application/json`资源类型属于非简单请求

## 非简单请求处理流程

内容一段插曲有点坑，本来想用 Express 启两个服务好测试非简单请求的，一测试死活不会发送预检请求，

结果在 Express cors 中间件的 issue 里发了现了这个
https://github.com/expressjs/cors/issues/181

> The ways CORS works is that your client (usually web browser) is what is actually deciding to make this requests, not this module. This module simply is a method to respond to the client when it does make them.<br/>
> So as for why those requests are being made -- you'll need to consult the support for your browser instead of this module. You can see for yourself that this module is not creating them by removing it from your code and then you'll still see those OPTIONS requests being sent by your client.

意思甩锅，大概是说没发预检请求不管我这个包的事，这属于浏览器机制我们管不着。根据这点继续 GG,果然

https://stackoverflow.com/questions/57410051/chrome-not-showing-options-requests-in-network-tab

https://support.google.com/chrome/thread/11089651?hl=en
https://bugs.chromium.org/p/chromium/issues/detail?id=995740#c1

- [ ] 暂时没看懂这个 issue，为什么要禁用
