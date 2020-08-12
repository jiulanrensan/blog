## performance面板
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
* 3. 网络请求具体表现
* 4. CPU 堆叠追踪的可视化。
* 5. 选择事件后，此窗格会显示与该事件有关的更多信息。 未选择事件时，此窗格会显示选定时间范围的相关信息。

### 第一块再详细点？比如screenshots和memory
<br><br><br>
<div align="center">
  <img src="https://github.com/jiulanrensan/blog/blob/master/chrome_developer_dev-tool/img/performance_controls.png" width="70%" />
</div>
<br><br><br>

1. screenshots 在记录期间捕捉屏幕截图，这就不怕网速太快，看不了网页的具体表现
2. memory 没懂
3. collect garbage(垃圾箱图标) 没懂
3. network 限制网速
4. cpu 限制cpu，可调节比常用的cpu慢多少倍
network和cpu其实都是为了模拟手机效果

### 接着

<br><br><br>
<div align="center">
  <img src="https://github.com/jiulanrensan/blog/blob/master/chrome_developer_dev-tool/img/performance_overview.png" width="70%" />
</div>
<br><br><br>

> fps: frames per second 即每秒帧数，如果大于60fps,则表示非常流畅

1. 如果在fps这一列看到红色的横条，表示浏览器帧率下降，用户体验会不好；而绿色的块状图越高，则表示fps越高，体验越好

2. CPU这一part记录期间表示CPU的使用情况，颜色与下面的summary对应


<br><br><br>
<div align="center">
  <img src="https://github.com/jiulanrensan/blog/blob/master/chrome_developer_dev-tool/img/cpu-summary.svg" width="70%" />
</div>
<br><br><br>

[上一章：source](https://github.com/jiulanrensan/blog/blob/master/chrome_developer_dev-tool/source.md)

[下一章：performance](https://github.com/jiulanrensan/blog/blob/master/chrome_developer_dev-tool/performance.md)