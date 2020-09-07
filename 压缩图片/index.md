## 前端压缩上传图片
理解前端压缩图片原理，应该先了解js的Blob,dataURL,FileReader等知识

<!-- 图片：各个格式之间的转换 -->
<br><br><br>
<div align="center">
  <img src="https://github.com/jiulanrensan/blog/blob/master/img/transform.png" width="70%" />
</div>
<br><br><br>

### 原理
前端压缩图片的原理其实就是用canvas的`drawIamge()`进行图像处理

#### drawIamge()
> [语法](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage)

不建议通过修改canvas画布大小去压缩图像，因为有时候画布变小了，转成图片却变大了。
我自己试了很多图片，某些图片画布大小为原来的0.6-0.8倍尺寸时，转成图片会比原图变大


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
```
const image = new Image()
const objectUrl = URL.createObjectURL(file)
image.onload = () => {
  // 清空内存
  URL.revokeObjectURL(objectUrl)
}
image.src = objectUrl
```


获取到Image Object之后，用canvas的`drawImage`转成canvas对象并进行压缩
```
function imageToCanvas (image) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const {naturalWidth, naturalHeight} = image
  // 宽高比
  const whRatio = naturalWidth/naturalHeight
  // 设定画布宽高
  canvas.width = 300
  canvas.height = 300/whRatio
  // 画到画布上
  ctx.drawImage(image, 0, 0, 300, 300/whRatio)
  // 转为blob格式
  canvasToBlob(canvas)
  // 转为dataURL
  canvasToDataURL(canvas)
}
```
根据需要，将压缩之后的canvas转为需要的格式
* `canvas.toBlob()`方法: 上传图片
```
canvas.toBlob(callback, mimeType, qualityArgument)
```
* `canvas.toDataURL()`: 预览图片
```
canvas.toDataURL(mimeType, qualityArgument)
```
mimeType表示canvas导出来的base64图片的类型，默认是png格式

qualityArgument表示导出的图片质量，只要导出为jpg和webp格式的时候此参数才有效果，默认值是0.92，是一个比较合理的图片质量输出参数，通常情况下，我们无需再设定
```
function canvasToBlob (canvas) {
  canvas.toBlob((blob) => {
    console.log(blob);
  }, 'image/jpg', 0.5)
}

function canvasToDataURL (canvas) {
  const dataURL = canvas.toDataURL('image/jpg', 0.92)
  console.log(dataURL.length);
}
```
可以看到经过drawImage之后的图像大小是有变化的

#### 途径二：通过图片链接获取
```
const image = new Image()
// url 为图片链接
image.src = url
image.onload = () => {
  return image
}
```
获取到image Object之后，步骤就和上面的一样了

### 参考
> [压缩图片](https://juejin.im/post/6844903510929063943)
> [压缩图片](https://segmentfault.com/a/1190000023486410)
> [压缩图片](https://www.zhangxinxu.com/wordpress/2017/07/html5-canvas-image-compress-upload/)