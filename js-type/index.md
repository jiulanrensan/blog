## 判断js类型
[参考文章](https://segmentfault.com/a/1190000015264821)
### typeof 
typeof 缺点是对于null,arr,obj得到结果都是object

### instanceoof
instanceof不能区别undefined和null，而且对于基本类型如果不是用new声明的则也测试不出来，
对于是使用new声明的类型，它还可以检测出多层继承关系

### constructor
constructor不能判断undefined和null，并且使用它是不安全的，因为contructor的指向是可以改变的

### Object.prototype.toString.call
在任何值上调用 Object 原生的 toString() 方法，都会返回一个 [object NativeConstructorName] 格式的字符串
