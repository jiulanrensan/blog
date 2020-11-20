// test.4
// 上面Promise存在一个问题，如果传入的函数不是异步执行的，即resolve先于then执行，
// 那onFulfilled还没注册，所以callbacks里面就没有函数，即then不会执行
const { Promise2 } = require('./promise')
let p = new Promise2(resolve => {
  console.log('done');
  resolve('5秒');
}).then(tip => {
  console.log('then1', tip);
}).then(tip => {
  console.log('then2', tip);
});

// 此处延时调用then，即resolve已经执行了，则调用then注册的onFulfilled就没法执行了

setTimeout(() => {
  p.then(tip => {
      console.log('then3', tip);
  })
});