function debounce(func, wait, immediate) {
  var timeout, result
  var debounced = function() {
    // 修改 this 指向正确的对象
    var context = this
    var args = arguments
    if (timeout) {
      clearTimeout(timeout)
    }

    if (immediate) {
      // 没有定时器，首次执行
      if (!timeout) {
        func.apply(context, args);
      }
      // 设置定时器，后续延迟执行
      timeout = setTimeout(function () {
        func.apply(context, args);
        timer = null;
      }, wait);
    } else {
      timeout = setTimeout(function() {
        func.apply(context, args)
      }, wait)
    }
    return result
  }

  debounced.cancel = function() {
    clearTimeout(timeout)
    timeout = null
  }

  return debounced
}