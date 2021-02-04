var length = 10;

function fn() {
  console.log(this.length);
}

var obj = {
  length: 5,
  method: function (fn) {
    arguments[0]();
    this.fn();
    fn();
  },
  fn,
};

obj.method(fn, 1, 2, 3);
