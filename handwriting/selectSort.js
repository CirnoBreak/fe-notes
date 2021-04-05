/**
 * 选择排序 
 * @param {Array} arr 
 */
function selectSort(arr) {
  const len = arr.length
  let tmp
  let minIndex
  for (let i = 0; i < len - 1; i++) {
    minIndex = i
    for (let j = i + 1; j < len; j++) {
      if (arr[j] <= arr[minIndex]) {
        minIndex = j
      }
    }
    tmp = arr[i]
    arr[i] = arr[minIndex]
    arr[minIndex] = tmp
  }
  return arr
}

const a = [1, 3, 6, 3, 23, 76, 1, 34, 222, 6, 456, 221];
selectSort(a)
console.log('a', a);