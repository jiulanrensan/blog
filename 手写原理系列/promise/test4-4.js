// test4-4
const { Promise4 } = require('./promise')
// 异步回调，调用多个then
const mockAjax = (url, s, callback) => {
  setTimeout(() => {
      callback(url + '异步请求耗时' + s + '秒');
  }, 100 * s)
}
new Promise4(resolve => {
  mockAjax('getUserId', 1, function (result) {
    resolve(result);
  })
}).then(result => {
  console.log('then fn in 1', result);
}).then(result => {
  console.log('then fn in 2', result);
})


/**
 * debug 执行顺序
 * 1. const mockAjax定义函数，但此时函数未执行
 * 
 * 2. new Promise 第一次实例化Promise类
 * 2.1 初始化callbacks,state,value
 * 2.2 进入constructor(fn)，newIdx自增一次，当前类newIdx属性为1（以这个属性区分类）
 * 2.3 执行传入的fn参数，fn参数是一个函数，即
 * resolve => {
      mockAjax('getUserId', 1, function (result) {
        resolve(result);
      })
    }
 * 2.4 resolve 为 this._resolve.bind(this) 绑定this到当前类，可以看出，这个resolve也是个函数
 * 2.5 执行 mockAjax 函数，进入函数体
 * 2.5.1 
 * (url, s, callback) => {
      setTimeout(() => {
          callback(url + '异步请求耗时' + s + '秒');
      }, 100 * s)
    }
    callback 为 function (result) {resolve(result);}
 * 2.5.2 mockAjax 函数里需要异步执行，所以此处等待异步回调
 * 2.6 新建的Promise实例有调用then，所以执行then
 * 2.6.1 then传入参数 result => {console.log('then fn in 1', result);}，也是个函数
 * 2.6.2 类里的定义，then的形参为onFulfilled，也就是2.6.1的函数
 * 2.6.3 then会返回一个新的实例Promise
 * 3. new Promise 第二次实例化Promise类
 * 3.1 初始化callbacks,state,value
 * 3.2 进入constructor(fn)，newIdx自增一次，当前类newIdx属性为2
 * 3.3 执行传入的fn参数，即2.6.3 then新建Promise实例时传的参数
 * resolve => {
      this._handle({
        onFulfilled: onFulfilled || null,
        resolve: resolve
      })
    }
 * 是个函数，执行函数，因为传入时是个箭头函数，this已经绑定到外层，就是第一个类，
 * 疑问： 如果是function () {} this指向是undefined，为什么
 * 如果不能用箭头函数，可以用一个that变量存储this, that._handle...
 * 
 */