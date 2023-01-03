'use strict'


const obj = {};
const array = [];
const method = () => { };

console.log(obj.__proto__.__proto__)
console.log(array.__proto__.__proto__.__proto__)
console.log(method.__proto__.__proto__.__proto__)


function Person() {
  console.log("I'm a good person")
};

Person.prototype.sayHello = () => "hello";

function BadPerson() {
  console.log('getout')
};

BadPerson.prototype = Object.create(Person.prototype);
console.log(BadPerson.prototype.sayHello(), Person.prototype.sayHello());
console.log(Person(), BadPerson())
