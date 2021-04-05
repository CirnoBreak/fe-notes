function unique(arr) {
  let newArr = new Set()
  return arr.filter(item => {
    let id = item + JSON.stringify(item)
    if (newArr.has(id)) {
      return false
    } else {
      newArr.add(id)
      return true
    }
  })
}

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

function quickSort(array) {
  sort(array, 0, array.length - 1)
}

function topK(k, arr) {
  const uniqueArr = unique(arr)
  quickSort(uniqueArr)

  return uniqueArr[uniqueArr.length - k]
}