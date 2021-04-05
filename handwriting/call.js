/**
 * call、apply、bind 的实现
 * @param {object} context
 * @param  {...any} args 
 */
Function.prototype.call = function (context, ...args) {
  var context = context || window;
  context.fn = this;
  var result = eval(`context.fn(...args)`);
  delete context.fn;
  return result;
}

Function.prototype.call2 = function (context = window, ...args) {
  if (this === Function.prototype) {
    return undefined
  }

  context = context || window
  const fn = Symbol()
  context[fn] = this
  const result = context[fn](...args)
  delete context[fn]
  return result 
}

Function.prototype.apply =  function (context, args) {
  var context = context || window;
  context.fn = this;
  var result = eval(`context.fn(...args)`);
  delete context.fn;
  return result;
}

Function.prototype.apply2 = function (context = window, args) {
  if (this === Function.prototype) {
    return undefined
  }

  // context = context || window
  const fn = Symbol()
  context[fn] = this

  let result
  if (Array.isArray(args)) {
    result = context[fn](...args)
  } else {
    result = context[fn]()
  }

  delete context[fn]
  return result
}

Function.prototype.bind = function (context, ...args) {
  if (typeof this !== "function") {
    throw new Error("this must be a function");
  }
  var self = this;
  var fbound = function () {
    self.apply(this instanceof self ? this : context, args.concat(Array.prototype.slice.call(arguments)));
  }
  if(this.prototype) {
    fbound.prototype = Object.create(this.prototype);
  }
  return fbound;
}

Function.prototype.bind2 = function (context, ...args) {
  if (this === Function.prototype) {
    throw new Error('Error')
  }

  const _this = this

  return function F(...args1) {
    // bind 后的函数作为 constructor 被实例化
    if (this instanceof F) {
      return new _this(...args, ...args1)
    }
    
    return _this.apply(context, ...args, ...args1)
  }
}
