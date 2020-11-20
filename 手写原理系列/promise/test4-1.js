// test4-1
const { Promise4 } = require('./promise')
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
  console.log('then fn in', result);
})