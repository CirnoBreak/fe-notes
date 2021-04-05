class RangeIterator {
  constructor(start, stop) {
    this.value = start
    this.stop = stop
  }

  [Symbol.iterator]() {
    return this
  }

  next() {
    var value = this.value
    if (value < this.stop) {
      this.value++
      return {
        done: false,
        value: value,
      }
    } else {
      return {
        done: true,
        value: undefined
      }
    }
  }
}

function range(start, stop) {
  return new RangeIterator(start, stop);
}

for (let i of range(0, 3)) {
  console.log('value', i);
}


function* range1(start, stop) {
  for (var i = start; i < stop; i++) {
    yield i
  }
}

for (let i of range1(3, 10)) {
  console.log('value1', i);
}