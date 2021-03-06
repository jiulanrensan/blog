### 首页

### 1. 如何打开chrome开发者工具？

三种方法
* 在Chrome菜单中选择 更多工具 > 开发者工具
* 在页面元素上右键点击，选择 “检查”
* 使用 快捷键 Ctrl+Shift+I (Windows) 或 Cmd+Opt+I (Mac)

可以看到页面如下

<br><br><br>
<div align="center">
  <img src="https://github.com/jiulanrensan/blog/blob/master/img/screen.png" width="70%" />
</div>
<br><br><br>

### 2. 要写响应式页面，没有那么多设备，怎么调试呢？

### 3. 这个模拟的效果和真机调试一样吗
> 设备硬件
> * 无法模拟 GPU 和 CPU 行为
>
> 浏览器 UI
> * 无法模拟系统显示，如地址栏
> * 无法将原生显示（如 `<select>` 元素）作为模态列表模拟
> * 一些增强功能（如数字输入打开小键盘）可能会因实际设备行为不同而不同
>
> ...

### 4. 顶部的这些element,console等等分别有什么用，那几个最常用？

* element: 元素面板,展示dom和css,可以自由修改dom和css属性，可以查看盒子模型,前端页面仔就经常看这一块
* console: 控制台面板,相当于一个shell,可以在这里输入任意js代码,可以通过代码与当前页面进行交互,代码中的报错警告信息会打印在这里,我们调试的时候常常需要console代码
* source: 源代码面板,当前页面所需下载的文件源代码都在这里展示,可以用断点进行调试
* network: 网络面板, 在这里查看请求或者下载的资源的详细信息,优化的时候经常查看
* performance: 性能面板, 顾名思义，就是用来优化的,以图表方式进行展示页面的网络性能和渲染性能等
* memory: 内存面板,如果需要比时间轴面板提供的更多信息，可以使用“配置”面板，例如跟踪内存泄漏
* application: 应用面板, 有cookie,应用缓存, 图像,字体和样式表等

剩下的我也不了解也没用过,上面的7项我会分七篇文章逐一讲解,目录如下

<br>

1. [element](https://github.com/jiulanrensan/blog/blob/master/chrome_developer_dev-tool/element.md)

2. [console](https://github.com/jiulanrensan/blog/blob/master/chrome_developer_dev-tool/console.md)

3. [network](https://github.com/jiulanrensan/blog/blob/master/chrome_developer_dev-tool/network.md)
