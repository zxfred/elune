function run(arr, cb) {
  const promises = arr.map(
    (task) => new Promise((resolve, reject) => task(resolve))
  );
  Promise.race(promises).then((values) => {
    console.log(values);
  });
}

const callback = (res) => console.log(res);

const asyncTasks = [
  (done) =>
    setTimeout(() => {
      done(1);
    }, 1000),
  (done) =>
    setTimeout(() => {
      done(2);
    }, 3000),
  (done) =>
    setTimeout(() => {
      done(3);
    }, 2000),
];

run(asyncTasks, callback);
