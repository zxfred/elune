Function.prototype.myApply = function (context, args) {
  context = typeof context === "object" ? context : window;
  // 防止覆盖掉原有属性
  const key = Symbol();
  // 这里的this为需要执行的方法
  context[key] = this;
  const result = context[key](...args);
  delete context[key];
  return result;
};

// test
const me = { name: "Jacky" };
function say(v1, v2) {
  console.log(`My name is ${this.name + v1 + v2}`);
}
say.myApply(me, ["Chen", "!"]);
