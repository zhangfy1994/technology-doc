// 实现bind
function myBind(fn, thisArg) {
  return function (...args) {
    return fn.apply(thisArg, args);
  };
}

// 柯里化
function curry(fn) {
  return function _curry(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function (...args2) {
        return _curry.apply(this, [...args, ...args2]);
      };
    }
  };
}
