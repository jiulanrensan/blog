## 前端压缩上传图片
理解前端压缩图片原理，应该先了解js的Blob,dataURL,FileReader等知识

### 原理
前端压缩图片的原理其实就是用canvas进行图像处理

### 涉及不同对象之间的转换
首先，一般浏览器图片来源有两个：
* 1. `input`html标签上传文件
* 2. 通过http获取图片链接

而压缩图片需要使用canvas，且图片一般以`File`对象上传，所以涉及到不同对象之间的转换:
* `Image URL`
* `Image Object`
* `Blob`
* `File`
* `canvas`
* `DataURL(base64)`



### 参考
> [压缩图片](https://juejin.im/post/6844903510929063943)
> [压缩图片](https://segmentfault.com/a/1190000023486410)