// 手写代码实现bind
/**
 * mdn
 * bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，
 * 而其余参数将作为新函数的参数，供调用时使用
 */


Function.prototype.bind1 = function (obj, ...args) {
  const fn = this
  return function () {
    return fn.apply(obj, ...args)
  }
}


// test
const obj = {
  x: 42,
  getX: function() {
    return this.x;
  }
}
const unboundGetX = obj.getX;
console.log('unboundGetX',unboundGetX())

const boundGetX  = unboundGetX.bind1(obj)
console.log('boundGetX', boundGetX());