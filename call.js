Function.prototype.call = function (context, ...args) {
  context = typeof context === "object" ? context : window;
  const key = Symbol(); // 防止覆盖掉原有属性
  context[key] = this; // 这里的 this 为 function 本身
  const result = context[key](...args);
  delete context[key];
  return result;
};

// test
const me = { name: "Jacky" };
function say(v1, v2) {
  console.log(`My name is ${this.name + v1 + v2}`);
}
say.call(me, "Chen", "!");
