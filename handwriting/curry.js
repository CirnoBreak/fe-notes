function curry(fn, args) {
  // 函数的参数个数
  var length = fn.length;

  args = args || [];

  return function() {
    var _args = args.slice(0),
        arg, i;

    for (i = 0; i < arguments.length; i++) {
        arg = arguments[i];
        _args.push(arg);
    }
    // 参数长度小于函数总长度，继续执行，并把合并的参数列表作为新的参数
    if (_args.length < length) {
      return curry.call(this, fn, _args);
    }
    else {
      return fn.apply(this, _args);
    }
  }
}

var fn = curry(function(a, b, c) {
  console.log([a, b, c]);
});

fn("a", "b")("c")