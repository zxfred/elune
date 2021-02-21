// const isValid = function (s) {
//   if (!s) return true;
//   const next = s.replace(/(\[\]|\{\}|\(\))/g, "");
//   if (next === s) return false;
//   return isValid(next);
// };

const isValid = function (s) {
  const stack = [];

  for (let i = 0; i < s.length; i++) {
    let c = s.charAt(i);
    console.log("char", c);
    switch (c) {
      case "(":
        stack.push(")");
        break;
      case "[":
        stack.push("]");
        break;
      case "{":
        stack.push("}");
        break;
      default:
        if (c !== stack.pop()) {
          return false;
        }
    }
    console.log(stack);
  }

  return stack.length === 0;
};

// console.log(isValid("()")); // true
// console.log(isValid("()[]{}")); // true
// console.log(isValid("(]")); // false
// console.log(isValid("([)]")); // false
console.log(isValid("{[]}")); // true
