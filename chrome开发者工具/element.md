## element面板
### 1. 我页面上某个html元素的样式不对劲，我该怎么去找这个元素样式呢？

如图所示:

<img src="https://github.com/jiulanrensan/blog/blob/master/chrome%E5%BC%80%E5%8F%91%E8%80%85%E5%B7%A5%E5%85%B7/img/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20200810154529.png" style="display: block;width: 60%;margin: 0 auto" />

点击红框1，然后鼠标移动到左侧目标元素，右侧的element面板会自动展开到你选取的那个元素上，然后在点击红框2的style，即展示当前元素的css样式，越靠上css权重越高，旁边则是盒子模型的展示图

---

### 2.   调样式的时候经常会为px或者颜色数值等等修改，然后再回到浏览器查看，有点麻烦啊？

相信你已经发现可以在element面板直接修改dom结构的tag标签，class名称等等，也可以在styles那直接输入样式，浏览器会及时展示，所以你可以在这里写好再复制过去

<img src="https://github.com/jiulanrensan/blog/blob/master/chrome%E5%BC%80%E5%8F%91%E8%80%85%E5%B7%A5%E5%85%B7/img/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20200810155955.png" style="display: block;width: 60%;margin: 0 auto" />

<img src="https://github.com/jiulanrensan/blog/blob/master/chrome%E5%BC%80%E5%8F%91%E8%80%85%E5%B7%A5%E5%85%B7/img/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20200810160051.png" style="display: block;width: 60%;margin: 0 auto" />
---

### 3.  一个元素盒子会有多个class，想查看某一个class效果？

<img src="https://github.com/jiulanrensan/blog/blob/master/chrome%E5%BC%80%E5%8F%91%E8%80%85%E5%B7%A5%E5%85%B7/img/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20200810161828.png" style="display: block;width: 60%;margin: 0 auto" />

点击1处的.cls，即当前选中元素的相关css，在2处展示，不勾选则表示不引用这个class

---

### 4. 我有些元素hover情况下的样式怎么找不到？

<img src="https://github.com/jiulanrensan/blog/blob/master/chrome%E5%BC%80%E5%8F%91%E8%80%85%E5%B7%A5%E5%85%B7/img/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20200810164237.png" style="display: block;width: 60%;margin: 0 auto" />

.cls旁边的:hov就是当前选择元素的模拟操作，比如下图所示，鼠标悬浮"更多"字体上会浮现其他内容，那我要模拟鼠标悬浮这个操作，直接勾选":hover"就行

---
### 5. box-shadow的阴影很难弄得好看？

阴影直接手动操作画出来

<img src="https://github.com/jiulanrensan/blog/blob/master/chrome%E5%BC%80%E5%8F%91%E8%80%85%E5%B7%A5%E5%85%B7/img/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20200810164552.png" style="display: block;width: 60%;margin: 0 auto" />
<img src="https://github.com/jiulanrensan/blog/blob/master/chrome%E5%BC%80%E5%8F%91%E8%80%85%E5%B7%A5%E5%85%B7/img/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20200810164604.png" style="display: block;width: 60%;margin: 0 auto" />
<img src="https://github.com/jiulanrensan/blog/blob/master/chrome%E5%BC%80%E5%8F%91%E8%80%85%E5%B7%A5%E5%85%B7/img/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20200810164614.png" style="display: block;width: 60%;margin: 0 auto" />
---

[上一章：首页](https://github.com/jiulanrensan/blog/blob/master/chrome%E5%BC%80%E5%8F%91%E8%80%85%E5%B7%A5%E5%85%B7/index.md)

[下一章：]()
