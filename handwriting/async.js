const sleep = (str) => new Promise(r => setTimeout(() => r(str), 1000))

function *test() {
  console.log('in')
  const res1 = yield sleep('hello')
  console.log('res1', res1);
}