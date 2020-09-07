## network面板
### 大概说下这个面板的功能分区？
> [Measure Resource Loading Times](https://developers.google.com/web/tools/chrome-devtools/network/resource-loading)

大致分为五个部分

1. 控制
2. 筛选：可筛选不同文件类型，ajax请求就选xhr，可以按住ctrl点击筛选项进行多选
3. 预览：时间轴为横坐标，不同的横条表示不同资源加载的情况
4. 请求表：列出所有资源的具体信息
5. 总结：告诉你请求数量，数据传输总量，加载时间等

<br><br><br>
<div align="center">
  <img src="https://github.com/jiulanrensan/blog/blob/master/img/panes.png" width="70%" />
</div>
<br><br><br>

### 我看到'preserve log'了，是不是也可以记录页面跳转前的请求？那旁边的disable cache是什么？
对的，顾名思义，就是请求的资源不允许缓存

浏览器每次请求资源的时候会检查这个资源是否在本地有缓存/缓存是否过期，如果满足要求，就直接获取缓存的资源，而不去请求服务器，一来减轻了服务器压力，二来减少了请求响应时间，页面可以快速展示

但是如果资源更新了，但浏览器还是使用本地缓存，就没有达到预期效果，所以可以选择diabled cache

### 怎么看低网速下的网页表现？我的网速太TM快了
点击控制那一行的'online',可以选择模拟3g网络或者掉线状态，甚至可以自定义上传下载的网速
<br><br><br>
<div align="center">
  <img src="https://github.com/jiulanrensan/blog/blob/master/img/network_throttle.gif" width="70%" />
</div>
<br><br><br>

### 预览有两条不同颜色的竖线，这是什么？
* 蓝色表示触发DOMContentLoaded，即初始html文档被完全加载和解析完成。[mdn: DOMContentLoaded](https://developer.mozilla.org/zh-CN/docs/Web/Events/DOMContentLoaded)
* 红色表示页面完全加载。[mdn: load](https://developer.mozilla.org/zh-CN/docs/Web/Events/load)

<br><br><br>
<div align="center">
  <img src="https://github.com/jiulanrensan/blog/blob/master/img/load.PNG" width="70%" />
</div>
<br><br><br>

### 如何看看接口传的值对不对

可以看到headers这个tab有请求头，响应头，最下面是query/params/body
<br><br><br>
<div align="center">
  <img src="https://github.com/jiulanrensan/blog/blob/master/img/network_headers.gif" width="70%" />
</div>
<br><br><br>

### headers旁边那些呢？
* preview会展示有用的信息，比如图片，document等等

* response就是响应的信息

* timing展示请求响应时间

平时主要用的是这几个，重点是看timing，可以看到每个值都有不同颜色表示

<br><br><br>
<div align="center">
  <img src="https://github.com/jiulanrensan/blog/blob/master/img/timing.PNG" width="70%" />
</div>
<br><br><br>

**重点**
> [network-reference](https://developers.google.com/web/tools/chrome-devtools/network/reference)

* Queueing 请求在排队
  
  原因如下：
  
  * 有更高优先级的请求排在前面
  * 跟当前域名已经打开了6个tcp连接，这是谷歌浏览器默认设置的，只适用于http/1.0 和 http/1.1。因此如果要同时加载多个资源时，可给资源设置不同的域名
  * 浏览器在磁盘分配空间
* Stalled 延迟，理由同上
* DNS Lookup 浏览器正在解析域名查找ip地址
* Initial connection 浏览器正则建立连接，包括tcp握手/重试和协商ssl
* Proxy negotiation 代理协商
* Request sent 发送请求
* ServiceWorker Preparation 浏览器正在启动ServiceWorker
* Request to ServiceWorker 请求正在被发送到ServiceWorker
* Waiting (TTFB) 响应的第一个字节的等待时长
  
  * 如果是连接缓慢导致，考虑把资源放在cdn或换主机
  * 如果是后端慢，考虑优化数据库查询，使用缓存或修改服务器配置
* Content Download 浏览器接收响应的时间


### 请求表的size那一列有memory cache 和 disk cache，这有什么区别

[上一章：console](https://github.com/jiulanrensan/blog/blob/master/chrome_developer_dev-tool/console.md)

[下一章：source](https://github.com/jiulanrensan/blog/blob/master/chrome_developer_dev-tool/source.md)