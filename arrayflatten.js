// 递归
function flatten(array) {
  let target = [];
  array.forEach((v) => {
    target = target.concat(Array.isArray(v) ? flatten(v) : [v]);
  });
  return target;
}

// while
function flatten2(array) {
  while (array.some((item) => Array.isArray(item))) {
    array = [].concat(...array);
  }
  return array;
}

// reduce
function flatten3(arr) {
  return arr.reduce((res, next) => {
    return res.concat(Array.isArray(next) ? flatten(next) : next);
  }, []);
}

// 如果数组的项全为数字, join
function flatten4(array) {
  return array.join(",");
}

// flat()
function flatten5(array) {
  return array.flat(Infinity);
}

const testcase = [1, 2, [3], [4, 5], [[6]]];
const testcase2 = ["1", 2, ["3"], ["4", "5"], [["6"]]];

console.log(flatten5(testcase));
console.log(flatten5(testcase2));
