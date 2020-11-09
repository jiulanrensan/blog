# 深入CommonJS && ES6Module
[参考文章](https://segmentfault.com/a/1190000017878394)

目前主流的模块化规范
* UMD
* CommonJS
* es6 Module

## umd 模块（通用模块）
```
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.libName = factory());
}(this, (function () { 'use strict';})));
```
如果你在js文件头部看到这样的代码，那么这个文件使用的就是 UMD 规范

实际上就是 amd + commonjs + 全局变量 这三种风格的结合

这段代码就是对当前运行环境的判断，如果是 Node 环境 就是使用 CommonJs 规范， 如果不是就判断是否为 AMD 环境， 最后导出全局变量

有了 UMD 后我们的代码和同时运行在 Node 和 浏览器上

所以现在前端大多数的库最后打包都使用的是 UMD 规范

## CommonJs
Nodejs 环境所使用的模块系统就是基于CommonJs规范实现的，我们现在所说的CommonJs规范也大多是指Node的模块系统

### 循环引用
```
// a.js
module.exports.a = 1
var b = require('./b')
console.log(b)
module.exports.a = 2

// b.js
module.exports.b = 11
var a = require('./a')
console.log(a)
module.exports.b = 22

//main.js
var a = require('./a')
console.log(a)
```
1. 执行 node main.js -> 第一行 require(a.js)，（node 执行也可以理解为调用了require方法，我们省略require(main.js)内容）
2. 进入 require(a)方法： 判断缓存（无） -> 初始化一个 module -> 将 module 加入缓存 -> 执行模块 a.js 内容，（需要注意 是先加入缓存， 后执行模块内容）
3. a.js： 第一行导出 a = 1 -> 第二行 require(b.js)（a 只执行了第一行）
4. 进入 require(b) 内 同 1 -> 执行模块 b.js 内容
5. b.js： 第一行 b = 11 -> 第二行 require(a.js)
6. require(a) 此时 a.js 是第二次调用 require -> 判断缓存（有）-> cachedModule.exports -> 回到 b.js（因为js对象引用问题 此时的 cachedModule.exports = { a: 1 }）
7. b.js：第三行 输出 { a: 1 } -> 第四行 修改 b = 22 -> 执行完毕回到 a.js
8. a.js：第二行 require 完毕 获取到 b -> 第三行 输出 { b: 22 } -> 第四行 导出 a = 2 -> 执行完毕回到 main.js
9. main.js：获取 a -> 第二行 输出 { a: 2 } -> 执行完毕

## es6 Module
使用 import 被导入的变量是只读的，可以理解默认为 const 装饰，无法被赋值

使用 import 被导入的变量是与原变量绑定/引用的，可以理解为 import 导入的变量无论是否为基本类型都是引用传递

```
// es6 module 中基本类型也按引用传递
// foo.js
export let a = 1
export function count(){
  a++
}

// main.js
import { a, count } from './foo'
console.log(a) //1
count()
console.log(a) //2
```
```
// foo.js
// 改动下export
// export default 让 a 无法动态绑定
let a = 1;
export function count(){
  a++
}
export default a 

// main.js
import {count} from './foo.js'
import a from './foo.js'
console.log(a) //1
count()
console.log(a) //1
```
```
// 可以用另一种方式实现 default 的动态绑定
// foo.js
let a = 1;
export { a as default }
export function count(){
  a++
}

// main.js
import { a, count } from './foo'
console.log(a) //1
count()
console.log(a) //2
```
### 循环引用
```
// bar.js
import { foo } from './foo'
console.log(foo);
export let bar = 'bar'

// foo.js
import { bar } from './bar'
console.log(bar);
export let foo = 'foo'

// main.js
import { bar } from './bar'
console.log(bar)
```

1. 执行 main.js -> 导入 bar.js
2. bar.js -> 导入 foo.js
3. foo.js -> 导入 bar.js -> bar.js 已经执行过直接返回 -> 输出 bar -> foo.js:7 Uncaught ReferenceError: Cannot access 'bar' before initialization


可以用function方式解决，因为函数声明会提示到文件顶部
```
// bar.js
import { foo } from './foo'
console.log(foo());
export function bar(){
  return 'bar'
}

// foo.js
import { bar } from './bar'
console.log(bar());
export function foo(){
  return 'foo'
}

// main.js
import { bar } from './bar'
console.log(bar)
```

## 区别
* CommonJs导出的是变量的一份拷贝，ES6 Module导出的是变量的绑定（export default 是特殊的）
* CommonJs是单个值导出，ES6 Module可以导出多个
* CommonJs是动态语法可以写在判断里，ES6 Module静态语法只能写在顶层
* CommonJs的 this 是当前模块，ES6 Module的 this 是 undefined