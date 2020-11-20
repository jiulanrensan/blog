// test1-2
// 通过then方法，onFulfilled保存在callbacks数组中，如果调用了多次then方法，就会注册多个onFulfilled
const { Promise1 } = require('./promise')
let p = new Promise1(resolve => {
  setTimeout(() => {
      console.log('done');
      resolve('5秒');
  }, 100);
});

p.then(tip => {
  console.log('then1', tip);
});

p.then(tip => {
  console.log('then2', tip);
});