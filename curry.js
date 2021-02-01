// 关键知识点：function.length 用来获取函数的形参个数
// 补充：arguments.length 获取的是实参个数
function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      console.log(this);
      return func.apply(this, args);
    }
    return function (...newArgs) {
      return curried.apply(this, args.concat(newArgs));
    };
  };
}

// test case
function sum(a, b, c) {
  return a + b + c;
}
const curriedSum = curry(sum);
console.log(curriedSum(1, 2, 3));
console.log(curriedSum(1)(2, 3));
console.log(curriedSum(1)(2)(3));
