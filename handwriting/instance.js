/**
 *  instanceOf 实现 
 * @param {object} left 
 * @param {object} right 
 */
function myInstanceof(left, right) {
  // 如果是基础数据类型，返回 false
  if (typeof left !== 'object' || left === null) {
    return false
  }
  // 获取参数的原型对象(left.__proto__, left.constructor.prototype)
  let proto = Object.getPrototypeOf(left)
  while(true) {
    if (proto === null) {
      return false
    }

    if (proto === right.prototype) {
      return true
    }

    proto = Object.getPrototypeOf(proto)
  }
}

console.log(myInstanceof(new Number(123), Number));    // true
console.log(myInstanceof(123, Number));
console.log(myInstanceof({}, Object))