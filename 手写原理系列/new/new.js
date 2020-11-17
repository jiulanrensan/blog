// new
// 其实就是返回一个新的对象，新对象可以访问被new的构造函数的属性和原型链
function simulateNew (original, ...args) {
  var obj = new Object()
  // 把构造函数的原型链赋值给新的实例对象
  obj.__proto__ = original.prototype
  // 改变this指向
  // 如果构造函数是有返回值且返回值为对象,则这个返回值就会赋值给new操作后的新变量
  var returnVal = original.apply(obj, [...args])
  return typeof returnVal === 'object' ? obj: returnVal
}


// test
function Otaku (name, age) {
  this.name = name;
  this.age = age;

  this.habit = 'Games';
  return '2324'
  // return {
  //   name: '234',
  //   age: '2'
  // }
}
Otaku.prototype.strength = 60;
Otaku.prototype.sayYourName = function () {
    console.log('I am ' + this.name);
}

var person = new Otaku('Kevin', '18');
// var person = simulateNew(Otaku, 'Kevin', '18')
console.log(person);
console.log(person.name) // Kevin
console.log(person.habit) // Games
console.log(person.strength) // 60

person.sayYourName(); // I am Kevin