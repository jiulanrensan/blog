// apply() 方法调用一个具有给定this值的函数，以及以一个数组（或类数组对象）的形式提供的参数
// 其实与call不同的就是传参
Function.prototype.apply1 = function (obj) {
  if (!obj) obj = window
  obj.fn = this
  var args = arguments[1]
  console.log('args',args);
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

const returnVal = bar.apply1(foo, [1,2,3])
console.log('returnVal', returnVal);