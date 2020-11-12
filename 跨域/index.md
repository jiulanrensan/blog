# 跨呀
[参考文章](https://segmentfault.com/a/1190000015597029)
[解决跨域问题](https://segmentfault.com/a/1190000011145364)

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

2. nginx反向代理接口跨域
```
#proxy服务器
server {
    listen       81;
    server_name  www.domain1.com;

    location / {
        proxy_pass   http://www.domain2.com:8080;  #反向代理
        proxy_cookie_domain www.domain2.com www.domain1.com; #修改cookie里域名
        index  index.html index.htm;

        # 当用webpack-dev-server等中间件代理接口访问nignx时，此时无浏览器参与，故没有同源限制，下面的跨域配置可不启用
        add_header Access-Control-Allow-Origin http://www.domain1.com;  #当前端只跨域不带cookie时，可为*
        add_header Access-Control-Allow-Credentials true;
    }
}
```
3. node中间件做代理跨域

4. CORS 跨域资源共享
浏览器将cors请求分为两类：简单请求和非简单请求

只要同时满足以下两大条件，就属于简单请求

* 请求方法是`HEAD`,`GET`,`POST`其中一个
* http请求头信息只有以下几种字段
  * Accept
  * Accept-Language
  * Content-Language
  * Last-Event-ID
  * Content-Type: 只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain


4.1 对于简单请求
`Access-Control-Allow-Origin`设置为`*`

4.2 非简单请求
非简单请求会发送一次预检请求(options)，返回码是204，预检通过才会真正发出请求

```js
// 如果需要http请求中带上cookie，需要前后端都设置credentials，且后端设置指定的origin
ctx.set('Access-Control-Allow-Origin', 'http://localhost:9099')
ctx.set('Access-Control-Allow-Credentials', true)
// 非简单请求的CORS请求，会在正式通信之前，增加一次HTTP查询请求，称为"预检"请求（preflight）
// 这种情况下除了设置origin，还需要设置Access-Control-Request-Method以及Access-Control-Request-Headers
ctx.set('Access-Control-Request-Method', 'PUT,POST,GET,DELETE,OPTIONS')
ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, t')
```

4.3 减少预检请求
服务端设置`Access-Control-Max-Age`，表示响应的有效时间，单位为秒