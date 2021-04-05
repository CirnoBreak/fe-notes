function curry(fn) {
  return judge = (...args) => {
    return args.length === fn.length ?
      fn(...args) :
      (...newArgs) => judge(...args, ...newArgs)
  }
}

const add = (a, b, c) => a + b + c
const curryAdd = curry(add)
curryAdd(1)(2)(3)
console.warn('add', curryAdd(1)(2)(3));