// ES6 Set
function unique(array) {
  return Array.from(new Set(array));
}

// ES6 Set 的另一种写法
function unique2(array) {
  return [...new Set(array)];
}

// 利用 indexOf
function unique3(array) {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    if (result.indexOf(array[i]) === -1) {
      result.push(array[i]);
    }
  }
  return result;
}

// 利用 includes
function unique4(array) {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    if (!result.includes(array[i])) {
      result.push(array[i]);
    }
  }
  return result;
}

// 双循环
function unique5(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] === array[j]) {
        array.splice(j, 1);
        j--;
      }
    }
  }
  return array;
}

// 利用sort()
function unique6(array) {
  array = array.sort();
  let target = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i] !== array[i - 1]) {
      target.push(array[i]);
    }
  }
  return target;
}

// 利用对象的属性不能相同的特点
function unique7(array) {
  let target = [];
  let obj = {};
  for (let i = 0; i < array.length; i++) {
    if (obj[array[i]]) {
      obj[array[i]]++;
    } else {
      target.push(array[i]);
      obj[array[i]] = 1;
    }
  }
  return target;
}

const testcase = [
  1,
  1,
  "true",
  "true",
  true,
  true,
  15,
  15,
  false,
  false,
  undefined,
  undefined,
  null,
  null,
  NaN,
  NaN,
  "NaN",
  "NaN",
  0,
  0,
  "a",
  "a",
  {},
  {},
];

console.log(unique(testcase));
