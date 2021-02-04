Function.prototype.myCall = function (context, ...args) {
  context = typeof context === "object" ? context : window;
  const key = Symbol();
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
say.myCall(me, "Chen", "!");
