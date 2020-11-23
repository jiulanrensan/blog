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
 * 3.4 fn形参是个函数，这个函数的参数是this._resolve.bind(this),此处this指向第二个Promise
 * 3.5 执行fn函数，因为传入时是个箭头函数，this已经绑定到外层，就是第一个类，
 * 疑问： 如果是function () {} this指向是undefined
 * 如果不能用箭头函数，可以用一个that变量存储this, that._handle...
 * 
 * 3.6 执行this._handle, 形参callback 为 {
        onFulfilled: onFulfilled || null,
        resolve: resolve
      }
 * 3.7 再重复一遍，此时this指向第一个promise！此时第一个promise的state为pending
 * 3.8 所以把callback（3.6）回调推入callbacks数组，return实例化的Promise
 * 4.1 第一个then执行完毕，开始执行后面的即第二个then，这个then是3.6实例化的promise即第二个promise调用的
 * 4.2.1 then传入参数，同2.6.1
 * 4.2.2 同2.6.2
 * 4.2.3 同2.6.3
 * 5. new Promise 第三次实例化Promise
 * 5.1 同3.1
 * 5.2 同3.2，newIdx自增，当前类newIdx属性为3
 * 5.3 同3.3
 * 5.4 同3.4，此时fn的参数 this._resolve.bind(this), this指向第三个Promise
 * 5.5 同3.5，执行fn即this._handle，此处this指向第二个promise
 * 5.6 同3.6
 * 5.7 同3.7，state=pending，把callback推入callbacks，return实例化的Promise
 * 6. 已经没有then在链式调用了。此时等待异步回调。
 * 6.1 异步函数执行完成，开始回调。2.5.1的setTimeout执行回调，执行callback
 * 6.2 callback是2.3的function (result) {resolve(result);}
 * 6.3 就是执行resolve(result)，result为'getUserId异步请求耗时100s'
 * 6.4 这里的resolve是fn(this._resolve.bind(this))的fn的参数this._resolve.bind(this)
 * 6.5 执行_resolve，这里的this绑定了定义时的this，即第一个promise
 * 6.6 this.state = 'fulfilled';this.value = 'getUserId异步请求耗时100s';遍历执行callback里的回调
 * 6.7 此处this.callbacks.forEach(fn => {this._handle(fn)})的this._handle，因为是箭头函数，直接绑定外层this，就是第一个promise
 * 6.8 6.7的fn为{onFulfilled: onFulfilled || null,resolve: resolve}，
 * 执行_handle，执行onFulfilled(this.value)即执行then函数时传入的result => {console.log('then fn in 1', result);}
 * result 为 this.value，没有返回值，ret为undefined
 * 6.9 callback.resolve(ret)，此处resolve为new第二个Promise时，fn(this._resolve.bind(this))里的参数 this._resolve.bind(this)
 * 此处的this指向第二个Promise
 * 7. 执行第二个Promise的this._resolve，同6.6，但此时的_resolve(value) value为undefined
 * 7.1 把callbacks的回调递归执行，同6.8
 * 7.2 onFulfilled为第二个then函数时传入的result => {console.log('then fn in 2', result);}
 * result -> value -> undefined
 * 7.3 callback.resolve(ret),同6.9,此处resolve为new第三个Promise时，fn(this._resolve.bind(this))里的参数 this._resolve.bind(this)
 * 8. 进入到第三个promise,执行this._resolve(value),value为undefined
 * 8.1 this.state = 'fulfilled';this.value = undefined;
 * 8.2 callbacks数组为空，没有要回调的函数
 * 
 * 异步回调，链式调用then完成
 * 可以看到
 * 1. 等待异步回调时，then作用是注册回调函数
 * 2. _handle通过判断状态，决定注册函数还是执行函数，如果是执行函数，到最后一步
 * callback.resolve，调用下一个promise的方法，起到一个引起下文的作用
 */