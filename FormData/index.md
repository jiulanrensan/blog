## `FormData`对象
### 定义
提供了一种表示表单数据的键值对 `key/value` 的构造方式，并且可以轻松的将数据通过`XMLHttpRequest.send()` 方法发送出去，本接口和此方法都相当简单直接。如果送出时的编码类型被设为 `"multipart/form-data"`，它会使用和表单一样的格式

### 构造函数`FormData()`
```
var formData = new FormData()
// 添加键/值对到表单里面
formData.append('username','mike')
```

### 方法
[方法](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData)