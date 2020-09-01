## file
### 定义
`File`对象继承于`Blob`,`File`接口提供有关文件的信息，并允许网页中的js访问其内容

`File` 对象是来自用户在一个 `<input>` 元素上选择文件后返回的 `FileList` 对象,也可以是来自由拖放操作生成的 `DataTransfer` 对象，或者来自 `HTMLCanvasElement` 上的 `mozGetAsFile() API`

### 构造函数
```
var myFile = new File(bits, name[, options]);

// example
var file = new File(["foo"], "foo.txt", {
  type: "text/plain",
});
```
* bits: 一个包含ArrayBuffer，ArrayBufferView，Blob，或者 DOMString 对象的 Array — 或者任何这些对象的组合。这是 UTF-8 编码的文件内容
* name: USVString，表示文件名称，或者文件路径
* options(可选): 
  * tpye: DOMString，表示将要放到文件中的内容的 MIME 类型。默认值为 ""
  * lastModified: 数值，表示文件最后修改时间的 Unix 时间戳（毫秒）。默认值为 Date.now()

### 属性
`File`接口继承了`Blob`接口属性

* lastModified: 最后修改时间
* name: 文件名字
* size: ~大小
* type: MIME类型

### 方法
继承blob接口的方法
