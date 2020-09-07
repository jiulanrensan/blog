## console面板
### 1. 打开这个面板一堆红色或者黄色背景的信息？？
js代码中的警告、报错、信息，或者网络请求的报错都会在这打印出来，可以分类筛选查看，觉得碍事直接清空掉
<br><br><br>
<div align="center">
  <img src="https://github.com/jiulanrensan/blog/blob/master/img/console_filter_and_clear.gif" width="70%" />
</div>
<br><br><br>

### 2. 调试登录流程的时候页面有跳转，一跳转console面板就清空了，但是我想看跳转前一步代码console出来的信息？
选择'preserve log'可以保留
<br><br><br>
<div align="center">
  <img src="https://github.com/jiulanrensan/blog/blob/master/img/console_preserve_log.gif" width="70%" />
</div>
<br><br><br>

### 3. 写了一段函数，想测试下结果是否符合预期？
<br><br><br>
<div align="center">
  <img src="https://github.com/jiulanrensan/blog/blob/master/img/console_live_expression.gif" width="70%" />
</div>
<br><br><br>

### 4. 项目中会把一些信息放在localStorage里面，每次调试页面都要逐个去输入，好麻烦？
console面板可以作为一个shell与当前页面进行交互

```
// 设置当前域名下的localStorage
localStorage.setItem('info', info)

// 批量设置
const info = ['user1','user2','user3']
const value = ['value1', 'value2', 'value3']
info.map((el,idx) => {
  localStorage.setItem(el, value[idx])
})
```


[上一章：element](https://github.com/jiulanrensan/blog/blob/master/chrome_developer_dev-tool/element.md)

[下一章：network](https://github.com/jiulanrensan/blog/blob/master/chrome_developer_dev-tool/network.md)