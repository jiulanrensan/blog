// test4-3
// 改为同步请求多次链式调用then
const { Promise4 } = require('./promise')
const mockAjax = (url, callback) => {
  callback(url + '同步请求');
  // setTimeout(() => {
  //   console.log('setTimeout in');
  //     callback(url + '异步请求耗时' + s + '秒');
  // }, 100 * s)
}
new Promise4(resolve => {
  mockAjax('getUserId', function (result) {
    resolve(result);
  })
}).then(result => {
  console.log('then fn in 1', result);
}).then(result => {
  console.log('then fn in 2', result);
})

/**
 * debug
 * 同步请求执行顺序
 * 
 * 1. new Promise 第一次实例化Promise,参数为resolve => {
      mockAjax('getUserId', 1, function (result) {
        resolve(result);
      })
    }
 * 1.1. 执行constructor(fn)，执行 fn(this._resolve.bind(this)),fn为1的参数
 * 1.2 resolve参数为this._resolve.bind(this)，执行mockAjax
 * 1.3 mockAjax没有异步，立即执行，并回调执行resolve(result)，result为'..同步请求..'
 * 1.4 执行this._resolve.bind(this)
 * 1.5 this.state = 'fulfilled';this.value = value;this.callbacks为空，不执行
 * 2. 然后此时才接着链式调用then函数，执行then(result => {console.log('then fn in', result);})
 * 2.1 then(onFulfilled),onFulfilled为2的参数
 * 3. 第二次实例化 Promise,参数为(resolve) => {
          this._handle({
            onFulfilled: onFulfilled || null,
            resolve: resolve
          })
        }
 * 3.1 执行constructor(fn)，执行 fn(this._resolve.bind(this)),fn为3的参数
 * 3.2 执行this._handle(callback)，参数为 {onFulfilled: onFulfilled || null,resolve: resolve} ，此处this指向第一个Promise，
 * 3.3 第一个Promise state已经变为Fulfilled,执行callback.onFulfilled(this.value),onFulfilled为2的参数，console.log('then fn in', result);
 * 3.4 没有返回值，ret 为 undefined
 * 3.5 执行callback.resolve(ret)，resolve为3.1 的 this._resolve.bind(this)，此处this为第二个Promise
 * 4. 执行this._resolve(value) value为undefined
 * 4.1 this.state = 'fulfilled';this.value = value;this.callbacks为空，不执行
 * 5. 接着链式调用第二个then，执行执行then(result => {console.log('then fn in 2', result);})
 * 5.1 执行then(onFulfilled),onFulfilled为5的参数
 * 6. 第三次实例化promise,参数同3
 * 6.1 执行constructor(fn)，执行 fn(this._resolve.bind(this)),fn为6的参数
 * 6.2 执行this._handle(callback)，参数为 {onFulfilled: onFulfilled || null,resolve: resolve} ，此处this指向第二个Promise
 * 6.3 第二个Promise的state已经变为Fulfulled，执行callback.onFulfilled(this.value)，onFulfilled为5的参数，console.log('then fn in 2', result) result为undefined
 * 6.4 没有返回值，ret 为 undefined
 * 6.5 执行callback.resolve(ret), resolve为6.1 的 this._resolve.bind(this)，此处this为第三个Promise
 * 7. 执行this._resolve(value) value为undefined
 * 7.1 this.state = 'fulfilled';this.value = value;this.callbacks为空，不执行
 * 
 * 执行完毕
 */