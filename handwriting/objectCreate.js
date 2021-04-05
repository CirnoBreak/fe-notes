Object.create = function( o ) {
  function f() {}
  f.prototype = o;
  return new f;
};