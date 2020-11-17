// 手写代码实现bind
/**
 * mdn
 * bind() 方法创建一个新的函数，在 bind() 被调用时，
 * 这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用
 */
// 简言之，和call,apply不同的是bind返回一个函数

// es6
Function.prototype.bind1 = function (obj, ...args1) {
  // 调用bind的必须是函数
  if (typeof this !== "function") {
    throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
  }
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
  var fn = this
  var args1 = Array.prototype.slice.call(arguments, 1)
  
  var fnBind = function () {
    var bindArgs = Array.prototype.slice.call(arguments)
    // 如果作为构造函数，使用new操作，使fn指向this即指向生成的实例
    // 则 this instanceof fnBind === true 
    // 如果是普通函数，this指向obj就行
    // console.log('this instanceof fnBind', this instanceof fnBind);
    // console.log(fn.prototype);
    return fn.apply(this instanceof fnBind ? this : obj, args1.concat(bindArgs))
  }
  // 如果是普通函数调用，this是指向调用bind函数的，可以访问到其原型，fnBind.prototype = fn.prototype这一步是多此一举
  // 但如果是构造函数，this指向了生成的实例，就无法访问调用bind的函数的原型了，所以需要赋值
  fnBind.prototype = fn.prototype
  return fnBind
}

// test
// const obj = {
//   x: 42,
//   getX: function(...args) {
//     console.log('args', ...args);
//     return this.x;
//   },
//   getName: function () {
//     return this.name
//   }
// }
// obj.__proto__.name = 'mike'
// // const unboundGetX = obj.getX;
// const unboundGetName = obj.getName;
// // const boundGetX  = unboundGetX.bind3(obj, 1,2,3)
// const boundGetName = unboundGetName.bind3(obj)
// // console.log('boundGetX', boundGetX());
// console.log('boundGetX', boundGetName());

// const newFn = new boundGetName()
// console.log(newFn);


// test2
var value = 2;
var foo = {
  value: 1
};

function bar(name, age) {
  this.habit = 'shopping';
  console.log('this.value', this.value);
  console.log('name',name);
  console.log('age', age);
  console.log('friend', this.friend);
}
// foo.__proto__.friend = 'kebin'
bar.prototype.friend = 'kevin';
var bindFoo = bar.bind3(foo, 'daisy');
// console.log(bindFoo('18'));
var obj = new bindFoo('18');
console.log(obj.habit);
// fnBind.prototype = fn.prototype
// 如果不赋值，访问不到原型
console.log(obj.friend);