## CSS3 硬件加速（GPU加速）

### 硬件加速
将浏览器的渲染过程交给GPU处理，而不是自带的比较慢的渲染器，这样使`trasition`和`animation`更加流畅

#### 一个简单地例子
把代码复制到本地打开然后开启chrome的performance面板记录

##### 1. 动画通过`top,left`移动
* `Experience`： `Layout Shift`（布局偏移）全红，`summary`提示`Cumulative Layout Shifts can result in poor user experiences.`
* `Main`： rendering（紫色部分）事件占据大部分时间，放大之后可以看到紫色部分包含`Recalculate Style`,`Layout`,`Update Layer Tree`事件
##### 2. 动画通过`transform: translate`移动
* `Experience`：这一行已经没有了
* `Main`: 可以看到紫色部分几乎只有在开头和末尾才出现

### 硬件加速的原理
浏览器接收到页面文档后，会将文档中的标记语言解析为dom树，dom树和cssom结合后形成render tree，render tree包含渲染渲染对象，每一个渲染对象会被分到一个图层中，每个图层又会被加载到gpu，`css`的`transfrom`在gpu会直接创建一个新的图层，使用`transfrom`的图层都会由独立的合成器进程进行处理，并不需要软件方面的渲染，不会触发repaint，而绝对定位absolute中的left和top会一直触发repaint

浏览器什么时候创建独立的图层：
* 3D 或者 CSS `transform`
* `<video>` 和 `<canvas>` 标签
* CSS的`filter`属性
* 覆盖在其它元素之上的元素，比如通过z-index提升层级

所以perfromance面板的在开头和末尾会出现rendering(紫色部分)

### chrome跟踪
#### `Enable paint flashing`
绿色的框会出现在重绘的区域。
动图例子是`transform`，动画开始和动画结束小球区域都会出现绿色方框，表示这个区域重绘了，跟perfromance的main紫色部分对应
如果动画是`left`定位，可以看到小球区域一直是绿色方框，这里就不放动图展示了
#### `Layer borders`
可以查看独立图层，开启这个选项以后单独的层会具有一个橙色的边框。
动图例子是`transform`，动画过程中，小球区域一直有橙色边框，表示这是个独立图层


### 在gpu渲染元素
并不是所有css属性都会在gpu处理，除了下面的属性：
* transform
* opacity
* filter

### 强制在gpu渲染
在动画开始的时候尝试在gpu渲染一个元素，可以帮助我们避免创建新层的时候导致重绘。
```
.example1 {
  transform: translateZ(0);
}

.example2 {
  transform: rotateZ(360deg);
}
```
这样做会让浏览器知道，我们希望采用3d的方式做转换，这会让浏览器最开始的时候就是用gpu处理，启动硬件加速

例子：

```
/* 增加filter */
filter: blur(60px) saturate(120%) brightness(140%);
/* 开启硬件加速 */
transform: translateZ(0);
```


### 使用gpu加速需要注意的
#### Memory
大部分重要的问题都会内存，GPU处理过多的内容会导致内存问题。因此不会对所有元素使用硬件加速

#### Font Rendering
在gpu渲染字体会导致抗锯齿无效，这是因为gpu和cpu算法不同，因此如果你不在动画结束的时候关闭硬件加速，会产生字体模糊

> [参考文章](https://lz5z.com/Web%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96-CSS3%E7%A1%AC%E4%BB%B6%E5%8A%A0%E9%80%9F/)
> [参考文章](https://juejin.im/post/6844903649974435854)
> [参考文章](https://www.cnblogs.com/ranyonsue/p/8296983.html)