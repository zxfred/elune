function a(...arguments) {
  return "123";
}

const b = new a();
console.log(b);

// console.log(null instanceof Object);
// console.log(undefined instanceof Object);
// console.log(123 instanceof Object);
// console.log("123" instanceof Object);
// console.log(true instanceof Object);

// console.log({ a: 1 } instanceof Object);
// console.log(function c() {} instanceof Object);
// console.log([1, 2, 3] instanceof Object);
// console.log(new Date() instanceof Object);
// console.log(new RegExp() instanceof Object);
// console.log(new Error() instanceof Object);
