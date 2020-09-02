## ArrayBuffer
### 定义
> 所谓ArrayBuffer就是个装着2进制数据的对象

### Blob和ArrayBuffer区别
Blob对象也是二进制数据对象

> ArrayBuffer存在的意义就是作为数据源提前写入在内存中，就是提前钉死在某个区域，长度也固定。于是，当我们要处理这个ArrayBuffer中的二进制数据，例如，分别8位，16位，32位转换一遍，这个数据都不会变化，3种转换共享数据。注意，ArrayBuffer本身是不能读写的，需要借助类型化数组(Tpyed Arrays)或DataView对象来解释原始缓冲区

## TypedArray(类型化数组)
> 专为访问原始的二进制数据而生。

> 本质上，类型化数组和ArrayBuffer是一样的。不过一个可读写（脱掉buffer限制），一个当数据源的命。


类型数组的类型有(只列举部分)

> 参考 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray

名称 | 大小(以字节为单位) | 说明
-- | -- | --
Int8Array | 1 | 8 位二进制有符号整数
Uint8Array | 1 | 8 位二进制无符号整数
Int16Array | 2 | 16位有符号整数
Uint16Array | 2 | 16位无符号整数

### 例子
<br><br><br>
<div align="center">
  <img src="https://github.com/jiulanrensan/blog/blob/master/ArrayBuffer_and_TypedArray/typedArray.png" width="70%" />
</div>
<br><br><br>

> 由于类型化数组直接访问固定内存，因此，比传统数组要快！因为普通Javascript数组使用的是Hash查找方式。同时，类型化数组天生处理二进制数据，这对于XMLHttpRequest 2、canvas、webGL等技术有着先天的优势

## DataView对象
> DataView对象在可以在ArrayBuffer中的任何位置读取和写入不同类型的二进制数据。

> 参考 https://www.zhangxinxu.com/wordpress/2013/10/understand-domstring-document-formdata-blob-file-arraybuffer/

### 参考文章
* [理解DOMString、Document、FormData、Blob、File、ArrayBuffer数据类型](zhangxinxu.com/wordpress/2013/10/understand-domstring-document-formdata-blob-file-arraybuffer/)