// call() 方法在使用一个指定的 this 值和若干个指定的参数值的前提下调用某个函数或方法
// 简言之，就是改变了this指向并执行

// es6版
// ...为es6语法
Function.prototype.call1 = function (obj, ...args) {
  // console.log(this);  // [Function: bar]
  // console.log(obj);  // { value: 1 }
  // bar方法的this指向改为foo，即foo.bar()，也就是把bar作为属性添加到foo对象里
  obj.fn = this
  obj.fn(...args)
  // 执行之后应该删除obj的fn属性
  delete obj.fn
}

// es5语法
Function.prototype.call2 = function(obj) {
  obj.fn = this
  // var args = arguments.slice(1) arguments.slice is not a function
  // arguments是类数组对象，并没有继承Function.prototype，但是有迭代器
  var args = []
  for (var i = 1; i < arguments.length; i++) {
    args.push(arguments[i])
  }
  // eval() 函数会将传入的字符串当做 JavaScript 代码进行执行
  eval('obj.fn(' + args.toString() + ')')
  delete obj.fn
}

// 最后的优化
// 1. call第一个参数可以传null，此时this指向window
// 2. 调用的函数有返回值，需返回
Function.prototype.call3 = function (obj) {
  if (!obj) obj = window
  obj.fn = this
  var args = []
  for (var i = 1; i < arguments.length; i++) {
    args.push(arguments[i])
  }
  var returnVal = eval('obj.fn(' + args.toString() + ')')
  delete obj.fn
  return returnVal
}


// test
var foo = {
  value: 1
};

function bar(...args) {
  console.log(this.value);
  console.log('args', ...args);
  return this.value
}

// bar.call1(foo, 1,2,3)
const returnVal = bar.call3(foo, 1,2,3)
console.log('returnVal', returnVal);