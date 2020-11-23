// test4-5
const { Promise5 } = require('./promise')
// 异步回调，调用多个then，第一个then返回异步回调
const mockAjax = (url, s, callback) => {
  setTimeout(() => {
      callback(url + '异步请求耗时' + s + '秒');
  }, 100 * s)
}
const p1 = new Promise5(resolve => {
  mockAjax('getUserId1', 1, function (result) {
    resolve(result);
  })
})
const p2 = new Promise5(resolve => {
  mockAjax('getUserId2', 2, function (result) {
    resolve(result);
  })
})


p1.then(result => {
  console.log('then fn in 1', result);
  return p2
}).then(result => {
  console.log('then fn in 2', result);
})