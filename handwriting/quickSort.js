/**
 *  快速排序 
 * @param {Array} array 
 */
// 阮一峰快排
function quickSort1(array) {
  const quick = function (arr) {
    if (arr.length <= 1) {
      return arr
    }

    const len = arr.length
    const index = Math.floor(len >> 1)
    const pivot = arr.splice(index, 1)[0]
    const left = []
    const right = []

    for (let i = 0; i < len; i++) {
      if (arr[i] > pivot) {
        right.push(arr[i])
      } else if (pivot >= arr[i]) {
        left.push(arr[i])
      }
    }
     
    return quick(left).concat([pivot], quick(right))
  }

  const result = quick(array)
  return result
}

// 原地快排
const sort = function (arr, left, right) {
  if (left >= right) {
    return
  }

  const pivot = arr[Math.floor((left + right) >> 1)]
  const index = partition(arr, left, right, pivot)
  sort(arr, left, index - 1)
  sort(arr, index, right)
}

function swap(arr, leftIndex, rightIndex) {
  const tmp = arr[leftIndex]
  arr[leftIndex] = arr[rightIndex]
  arr[rightIndex] = tmp
}

function partition(arr, left, right, pivot) {
  while (left <= right) {
    while (arr[left] < pivot) {
      left++
    }

    while (arr[right] > pivot) {
      right--
    }

    if (left <= right) {
      swap(arr, left, right) 
      left++
      right--
    }
  }
  return left
}

function quickSort2(array) {
  sort(array, 0, array.length - 1)
}

const a = [1, 3, 6, 3, 23, 76, 1, 34, 222, 6, 456, 221];
quickSort2(a);
console.log('a', a);
