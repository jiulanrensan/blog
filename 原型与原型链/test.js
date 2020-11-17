function Person() {
}
Person.prototype.name = 'Kevin';

function Person1 () {}

function middle () {}
middle.prototype = Person.prototype

var person1 = new Person1()

Person1.prototype = new middle()

// Person1.prototype.name = '1234'

var person = new Person()

var person1 = new Person1()

console.log(person1.__proto__ instanceof Person);

console.log(person.name);
console.log(person1.name);
// console.log(Person1.prototype.__proto__ === middle.prototype); // true

