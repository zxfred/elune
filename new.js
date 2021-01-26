function myNew(fn, ...args) {
  // 类型判断
  if (typeof fn !== "function") {
    throw new Error("fn is not a function");
  }

  // 创建一个新对象, 并链接[[Prototype]]
  const obj = {};
  Object.setPrototypeOf(obj, fn.prototype);
  // 或者
  // const obj = Object.create(fn.prototype);

  // 绑定 this, 获取 fn 返回结果
  const res = fn.apply(obj, args); // 和 new 一样, 此时 fn 被执行了一次

  // 如果不是对象类型, 返回 this
  return result instanceof Object ? res : obj;
}
