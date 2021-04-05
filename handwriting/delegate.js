/**
 * 事件代理
 */
document.getElementById('father-id').onclick = function (event) {
  event = event || window.event
  let target = event.target || event.srcElement
  if (target.nodeName.toLowerCase() === 'xxx') {
    // 操作内容
  }
}