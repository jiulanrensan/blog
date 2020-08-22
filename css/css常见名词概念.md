### ppi (pixels per inch)
#### 定义
每英寸的像素取值，也叫像素密度，ppi越高，像素点越多，图像越清晰
#### 计算
已知屏幕分辨率（1080 * 1920）和屏幕尺寸（5.5）
```
斜边 = (1920^2 + 1080^2)的平方根 = 2202.9
ppi = 斜边 / 5.5 = 400.5
```
### 设备像素/物理像素 (device pixels)
指的就是显示屏是由一个个物理像素点组成的，而dp是固定不变的，单位是pt，css中pt是绝对单位，`1pt = 1/72英寸`。显然，不同设备dp是不一样的


### px (css pixcels)
虚拟像素，可以理解为“直觉”像素，CSS和JS使用的抽象单位，浏览器内的一切长度都是以CSS像素为单位的，CSS像素的单位是px

默认情况下一个CSS像素应该是等于一个物理像素的宽度的，但是浏览器的放大操作让一个CSS像素等于了两个设备像素宽度。在高PPI的设备上，CSS像素甚至在默认状态下就相当于多个物理像素的尺寸。

### 设备独立像素/ device independent pixel(dip)
也称为逻辑像素

css像素 = 设备独立像素 = 逻辑像素

### 设备像素比/device pixels ratio(dpr)
`dpr = 设备像素 / css像素`

当这个比率为1:1时，使用1个设备像素显示1个CSS像素

当这个比率为2:1时，使用4个设备像素显示1个CSS像素

当这个比率为3:1时，使用9（3*3）个设备像素显示1个CSS像素

通过dpr，我们可以知道设备上一个css像素代表多少个物理像素。例如在retina屏的iphone上，dpr为2，也就是说一个css像素相当于四个物理像素。

### 分辨率
说的就是屏幕的像素尺寸，比如iphone6/iphone7的分辨率就是 750*1334，得出ppi为326

### meta
```
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
```
meta标签的作用是让当前viewport的宽度等于设备的宽度，同时不允许用户进行手动缩放，

### css单位
单位大体分为两类：
* 绝对单位(不会因为其他元素的尺寸变化而变化)
* 相对单位
  * px 像素
  * pt 1pt = 1/72 in
  * in
* 相对单位
  * %
  * em 相对父元素的字体大小
  * rem 相对html标签的字体大小
  * vw 1%视口宽度
  * vh 1%视口高度
  * vmin 1%视口的宽度和高度中较小的尺寸
  * vmax 1%视口的宽度和高度中较大的尺寸
#### pt


> [CSS像素、物理像素、逻辑像素、设备像素比、PPI、Viewport](https://github.com/jawil/blog/issues/21)