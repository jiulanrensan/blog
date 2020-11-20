// test4-2
// 改为同步请求
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
  console.log('then fn in', result);
})