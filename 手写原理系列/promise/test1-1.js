// test1-1
const { Promise1 } = require('./promise')
let p = new Promise1(resolve => {
  setTimeout(() => {
    console.log('done');
    resolve('5秒');
  }, 100);
}).then((tip) => {
  console.log(tip);
})