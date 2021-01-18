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
