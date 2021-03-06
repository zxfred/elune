// 关键知识点：function.length 用来获取函数的形参个数
// 补充：arguments.length 获取的是实参个数

function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      console.log("this", this);
      return fn.apply(this, args); // 此处的 this 和 curry 的 this 保持一致
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
