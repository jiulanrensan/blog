## 编码解码url
```
encodeURI
encodeURIComponent
decodeURI
decodeURIComponent
```

### Unicode 和 UTF-8 有什么区别
简单来说：

1. Unicode 是「字符集」
2. UTF-8 是「编码规则」

字符集：为每一个「字符」分配一个唯一的 ID（学名为码位 / 码点 / Code Point）

编码规则：将「码位」转换为字节序列的规则（编码/解码 可以理解为 加密/解密 的过程）


### 为什么会有编码
[参考](https://www.ruanyifeng.com/blog/2010/02/url_encoding.html)
因为URL一般只能使用英文字母、数字和某些规定的标点符号，除开这些外，所有字符都必须编码后使用

在浏览器地址栏`www.baidu.com`后输入春节两个字回车，再把地址复制出来，可以看到`https://www.baidu.com/%E6%98%A5%E8%8A%82`

"春"和"节"的utf-8编码分别是"E6 98 A5"和"E8 8A 82"，因此，"%E6%98%A5%E8%8A%82"就是按照顺序，在每个字节前加上%而得到的