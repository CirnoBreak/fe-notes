/**
 * new 的实现 
 * @param {Function} ctor 
 * @param  {...any} args 
 */
function _new(ctor, ...args) {
  if (typeof ctor !== 'function') {
    throw 'ctor must be a function!'
  }

  // let obj = new Object()
  let obj = {}
  obj.__proto__ = Object.create(ctor.prototype)
  let res = ctor.apply(obj, [...args])

  let isObject = typeof res === 'object' && typeof res !== null
  let isFunction = typeof res === 'function'
  return isObject || isFunction ? res : obj
}