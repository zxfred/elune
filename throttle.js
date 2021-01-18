// 节流

// 指定时间段内，只执行第一次，直到下个时间段，再执行下一次，不断循环

function throttle(fn, interval) {
  if (typeof fn !== "function") {
    throw new Error("fn is not a function");
  }

  let flag = false;

  return function () {
    if (flag) return;
    flag = true;
    setTimeout(() => {
      flag = false;
      fn();
    }, interval);
  };
}
