/**
 * 冒泡排序
 * @param {Array} arr 数组
 */
function bubbleSort(arr) {
  const len = arr.length
  if (len < 2) {
    return arr
  }

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[i]) {
        const temp = arr[j]
        arr[j] = arr[i]
        arr[i] = temp
      }
    }
  }

  return arr
}

const a = [1, 3, 6, 3, 23, 76, 1, 34, 222, 6, 456, 221];
bubbleSort(a);
console.log('a', a);