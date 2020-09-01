## data URLs
### 定义
即前缀为 data: 协议的URL，其允许内容创建者向文档中嵌入小文件

在 Web 项目开发过程中，为了减少 HTTP 请求的数量，对应一些较小的图标，我们通常会考虑使用 Data URL 的形式内嵌到 HTML 或 CSS 文件中

在 Data URL 中，数据是很重要的一部分，它可以使用 base64 编码的字符串来表示

Data URLs由四个部分组成：
* 前缀 `data:`
* 代表数据类型的MIME类型
* 如果非文本则为可选的 base64 标记
* 数据本身

`data:[<mediatype>][;base64],<data>`

mediatype 是个 MIME 类型的字符串, 例如`image/jpeg`表示jpeg图像文件。

如果被省略，则默认值为 `text/plain;charset=US-ASCII`。

如果数据是文本类型，你可以直接将文本嵌入 (根据文档类型，使用合适的实体字符或转义字符)

如果是二进制数据，你可以将数据进行 base64 编码之后再进行嵌入。比如嵌入一张图片：`<img alt="logo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...">`

```
data:,Hello%2C%20World!
```
简单的 text/plain 类型数据

```
data:text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D
```
上一条示例的 base64 编码版本


