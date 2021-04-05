/**
 * 相比于 generator，async/await 自带执行器，不需要手动调用 next 即可实行下一步
 * async 返回的是 Promise 对象，而 generator 返回的是生成器对象
 * await 返回的是 Promise 的 resolve/reject 值
 */
function run(gen) {
  return new Promise((resolve, reject) => {
    // 由于每次 gen() 获取到的是最新的迭代器，因此迭代器操作要放到 _next() 前，否则进入死循环
    var g = gen()

    function _next(val) {
      try {
        var res = g.next(val)
      } catch(err) {
        return reject(err)
      }
      // 获取迭代器对象，返回 resolve 的值
      // 递归终止条件
      if (res.done) {
        return resolve(res.value)
      }
      // Promise.then 是实现自动迭代的前提
      Promise.resolve(res.value).then(
        val => {
          // 完成后执行下一个 next，并传入 resolve 的值
          _next(val)
        },
        err => {
          g.throw(err)
        }
      )
    }

    _next()
  })
  
}

function* myGenerator() {
  try {
    console.log(yield Promise.resolve(1)) 
    console.log(yield 2)   //2
    console.log(yield Promise.reject('error'))
  } catch (error) {
    console.log(error)
  }
}

run(myGenerator)