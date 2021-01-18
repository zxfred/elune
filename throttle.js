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
