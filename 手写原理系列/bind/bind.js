// 手写代码实现bind
/**
 * mdn
 * bind() 方法创建一个新的函数，在 bind() 被调用时，
 * 这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用
 */
// 简言之，和call,apply不同的是bind返回一个函数

// es6
Function.prototype.bind1 = function (obj, ...args1) {
  const fn = this
  // 生成函数之后的赋值
  return function (...args2) {
    // 有可能有返回值，所以此处再return
    return fn.apply(obj, ...args1, ...args2)
  }
}

// es5
Function.prototype.bind2 = function (obj) {
  var fn = this
  var args1 = Array.prototype.slice.call(arguments, 1)
  
  return function () {
    var args2 = args1.concat(Array.prototype.slice.call(arguments))
    return fn.apply(obj, args2)
  }
}

// bind能作为构造函数使用的绑定函数
// 一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。
// 提供的 this 值被忽略，同时调用时的参数被提供给模拟函数
Function.prototype.bind3 = function (obj) {
  
}

// test
const obj = {
  x: 42,
  getX: function(...args) {
    console.log('args', ...args);
    return this.x;
  }
}
const unboundGetX = obj.getX;
const boundGetX  = unboundGetX.bind2(obj, 1,2,3)
console.log('boundGetX', boundGetX());