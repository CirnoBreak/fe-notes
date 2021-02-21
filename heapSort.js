/**
 *  堆排序 
 * @param {Array} arr 
 */
function heapSort(arr) {
  const len = arr.length
  let k = 0
  function swap(i, j) {
    const tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp
  }

  function max_heap(start, end) {
    let dad = start
    let son = dad * 2 + 1
    if (son >= end) {
      return
    }
    if (son + 1 < end && arr[son] < arr[son + 1]) {
      son++
    }
    if (arr[dad] <= arr[son]) {
      swap(dad, son)
      max_heap(son, end)
    }
  }

  for (let i = Math.floor(len >> 1) - 1; i >= 0; i--) {
    max_heap(i, len)
  }

  for (let j = len - 1; j > k; j--) {
    swap(0, j)
    max_heap(0, j)
  }

  return arr
}

const a = [1, 3, 6, 3, 23, 76, 1, 34, 222, 6, 456, 221];
heapSort(a);
console.log('a', heapSort(a));