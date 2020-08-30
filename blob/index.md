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

> [blob](https://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==&mid=2651559280&idx=1&sn=bc71c7e518169fc315575b2c3ec22060&chksm=802542b1b752cba7e4cc6adbd9d8d9537e946df4f45c03f693197bb9c686aabb3bf228df9d9c&mpshare=1&scene=1&srcid=0828J1jscJH1O6s1KQ7BR8dO&sharer_sharetime=1598624260086&sharer_shareid=8c794445c738f5fb7a84aa99cb3a295e&key=e898af26a858d804d0b88c20cbbdc7c2e03a25451182a625084b39aa8e653b34bd649c5cff4962eeecd2d273a99c802b1b1b3e4cc6b08df51bc6445f67613b59ac118a4ef4c7cd57ea6ad4dfcf5ac1b294958b26e7f61d63d960ba637ca7fa70138501a7b854c328343987079155b0d660f1ece20d037af25f1facdefb2a26e7&ascene=1&uin=MTY0NTAyNjcyMw%3D%3D&devicetype=Windows+10+x64&version=62090538&lang=zh_CN&exportkey=AYuTBIAdrMh63zzdyBiPdZk%3D&pass_ticket=y8Azt6v0Nrwj7A2EktMD9nv9g51GIQeFr1XWlVMh%2F6%2BgNcJy97xJbD%2BlZhqqbdR0)