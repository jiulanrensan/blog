# 跨呀
[参考文章](https://segmentfault.com/a/1190000015597029)

## 为什么会由跨域
因为浏览器的[同源策略](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)

### 同源定义
protocol,port,host都相同的情况下，即为同源

例子： 

url: `http://store.company.com/dir/page.html`

| url | 结果 | 原因 |
| -- | -- | -- |
| http://store.company.com/dir2/other.html | 同 | host同 |
| http://store.company.com/dir/inner/another.html |同|host同|
| https://store.company.com/secure.html |不同|protocol不同|
| http://store.company.com:81/dir/etc.html |不同|端口不同 ( http:// 默认端口是80)|
| http://news.company.com/dir/other.html |不同|host不同|

### 没有同源策略限制的两大危险场景
1. 接口请求
浏览器会将响应头的cookie自动附在http请求头上，如果没有跨域限制，cookie携带的个人信息将可以被任意网站使用，这就是csrf

2. dom查询
```
// HTML
<iframe name="yinhang" src="www.yinhang.com"></iframe>
// JS
// 由于没有同源策略的限制，钓鱼网站可以直接拿到别的网站的Dom
const iframe = window.frames['yinhang']
const node = iframe.document.getElementById('你输入账号密码的Input')
console.log(`拿到了这个${node}，我还拿不到你刚刚输入的账号密码吗`)
```


## 解决跨域问题
1. jsonp
在HTML标签里，一些标签比如script、img这样的获取资源的标签是没有跨域限制的

所以可以通过script标签进行数据请求，服务端在生成的数据放在js里，scirpt标签加载之后解析js就可以获得数据了

很明显，加载script这种是通过get方式，没法执行post请求