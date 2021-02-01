// 初级：ES6
Function.prototype.bind = function (thisTarget, ...args) {
  const fn = this; // 这里的 this 是调用 bind 的函数
  return function (...laterArgs) {
    return fn.apply(thisTarget, [...args, ...laterArgs]);
  };
};

// test case
function fn(x) {
  return this + x;
}

const f = fn.bind(5);

console.log(f(2));
