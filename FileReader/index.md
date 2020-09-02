## FileReader
### 定义
允许Web应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 File 或 Blob 对象指定要读取的文件或数据。

其中File对象可以是来自用户在一个`<input>`元素上选择文件后返回的FileList对象,也可以来自拖放操作生成的 DataTransfer对象,还可以是来自在一个HTMLCanvasElement上执行mozGetAsFile()方法后返回结果

### 构造函数`FileReader()`
```
function printFile(file) {
  var reader = new FileReader();
  reader.onload = function(evt) {
    console.log(evt.target.result);
  };
  reader.readAsText(file);
}
```
### 属性
* FileReader.error 
* FileReader.readyState
* FileReader.result 

### [事件处理](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader)
* FileReader.onabort
* FileReader.onerror
* FileReader.onload
* FileReader.onloadstart
* FileReader.onloadend
* FileReader.onprogress

### 方法
* `FileReader.abort()`: 中止读取操作。在返回时，readyState属性为DONE
* `FileReader.readAsArrayBuffer()`: 读取指定blob中内容，一旦完成，result属性中保存的将是被读取文件的arrayBuffer数据对象
* `FileReader.readAsBinaryString()`: 读取指定blob中内容，~~，~~中将包含所读取文件的原始二进制数据
* `FileReader.readAsDataURL()`: 读取指定blob中内容，~~，~~将包含一个data: URL格式的base64字符串表示所读取的文件内容（预览图片）
* `FileReader.readAsText()`: 读取指定blob中内容,~~,~~包含一个字符串以表示~~

### 例子
#### 拖拽选择文件
```
// 创建一个drop区域,绑定事件
let dropbox;

dropbox = document.getElementById("dropbox");
dropbox.addEventListener("dragenter", dragenter, false);
dropbox.addEventListener("dragover", dragover, false);
dropbox.addEventListener("drop", drop, false);

// 我们其实并不需要对dragenter and dragover 事件进行处理，所以这些函数都很简单。他们只需要包括禁止事件传播和阻止默认事件
function dragenter(e) {
  e.stopPropagation();
  e.preventDefault();
}

function dragover(e) {
  e.stopPropagation();
  e.preventDefault();
}

function drop(e) {
  e.stopPropagation();
  e.preventDefault();

  var dt = e.dataTransfer;
  var files = dt.files;

  handleFiles(files);
}
```
#### 显示选择的图片的缩略图
```
function handleFiles(files) {
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    // 看每个文件的type属性是不是image（通过正则表达式来匹配MIME类型字符串模式"image/*"）
    var imageType = /^image\//;
    
    if (!imageType.test(file.type)) {
      continue;
    }
    
    var img = document.createElement("img");
    img.classList.add("obj");
    img.file = file;
    preview.appendChild(img); // 假设"preview"就是用来显示内容的div
    
    var reader = new FileReader();
    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
    // 读取文件内容作为dataURL，并在读取完成之后赋值给img.src
    reader.readAsDataURL(file);
  }
}
```


### 参考文章
* [FileReader](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader)
* [使用](https://developer.mozilla.org/zh-CN/docs/Web/API/File/Using_files_from_web_applications)