## 前端压缩上传图片
理解前端压缩图片原理，应该先了解js的Blob,dataURL,FileReader等知识

### 原理
前端压缩图片的原理其实就是用canvas进行图像处理

### 涉及不同对象之间的转换
首先，一般浏览器图片来源有两个：
* 1. `<input>`标签上传文件
* 2. 通过http获取图片链接

而压缩图片需要使用canvas，且图片一般以`File`对象上传，所以涉及到不同对象之间的转换:
<!-- 图片 -->
* `Image URL`
* `Image Object`
* `Blob`
* `File`
* `canvas`
* `DataURL(base64)`

#### 途径一: 用input获取图片
```
// accept限定获取的文件类型
<input type="file" id="input" accept="image/*">
```
```
const input = document.getElementById('input')
input.addEventListener('change', (ev) => {
  console.log(ev.target.files);
})
```
<!-- 图片 -->
可以看到获取的是File类型的文件

然后根据转换图中的流程图，需要得到一个Image Object对象，有两个路径可以走

先转dataURL，用FileReader接口读取，然后将获得的dataURL作为img的src，就可以获取image对象
```
function fileToDataURL(file) {
  const reader = new FileReader()
  reader.onload = () => {
    console.log(reader.result);
  }
  reader.readAsDataURL(file)
}
function dataURLToImage(dataURL) {
  const img = new Image()
  img.onload = () => {
    console.log(img);
  }
  img.src = dataURL
}
```

第二条路径就是通过Object URL作为img的src

获取到Image Object之后，用canvas的`drawImage`转成canvas对象
```

```

### 参考
> [压缩图片](https://juejin.im/post/6844903510929063943)
> [压缩图片](https://segmentfault.com/a/1190000023486410)