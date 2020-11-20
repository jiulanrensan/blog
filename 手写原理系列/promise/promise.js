// 1. 实现一个简易版的promise
/**
 * 1. 调用 then 方法，将想要在 Promise 异步操作成功时执行的 onFulfilled 放入callbacks队列，
 * 其实也就是注册回调函数，可以向观察者模式方向思考
 * 2. 创建 Promise 实例时传入的函数会被赋予一个函数类型的参数，即 resolve，
 * 它接收一个参数 value，代表异步操作返回的结果，当异步操作执行成功后，会调用resolve方法，
 * 这时候其实真正执行的操作是将 callbacks 队列中的回调一一执行
 */
const Promise1 = class Promise1 {
  // 放置回调函数的数组
  callbacks = []
  constructor (fn) {
    /**
     * fn即传入的函数
     * resolve => {
          setTimeout(() => {
            console.log('done');
            resolve('5秒');
          }, 100);
        }
        fn() 立即执行
        resolve为参数，需要做的是重新绑定this指向，因为在传入的函数内执行时，this指向发生了变化，所以用bind生成新的函数
     */
    fn(this._resolve.bind(this))
  }
  then(onFulfilled){
    this.callbacks.push(onFulfilled)
    // 链式调用
    return this
  }
  _resolve(value) {
    this.callbacks.forEach(fn => fn(value))
  }
}
const Promise2 = class Promise2 {
  // 放置回调函数的数组
  callbacks = []
  constructor (fn) {
    fn(this._resolve.bind(this))
  }
  then(onFulfilled){
    this.callbacks.push(onFulfilled)
    // 链式调用
    return this
  }
  _resolve(value) {
    // this.callbacks.forEach(fn => fn(value)) 
    // 延时执行，解决test.4的问题
    setTimeout(() => {
      this.callbacks.forEach(fn => fn(value)) 
    });
  }
}

// 所以需要增加状态机制，并保存resolve值
// promise执行中状态为 pending,执行完成：pending -> fullfilled / pending -> rejected
const Promise3 = class Promise3 {
  // 放置回调函数的数组
  callbacks = []
  // 状态
  state = 'pending'
  // 保存结果
  value = null
  constructor (fn) {
    fn(this._resolve.bind(this))
  }
  then(onFulfilled){
    if (this.state === 'pending') {
      // 表示resolve还没执行，则添加回调到callbacks
      this.callbacks.push(onFulfilled)
    } else {
      // resolve执行完成，则直接执行then传进来的函数
      onFulfilled(this.value)
    }
    // 链式调用
    return this
  }
  _resolve(value) {
    // 改变状态
    this.state = 'fulfilled'
    // 把resolve的值放在类变量中，使得then可以获取
    this.value = value
    this.callbacks.forEach(fn => fn(value)) 
  }
}

// 通过增加状态判断，可以解决以下问题
// 如果resolve先执行时，状态变成了fulfilled，那么再调用then，则可以继续执行then传入的函数

// 链式调用
// 上面的promise多次链式调用then都只是同一个结果，但是实际链式调用中，在then中return，下一个then能够继续执行
// 所以then返回的是个promise实例
// 真正的链式 Promise 是指在当前 Promise 达到 fulfilled 状态后，即开始进行下一个 Promise
let newIdx = 0
const Promise4 = class Promise4 {
  callbacks = []
  state = 'pending'
  value = null
  constructor (fn) {
    newIdx++
    this.newIdx = newIdx
    console.log('newIdx', this.newIdx);
    fn(this._resolve.bind(this))
  }
  then(onFulfilled){
    return new Promise4(resolve => {
      this._handle({
        onFulfilled: onFulfilled || null,
        resolve: resolve
      })
    })
  }
  _resolve(value) {
    this.state = 'fulfilled'
    this.value = value
    console.log(this.callbacks);
    this.callbacks.forEach(fn => this._handle(fn)) 
  }
  _handle (callback) {
    if (this.state === 'pending') {
      this.callbacks.push(callback)
      console.log(this.callbacks);
      return
    }
    // 此时已经不是pending状态
    // 如果then没有onFulfilled函数作为参数，则使用resolve
    if (!callback.onFulfilled) {
      callback.resolve(this.value)
      return
    }
    const ret = callback.onFulfilled(this.value)
    console.log('ret',ret);
    callback.resolve(ret)

  }
}

module.exports = {
  Promise1,
  Promise2,
  Promise3,
  Promise4
}