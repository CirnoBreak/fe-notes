Promise.allSettled = function (promises) {
  return new Promise(resolve => {
    const data = []
    const len = promises.length
    let count = len
    for (let i = 0; i < len; i++) {
      const promise = promises[i]
      promise.then(res => {
        data[i] = {
          status: 'fulfilled',
          value: res
        }
      }, error => {
        data[i] = {
          status: 'rejected',
          reason: error
        }
      }).finally(() => {
        if (!--count) {
          resolve(data)
        }
      })
    }
  })
}

const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, 'foo'));
const promises = [promise2, promise1];

Promise.allSettled(promises).
  then((results) => results.forEach((result) => console.log(result.status)));