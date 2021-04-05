// 1. 原型链继承
function Parent1() {
  this.name = 'parent1';
  this.play = [1, 2, 3]
}
function Child1() {
  this.type = 'child1';
}
Child1.prototype = new Parent1();
console.log('原型链继承')
console.log(new Child1());
// 缺点：属性共享
function Parent2() {
  this.name = 'parent2';
  this.play = [1, 2, 3]
}
function Child2() {
  this.type = 'child2';
}
Child2.prototype = new Parent1()
var s1 = new Child2();
var s2 = new Child2();
s1.play.push(4);
console.log(s1.play, s2.play); // [1, 2, 3, 4] [1, 2, 3, 4]

// 2. 构造函数继承，借助 call
function Parent3(){
  this.name = 'parent3';
}

Parent3.prototype.getName = function () {
  return this.name;
}

function Child3(){
  Parent3.call(this);
  this.type = 'child3'
}
// 缺点：只能继承父类的实例属性和方法，不能继承原型属性或者方法
let child = new Child3();
console.log('构造函数继承')
console.log(child);  // 没问题
// console.log(child.getName());  // 会报错

// 3. 组合继承（原型链 + 构造函数）
function Parent3 () {
  this.name = 'parent3';
  this.play = [1, 2, 3];
}

Parent3.prototype.getName = function () {
  return this.name;
}

function Child3() {
  // 第二次调用 Parent3()
  Parent3.call(this);
  this.type = 'child3';
}

// 第一次调用 Parent3()
Child3.prototype = new Parent3();
// 手动挂上构造器，指向自己的构造函数
Child3.prototype.constructor = Child3;
var s3 = new Child3();
var s4 = new Child3();
s3.play.push(4);

console.log('组合继承')
console.log(s3.play, s4.play);  // 不互相影响
console.log(s3.getName()); // 正常输出'parent3'
console.log(s4.getName()); // 正常输出'parent3'

// 4. 原型式继承
let parent4 = {
  name: "parent4",
  friends: ["p1", "p2", "p3"],
  getName: function() {
    return this.name;
  }
};

let person4 = Object.create(parent4);
person4.name = "tom";
person4.friends.push("jerry");

let person5 = Object.create(parent4);
person5.friends.push("lucy");
// 缺点：多个实例的引用类型属性指向相同的内存，存在篡改的可能
console.log('原型式继承')
console.log(person4.name);
console.log(person4.name === person4.getName());
console.log(person5.name);
console.log(person4.friends);
console.log(person5.friends);

// 5. 寄生式继承
let parent6 = {
  name: "parent6",
  friends: ["p1", "p2", "p3"],
  getName: function() {
    return this.name;
  }
};

function clone(original) {
  let clone = Object.create(original);
  clone.getFriends = function() {
    return this.friends;
  };
  return clone;
}

let person6 = clone(parent6);
// 缺点：与原型式继承一样
console.log('寄生式继承')
console.log(person6.getName());
console.log(person6.getFriends());

// 6. 寄生组合式继承
function clone2 (parent, child) {
  // 这里改用 Object.create 就可以减少组合继承中多进行一次构造的过程
  child.prototype = Object.create(parent.prototype);
  child.prototype.constructor = child;
}

function Parent7() {
  this.name = 'parent7';
  this.play = [1, 2, 3];
}
Parent7.prototype.getName = function () {
  return this.name;
}
function Child7() {
  Parent7.call(this);
  this.friends = 'child5';
}
clone2(Parent7, Child7);

Child7.prototype.getFriends = function () {
  return this.friends;
}

let person7 = new Child7();
console.log(person7);
console.log(person7.getName());
console.log(person7.getFriends());

// 6. 寄生组合式继承
function clone3 (parent, child) {
  // 这里改用 Object.create 就可以减少组合继承中多进行一次构造的过程
  child.prototype = Object.create(parent.prototype);
  child.prototype.constructor = child;
}

function Parent8() {
  this.name = 'parent8';
  this.play = [1, 2, 3];
}
 Parent8.prototype.getName = function () {
  return this.name;
}
function Child8() {
  Parent8.call(this);
  this.friends = 'child8';
}

clone3(Parent8, Child8);

Child8.prototype.getFriends = function () {
  return this.friends;
}

let person8 = new Child8();
console.log('寄生组合式继承')
console.log(person8);
console.log(person8.getName());
console.log(person8.getFriends());