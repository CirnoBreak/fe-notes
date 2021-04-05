const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function MyPromise(fn) {
  let state = PENDING
  let value = null;
  const callbacks = [];

  this.then = function (onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      handle({
        onFulfilled,
        onRejected,
        resolve,
        reject
      })
    })
  }

  this.catch = function(onError) {
    this.then(null, onError)
  }

  this.finally = function(onDone) {
    this.then(onDone, onDone)
  }

  // 直接调用 resolve
  this.resolve = function(value) {
    if (value && value instanceof MyPromise) {
      // 值是 Promise 返回当前值
      return value
    } else if (
      value &&
      typeof value === 'object' &&
      typeof value.then === 'function'
    ) {
      let then = value.then
      // thenable 对象（具有 then 方法的对象），转为 Promise 对象，立即执行  thenable 对象的 then 方法
      return new MyPromise(resolve => {
        then(resolve)
      })
    } else if (value) {
      // 普通的数据对象
      return new MyPromise(resolve => resolve(value))
    } else {
      return new MyPromise(resolve => resolve())
    }
  }

  this.all = function(arr) {
    const args = Array.prototype.slice.call(arr)
    return new MyPromise(function(resolve, reject) {
      if (args.length === 0) {
        return resolve([])
      }

      let remaining = args.length

      function res(i, val) {
        try {
          if (
            val &&
            (
              typeof val === 'object' ||
              typeof val === 'function'
            )
          ) {
            const { then } = val
            if (typeof then === 'function') {
              then.call(val, function(val) {
                // 调用到没有为止
                res(i, val)
              }, reject)
              return
            }
          }

          args[i] = val
          // 执行到最后一个时 resolve 整个 Promise 数组
          if (--remaining === 0) {
            resolve(args)
          }
        } catch (e) {
          reject(e)
        }
      }

      for (let i = 0; i < args.length; i++) {
        res(i, args[i])
      }
    })
  }

  this.race = function(arr) {
    return new MyPromise((resolve, reject) => {
      for(let i = 0; i < arr.length; i++) {
        arr[i].then(resolve, reject)
      }
    })
  }

  function handle(callback) {
    // 等待态，函数放到队列里面
    if (state === PENDING) {
      callbacks.push(callback)
      return
    }

    const cb =
      state === FULFILLED ?
      callback.onFulfilled :
      callback.onRejected
    const next =
      state === FULFILLED ?   
        callback.resolve :
        callback.reject

    if (!cb) {
      next(value)
      return
    }

    try {
      const ret = cb(value)
      next(ret)
    } catch(e) {
      callback.reject(e)
    }
  }

  // 处理 resolve
  function resolve(newValue) {
    const fn = () => {
      if (state !== PENDING) {
        return
      }

      // 实现链式调用，利用 promise 里面返回的 promise 的 then 方法
      if (
        newValue &&
        (
          typeof newValue === 'object' ||
          typeof newValue === 'function'
        )
      ) {
        const { then } = newValue
        if (typeof then === 'function') {
          then.call(newValue, resolve)
          return
        }
      }

      state = 'fulfilled'
      value = newValue
      handleCallback()
    }

    // 基于 Promise/A+
    setTimeout(fn ,0)
  }

  this.reject = function(value) {
    return new Promise(function(resolve, reject) {
      reject(value)
    })
  }

  function reject(error) {
    const fn = () => {
      if (state !== PENDING) {
        return 
      }

      if (
        error &&
        (
          typeof error === 'object' ||
          typeof error === 'function'
        )
      ) {
        const { then } = error
        if (typeof then === 'function') {
          then.call(error, resolve, reject)
          return
        }
      }

      state = 'rejected'
      value = error
      handleCallback()
    }
    setTimeout(fn, 0)
  }

  function handleCallback() {
    while (callbacks.length) {
      const fulfilledFn = callbacks.shift()
      handle(fulfilledFn)
    }
  }

  fn(resolve, reject)
}

const promise1 = new MyPromise((resolve, reject) => {
  setTimeout(resolve, 500, 'one');
});

const promise2 = new MyPromise((resolve, reject) => {
  setTimeout(resolve, 100, 'two');
});

MyPromise.race([promise1, promise2]).then((value) => {
  console.log(value);
  // Both resolve, but promise2 is faster
});

// new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//       resolve({ test: 1 })
//       resolve({ test: 3})
//   }, 1000)
// }).then((data) => {
//   console.log('result1', data)
//   return test()
// }).then((data) => {
//   console.log('result2', data)
// })

// function test(id) {
//   return new MyPromise(((resolve, reject) => {
//       setTimeout(() => {
//       resolve({ test: 2 })
//       }, 5000)
//   }))
// }
