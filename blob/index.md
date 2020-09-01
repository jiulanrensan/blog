## blob
### 定义
Blob(binary large object),表示二进制类型的大对象,blob通常都是影像，声音或者媒体文件。在js中，blob表示不可变的类文件对象的原始数据。

### Blob组成：
* type
* blobParts
  * Blob
  * ArrayBuffer
  * DOMString

### Blob构造函数：
```
var blob = new Blob(blobParts, options)
```
* blobParts: 它是一个由 ArrayBuffer，ArrayBufferView，Blob，DOMString 等对象构成的数组。DOMStrings 会被编码为 UTF-8
* options: 可选对象
  * type: 默认值为"", 表示MIME类型
  * endings: 默认值为"transparent",用于指定包含行结束符`\n`的字符串如何被写入。`transparent`表示会保持blob中保存的结束符不变,属性还有一个`native`值，代表行结束符会被更改为适合宿主操作系统文件系统的换行符

### Blob对象属性
* size: 表示Blob对象所包含数据的大小
* type: 表明该 Blob 对象所包含数据的 MIME 类型

### Blob对象方法
* `slice`: 返回一个新的 Blob 对象，包含了源 Blob 对象中指定范围内的数据
* `stream`: 返回一个能读取 blob 内容的 ReadableStream
* `text`: 返回一个 Promise 对象且包含 blob 所有内容的 UTF-8 格式的 USVString
* `arrayBuffer`: 返回一个 Promise 对象且包含 blob 所有内容的二进制格式的 ArrayBuffer

Blob 对象是不可改变的。我们不能直接在一个 Blob 中更改数据，但是我们可以对一个 Blob 进行分割,创建新的Blob对象，再将他们混合到一个新的Blob中


### Blob URL / Object URL
Blob URL / Object URL是一种伪协议，允许Blob和File对象用作图像，下载二进制数据链接等的URL源。在浏览器中，我们使用`URL.createObjectURL`方法来创建Blob URL,该方法接收一个Blob对象，并为其创建一个唯一的的URL，形式为`blob:<origin>/<uuid>`

浏览器内部为每个通过`URL.createObjectURL`生成的URL存储了一个URL -> Blob映射，因此，此类URL较短，但可以访问blob。生成的url只有在当前文档打开的状态下才有效。它允许引用`img,a`标签中的blob，但如果你访问的Blob URL不存在，浏览器会报404错误

上述的Blob URL 看似不错，但实际上有副作用，虽然存储了URL -> Blob的映射，但blob本身仍驻留在内存中，浏览器无法释放它。映射在文档卸载时清除，因此blob内存此时才释放

但如果应用程序生命周期很长，我们可以调用`URL.revokeObjectURL(url)`方法，从内部映射中删除引用，从而删除blob,释放了缓存

### Blob 转换为 Base64
代替`URL.createObjectURL`的替代方法是，将blob转换为base64编码的字符串。base64是一种基于64个可打印字符来表示二进制数据的表示方法

绝大多数浏览器都支持一种名为`Data URLs`的特性，允许使用base64对图片或者其他文件的二进制数据进行编码，将其作为文本字符串嵌入网页中。


但需要注意的是：如果图片较大，图片的色彩层次比较丰富，则不适合使用这种方式，因为该图片经过 base64 编码后的字符串非常大，会明显增大 HTML 页面的大小，从而影响加载速度。除此之外，利用 FileReader API，我们也可以方便的实现图片本地预览功能

> [blob](https://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==&mid=2651559280&idx=1&sn=bc71c7e518169fc315575b2c3ec22060&chksm=802542b1b752cba7e4cc6adbd9d8d9537e946df4f45c03f693197bb9c686aabb3bf228df9d9c&mpshare=1&scene=1&srcid=0828J1jscJH1O6s1KQ7BR8dO&sharer_sharetime=1598624260086&sharer_shareid=8c794445c738f5fb7a84aa99cb3a295e&key=e898af26a858d804d0b88c20cbbdc7c2e03a25451182a625084b39aa8e653b34bd649c5cff4962eeecd2d273a99c802b1b1b3e4cc6b08df51bc6445f67613b59ac118a4ef4c7cd57ea6ad4dfcf5ac1b294958b26e7f61d63d960ba637ca7fa70138501a7b854c328343987079155b0d660f1ece20d037af25f1facdefb2a26e7&ascene=1&uin=MTY0NTAyNjcyMw%3D%3D&devicetype=Windows+10+x64&version=62090538&lang=zh_CN&exportkey=AYuTBIAdrMh63zzdyBiPdZk%3D&pass_ticket=y8Azt6v0Nrwj7A2EktMD9nv9g51GIQeFr1XWlVMh%2F6%2BgNcJy97xJbD%2BlZhqqbdR0)