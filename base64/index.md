## base64
### 定义
base64是一种基于64个可打印字符来表示二进制数据的表示方法。

它常用于在处理文本数据的场合，表示、传输、存储一些二进制数据。

64个字符：大小写字母各26个，数字10个，加号+，斜杠/

在 MIME 格式的电子邮件中，base64 可以用来将二进制的字节序列数据编码成 ASCII 字符序列构成的文本

<br><br><br>
<div align="center">
  <img src="https://github.com/jiulanrensan/blog/blob/master/base64/base_define.png" width="70%" />
</div>
<br><br><br>

#### 编码过程
<div align="center">
  <img src="https://github.com/jiulanrensan/blog/blob/master/base64/base64_index.png" width="70%" />
</div>
<br><br><br>

<div align="center">
  <img src="https://github.com/jiulanrensan/blog/blob/master/base64/base_tranform.png" width="70%" />
</div>
<br><br><br>

<div align="center">
  <img src="https://github.com/jiulanrensan/blog/blob/master/base64/base_transform_2.png" width="70%" />
</div>
<br><br><br>

<div align="center">
  <img src="https://github.com/jiulanrensan/blog/blob/master/base64/base_transform_3.png" width="70%" />
</div>
<br><br><br>

### 方法
在 JavaScript 中，有两个函数被分别用来处理解码和编码 base64 字符串
* `atob()`: 解码通过base-64编码的字符串数据
* `btoa()`: 从二进制数据“字符串”创建一个base-64编码的ASCII字符串

```
// example1
const name = 'Semlinker';
const encodedName = btoa(name);
console.log(encodedName); // U2VtbGlua2Vy

// example2
const encodedName = 'U2VtbGlua2Vy';
const name = atob(encodedName);
console.log(name); // Semlinker

```
a代表了ascii,b代表了blob。

`atob()`表示得到ascii,`btoa()`表示得到base64


### 参考文章
[玩转前端二进制](https://mp.weixin.qq.com/s/QHi6BVM5Jt8XwZ_FKcRYsg)