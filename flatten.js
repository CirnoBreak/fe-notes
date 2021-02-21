/**
 *  数组扁平化 
 * @param {Array} arr 
 */
// 1. 递归
function flatten1(arr) {
  let result = [];

  for(let i = 0; i < arr.length; i++) {
    if(Array.isArray(arr[i])) {
      result = result.concat(flatten(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}

// 2. reduce 迭代
function flatten2(arr) {
  return arr.reduce(function(prev, next){
    return prev.concat(Array.isArray(next) ? flatten(next) : next)
  }, [])
}

// 3. 扩展运算符
function flatten3(arr) {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}

// 4. split + toString
function flatten4(arr) {
  // arr.toString => [1, [2, 3], [[4, [5, 6]]]] => 1,2,3,4,5,6
  return arr.toString().split(',');
}

// 5. flat 方法
function flatten5(arr) {
  // 参数为展开深度，
  return arr.flat(Infinity);
}

// 6. 正则 + JSON.parse
function flatten6(arr) {
  let str = JSON.stringify(arr);
  str = str.replace(/(\[|\])/g, '');
  str = '[' + str + ']';
  return JSON.parse(str); 
}