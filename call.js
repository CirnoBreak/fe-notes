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

Function.prototype.apply =  function (context, args) {
  var context = context || window;
  context.fn = this;
  var result = eval(`context.fn(...args)`);
  delete context.fn;
  return result;
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