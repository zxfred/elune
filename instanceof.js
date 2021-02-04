const myInstanceof = (target, origin) => {
  while (target) {
    if (target.__proto__ === origin.prototype) {
      return true;
    }
    target = target.__proto__;
  }
  return false;
};

function myInstanceof2(left, right) {
  // 基本数据类型直接返回false
  if (typeof left !== "object" || left === null) return false;
  // getProtypeOf 是 Object对象自带的一个方法，能够拿到参数的原型对象
  let proto = Object.getPrototypeOf(left);
  while (true) {
    // 查找到尽头，还没找到
    if (proto == null) return false;
    // 找到相同的原型对象
    if (proto == right.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}
