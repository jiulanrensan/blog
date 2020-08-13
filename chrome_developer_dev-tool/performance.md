## performance面板
> [performance文档](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/reference)

> [experience-report](https://developers.google.com/web/tools/chrome-user-experience-report)

### 这块应该怎么用？
看图说话
<br><br><br>
<div align="center">
  <img src="https://github.com/jiulanrensan/blog/blob/master/chrome_developer_dev-tool/img/performance_record.gif" width="70%" />
</div>
<br><br><br>

### 卧槽，怎么这么复杂，从上往下说具体点？
<br><br><br>
<div align="center">
  <img src="https://github.com/jiulanrensan/blog/blob/master/chrome_developer_dev-tool/img/performance_feature.png" width="70%" />
</div>
<br><br><br>

* 1. 开始记录，停止记录和配置记录期间捕获的信息
* 2. 页面性能的高级汇总
* 3. 网络请求具体表现、CPU 堆叠追踪的可视化等
* 4. 选择事件后，此窗格会显示与该事件有关的更多信息。 未选择事件时，此窗格会显示选定时间范围的相关信息。

### 第一块再详细点？比如screenshots和memory
<br><br><br>
<div align="center">
  <img src="https://github.com/jiulanrensan/blog/blob/master/chrome_developer_dev-tool/img/performance_controls.png" width="70%" />
</div>
<br><br><br>

1. screenshots 在记录期间捕捉屏幕截图
2. memory 展示内存使用情况

<br><br><br>
<div align="center">
  <img src="https://github.com/jiulanrensan/blog/blob/master/chrome_developer_dev-tool/img/performance_memory.png" width="70%" />
</div>
<br><br><br>

3. collect garbage(垃圾箱图标) 释放浏览器内存

4. Disable JavaScript Samples 选项开启会使工具忽略记录 JS 的调用栈
5. network 限制网速
6. cpu 限制cpu，可调节比常用的cpu慢多少倍
7. Enable advanced paint instrumentation 记录渲染事件的细节，点击frames其中一项，下方4区域就多了一个layer
<br><br><br>
<div align="center">
  <img src="https://github.com/jiulanrensan/blog/blob/master/chrome_developer_dev-tool/img/performance_instrumentation.gif" width="70%" />
</div>
<br><br><br>

4-7 其实都是为了模拟手机效果

### 接着

<br><br><br>
<div align="center">
  <img src="https://github.com/jiulanrensan/blog/blob/master/chrome_developer_dev-tool/img/performance_overview.png" width="70%" />
</div>
<br><br><br>

> fps: frames per second 即每秒帧数，浏览器一般为60fps

1. 如果在fps这一列看到红色的横条，表示浏览器帧率下降，用户体验会不好；而绿色的块状图越高，则表示fps越高，体验越好

2. CPU这一part记录期间表示CPU的使用情况，颜色与下面的summary对应

3. net就是网络请求，看区域3的network

<br><br><br>
<div align="center">
  <img src="https://github.com/jiulanrensan/blog/blob/master/chrome_developer_dev-tool/img/cpu-summary.svg" width="70%" />
</div>
<br><br><br>


### 区域3 
<br><br><br>
<div align="center">
  <img src="https://github.com/jiulanrensan/blog/blob/master/chrome_developer_dev-tool/img/performance_area3.png" width="70%" />
</div>
<br><br><br>

#### 1. network 网络线程，各资源的网络请求详情

请求根据种类不同分为以下几种颜色：
* HTML: Blue
* CSS: Purple
* JS: Yellow
* Images: Green

点击`www.baidu.com`如图a
<br><br><br>
<div align="center">
  <img src="https://github.com/jiulanrensan/blog/blob/master/chrome_developer_dev-tool/img/performance_network.png" width="70%" />
</div>
<br><br><br>

附上一张network的timing图配合食用：图b
<br><br><br>
<div align="center">
  <img src="https://github.com/jiulanrensan/blog/blob/master/chrome_developer_dev-tool/img/network_timing.png" width="70%" />
</div>
<br><br><br>

可以看到这个蓝色横条有很多细节，我们逐个拆分：
* 左上角有个深蓝色的小正方形，表示这是高优先级的请求；若是浅蓝色，则表示是低优先级。这个优先级可以在下方的summary中查看priority属性
* 蓝色横条最左边的细线：这里包含图b'Connection Start'中的事件，也就是在'Request Sent'之前
* 次左的浅蓝色长方形：Request Sent 和 Waiting (TTFB)
* 次右的深蓝色长方形：Content Download
* 最右的细线： 等待主线程的时间，这个在图b中没有体现

#### 2. frames 帧线程，点击绿色长方形可以看到fps
<br><br><br>
<div align="center">
  <img src="https://github.com/jiulanrensan/blog/blob/master/chrome_developer_dev-tool/img/performance_frames.png" width="70%" />
</div>
<br><br><br>

#### 3. timings 没懂，绿色虚线是FP(first paint)开始

#### 4. experience 用户体验
[cls](https://web.dev/cls/?utm_source=devtools)
> How to improve CLS
> 对于大多数网站，您可以遵循一些指导原则来避免所有意外的布局变化：
> 
> * 请务必在图片和视频元素上包含size属性，否则，请使用CSS宽高比框保留所需的空间. 这种方法可确保在加载图像时浏览器可以在文档中分配正确的空间量. 请注意，您 还可以使用unsize-media功能部件策略在支持功能部件策略的浏览器中强制执行此行为.
>
> * 除非响应用户交互，否则切勿在现有内容上方插入内容. 这样可以确保可以预期发生任何版式移位.
> 
> * 优先于变换动画而不是触发布局更改的属性动画. 对过渡进行动画处理，以提供状态与状态之间的上下文和连续性.

#### 5. main 主线程：负责执行Javascript, 解析HTML/CSS, 完成绘制

##### 5.1
也叫作火焰图，只是这个火焰图是倒过来的，最上面的表示顶级的js函数，调用栈最长，越往下调用栈越小。默认情况下，这个面板会记录js调用栈中的每层函数，而勾选了【Disable JavaScript Samples】之后，火焰图只会精确到事件级别（调用某个 JS 文件中的函数是一个事件），忽略该事件下的所有函数调用栈

##### 5.2
<br><br><br>
<div align="center">
  <img src="https://github.com/jiulanrensan/blog/blob/master/chrome_developer_dev-tool/img/performance_event.png" width="70%" />
</div>
<br><br><br>

区域2、区域3的main线程、区域4的summary的不同颜色，他们其实都是统一的标准，代表各种事件：

* 蓝色：加载（Loading）事件
* 黄色：脚本运算（Scripting）事件
* 紫色：渲染（Rendering）事件
* 绿色：绘制（Painting）事件
* 灰色：其他（Other）（有时候是system）
* 闲置：浏览器空闲

而每个大类事件又有子类事件，见[此](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/performance-reference)

常见的子类事件，从网上扒来的图：
<br><br><br>
<div align="center">
  <img src="https://user-gold-cdn.xitu.io/2018/8/4/16502c7e66d45e9a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" width="70%" />
</div>
<br><br><br>

#### 6. raster线程，负责完成某个layer或者某些块(tile)的绘制

#### 7. GPU线程

#### 8. chrome子线程

#### 9. compositor 没懂
找到相关浏览器渲染内容

[compositing layer](https://zhuanlan.zhihu.com/p/88288584)

[浏览器渲染详细过程](https://juejin.im/entry/6844903476506394638)


### 区域4
* summary 统计图：展示各个事件阶段耗费的时间
* Bottom-Up 排序：可以看到各个事件消耗时间排序 
  * self-time 指除去子事件这个事件本身消耗的时间 
  * total-time 这个事件从开始到结束消耗的时间（包含子事件）
* Call Tree 调用栈：Main选择一个事件，可以看到整个事件的调用栈（从最顶层到最底层，而不是只有当前事件）
* Event Log 事件日志 
  * 多了个start time，指事件在多少毫秒开始触发的 
  * 右边有事件描述信息


### 找到性能瓶颈?
1. 根据下面的summary的环状图，可以知道哪个过程耗费时间最长
2. 展开main, 横坐标是记录期间的时间轴，纵坐标代表调用栈
3. main的横条右上角如果有一个红色三角，就表示这个事件是有问题的
4. 点击横条，下面的summary就会有这个事件的详细信息，可以找到耗费时间最长的事件

[上一章：source](https://github.com/jiulanrensan/blog/blob/master/chrome_developer_dev-tool/source.md)

[下一章：memory](https://github.com/jiulanrensan/blog/blob/master/chrome_developer_dev-tool/memory.md)