// var say = function () {
//   console.log(words);
// };
// function run() {
//   var words = "hello";
//   say();
// }
// run();
// var words = "my";

let name = "x";
const people = {
  name: "y",
  setName(name) {
    this.name = name;
    return () => {
      return this.name;
    };
  },
};
let setName = people.setName;
let getName = setName(name);
console.log(people.name); // y
console.log(getName()); // x
