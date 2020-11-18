# 深拷贝
[参考](https://juejin.im/post/6844903929705136141)

## JSON.parse
最简单的情况就是用JSON.parse
```
const B = JSON.parse(JSON.stringify(A))
```
但如果有不支持的值，就无法转换
* 不支持函数
* 不支持undefined（支持null），会把undefined丢失
* 不支持循环引用，比如 a = {name: 'a'}; a.self = a; a2 = JSON.parse(JSON.stringify(a))
* 不支持Date，会变成 ISO8601 格式的字符串
* 不支持正则表达式，会变成空对象
* 不支持Symbol
* 不支持Error，会变成空对象
* 有NaN、Infinity和-Infinity，则序列化的结果会变成null