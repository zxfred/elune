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

// console.log("start");

// var length = 10;

// function fn() {
//   console.log(this.length);
// }

// var obj = {
//   length: 5,
//   method: function (fn) {
//     arguments[0]();
//     this.fn();
//     fn();
//   },
//   fn,
// };

// obj.method(fn, 1, 2, 3);

// function run(arr, cb) {
//   const promises = arr.map(
//     (task) => new Promise((resolve, reject) => task(resolve))
//   );
//   Promise.race(promises).then((values) => {
//     console.log(values);
//   });
// }

// const callback = (res) => console.log(res);

// const asyncTasks = [
//   (done) =>
//     setTimeout(() => {
//       done(1);
//     }, 1000),
//   (done) =>
//     setTimeout(() => {
//       done(2);
//     }, 3000),
//   (done) =>
//     setTimeout(() => {
//       done(3);
//     }, 2000),
// ];

// run(asyncTasks, callback);

// async function run() {
//   const start = Date.now();
//   let index = 0;
//   const p = new Promise((resolve) => {
//     console.log("p1", Date.now() - start);
//     setTimeout(() => {
//       index = index + 1;
//       resolve(`index:${index}`);
//     }, 3000);
//   });
//   console.log("p2", Date.now() - start);
//   const p_a = await p;
//   console.log(p_a, Date.now() - start);
//   const p_b = await p;
//   console.log(p_b, Date.now() - start);
// }

// run();

var say = function () {
  console.log(words);
};
function run() {
  var words = "hello";
  say();
}
run();
var words = "my";
