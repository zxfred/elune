function newOperator(func, ...args) {
  // 类型判断
  if (typeof func !== "function") {
    throw new Error("the first param must be a function");
  }

  // 创建一个新对象
  const instance = {};

  // 链接[[Prototype]]
  if (func.prototype) {
    Object.setPrototypeOf(instance, func.prototype);
  }

  // 或者
  // const instance = Object.create(func.prototype);

  // 绑定 this, 获取 func 返回结果
  const result = func.apply(instance, args); // 和 new 一样, 此时 func 被执行了一次

  // 如果不是对象类型, 返回 this
  return result instanceof Object ? result : instance;
}
