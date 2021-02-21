// 顺序执行 promise

const log = (callback) => {
  log.count = log.count || 0;
  var count = log.count++;
  setTimeout(() => {
    console.log(count);
    callback && callback();
  }, (Math.random() * 1000) % 10);
};

const promises = [];
for (let i = 0; i < 10; i++) {
  promises.push(() => new Promise((resolve) => log(resolve)));
}

// let p = Promise.resolve();
// promises.forEach((promise) => {
//   p = p.then(promise);
// });

async function run() {
  for (const p of promises) {
    await p();
  }
}

run();
