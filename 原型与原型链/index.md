# 原型与原型链
[参考文章](https://github.com/mqyqingfeng/Blog/issues/2)
## prototype
每个函数都有自己的prototype属性
```
function Person() {

}
Person.prototype.name = 'Kevin';
var person1 = new Person();
var person2 = new Person();
console.log(person1.name) // Kevin
console.log(person2.name) // Kevin
```
函数的 prototype 属性指向了一个对象，这个对象正是调用该构造函数而创建的实例的原型，也就是这个例子中的 person1 和 person2 的原型

那什么是原型呢？你可以这样理解：每一个JavaScript对象(null除外)在创建的时候就会与之关联另一个对象，这个对象就是我们所说的原型，每一个对象都会从原型"继承"属性

## __proto__
这是每一个JavaScript对象(除了 null )都具有的一个属性，叫__proto__，这个属性会指向该对象的原型，即用来表示实例与实例原型的关系

Person        prototype         Person.prototype
(构造函数)  ---------------->       (实例原型)
    |                                   ^
    |                                   |
    |                                   |
    v               __proto__           |
  person  -------------------------------
  (实例)

## constructor
表示原型与构造函数的关系，每一个原型都有一个constructor属性指向关联的构造函数
```
function Person() {

}
console.log(Person === Person.prototype.constructor); // true
```
Person        prototype         Person.prototype
(构造函数)  ---------------->       (实例原型)
            <---------------
               constructor
    |                                   ^
    |                                   |
    |                                   |
    v               __proto__           |
  person  -------------------------------
  (实例)


## 原型的原型
原型也是一个对象，其实原型对象就是通过 Object 构造函数生成的，所以
Person        prototype         Person.prototype
(构造函数)  ---------------->       (实例原型)
            <---------------
               constructor
    |                                   ^ |
    |                                   | |
    |                                   | |   __proto__
    v               __proto__           | |
  person  ------------------------------- |
  (实例)                                  v
                  prototype
    Object    ---------------->     Object.prototype
              <----------------      (实例原型的原型)
                    constructor           |
                                          |
                                          |
                                          V
                                         null

Object.prototype.__proto__ 指向null
所以这也构成原型链  person.__proto__ -> Person.prototype,Person.prototype.__proto__ -> Object.prototype, Object.prototype.__proto__ -> null

## [`Function`与`Object`的关系](https://juejin.im/post/6844903630357659655)
javascript有5种基础的内建对象(Fundamental Objects)，Object、Function、Error、Symbol、Boolean，而Object/Function尤为特殊，是定义其他内建对象或者普通对象和方法的基础。

> 函数和对象都有__proto__属性，指向构造函数的prototype属性所指向的对象，即它的原型对象

结论：
Function的原型链为 Function -> Function.prototype -> Object.prototype -> null 

Object的原型链为 Object -> Function.prototype -> Object.prototype -> null

这张图就很清晰地表示了上面的关系
![原型链示意图](https://user-gold-cdn.xitu.io/2018/6/30/164512d8486643e6?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

搞清楚之后，再有以下结论

1. js中的对象都是继承于Object.prototype
2. js中的函数对象都是继承于Function.prototype
```
var a = {}
a.__proto__ === Object.prototype // true

Number.__proto__ === Function.prototype // true
String.__proto__ === Function.prototype // true
Array.__proto__ === Function.prototype // true
```
复杂一点的
```
Object instanceof Object // true
Object instanceof Function // true
Function instanceof Function // true
Function instanceof Object // true

const o = {}
o instanceof Object //true
o instanceof Function // false

function F () {}
F instanceof Object //true
F instanceof Function //true

```