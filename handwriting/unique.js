/**
 * 数组去重 
 * @param {Array} arr 
 */
function unique(arr) {
  let newArr = new Set()
  return arr.filter(item => {
    // 唯一标识
    let id = item + JSON.stringify(item)
    if (newArr.has(id)) {
      return false
    } else {
      newArr.add(id)
      return true
    }
  })
}

const a = [1, 2, 2, 1, 4, 5, 6]
console.log('unique', unique(a));