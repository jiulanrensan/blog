## url
### Object URL
Blob URL / Object URL是一种伪协议，允许Blob和File对象用作图像，下载二进制数据链接等的URL源。在浏览器中，我们使用`URL.createObjectURL`方法来创建Blob URL,该方法接收一个Blob对象，并为其创建一个唯一的的URL，形式为`blob:<origin>/<uuid>`
```
blob:https://example.org/40a5fb5a-d56d-4a33-b4e2-0acf6a8e5f641
```

浏览器内部为每个通过`URL.createObjectURL`生成的URL存储了一个URL -> Blob映射，因此，此类URL较短，但可以访问blob。生成的url只有在当前文档打开的状态下才有效。它允许引用`img,a`标签中的blob，但如果你访问的Blob URL不存在，浏览器会报404错误

上述的Blob URL 看似不错，但实际上有副作用，虽然存储了URL -> Blob的映射，但blob本身仍驻留在内存中，浏览器无法释放它。映射在文档卸载时清除，因此blob内存此时才释放

但如果应用程序生命周期很长，我们可以调用`URL.revokeObjectURL(url)`方法，从内部映射中删除引用，从而删除blob,释放了缓存

### 例子
#### 使用object URL显示图片
```
// html
<input type="file" id="fileElem" multiple accept="image/*" style="display:none" onchange="handleFiles(this.files)">
<a href="#" id="fileSelect">Select some files</a> 
<div id="fileList">
  <p>No files selected!</p>
</div>
```
```
window.URL = window.URL || window.webkitURL;

var fileSelect = document.getElementById("fileSelect"),
    fileElem = document.getElementById("fileElem"),
    fileList = document.getElementById("fileList");

fileSelect.addEventListener("click", function (e) {
  if (fileElem) {
    fileElem.click();
  }
  e.preventDefault(); // prevent navigation to "#"
}, false);

function handleFiles(files) {
  if (!files.length) {
    fileList.innerHTML = "<p>No files selected!</p>";
  } else {
    fileList.innerHTML = "";
    var list = document.createElement("ul");
    fileList.appendChild(list);
    for (var i = 0; i < files.length; i++) {
      var li = document.createElement("li");
      list.appendChild(li);
      
      var img = document.createElement("img");
      // 使用window.URL.createObjectURL()来创建blob URL
      img.src = window.URL.createObjectURL(files[i]);
      img.height = 60;
      img.onload = function() {
        // 设置图片的load事件处理器来释放对象URL，当图片加载完成之后对象URL就不再需要了。
        // 这个可以通过调用window.URL.revokeObjectURL()方法并且传递 img.src中的对象URL字符串来实现
        window.URL.revokeObjectURL(this.src);
      }
      li.appendChild(img);
      var info = document.createElement("span");
      info.innerHTML = files[i].name + ": " + files[i].size + " bytes";
      li.appendChild(info);
    }
  }
}
```

#### 将对象URL用于预览上传的视频
```
const video = document.getElementById('video');
const obj_url = window.URL.createObjectURL(blob);
video.src = obj_url;
video.play()
window.URL.revokeObjectURL(obj_url);
```