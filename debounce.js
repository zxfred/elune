// 防抖

// 函数被触发时，先延迟
// 在延迟的时间内，如果再次被触发，则取消之前的延迟，重新开始计算延迟时间
// 只执行最后一次

function debounce(fn, interval) {
  if (typeof fn !== "function") {
    throw new Error("fn is not a function");
  }

  let id = null;

  return function () {
    if (id) {
      clearTimeout(id);
    }
    id = setTimeout(() => {
      id = null;
      fn();
    }, interval);
  };
}
