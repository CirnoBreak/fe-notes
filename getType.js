/**
 * 获取对应的数据类型 
 * @param {*} obj 
 */
function getType(obj) {
  let type = typeof obj
  if (type !== "object") {
    return type
  }

  return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1')
}