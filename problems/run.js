// 高德面试题

async function run() {
  const start = Date.now();
  let index = 0;
  const p = new Promise((resolve) => {
    console.log("p1", Date.now() - start);
    setTimeout(() => {
      index = index + 1;
      resolve(`index:${index}`);
    }, 3000);
  });
  console.log("p2", Date.now() - start);
  const p_a = await p;
  console.log(p_a, Date.now() - start);
  const p_b = await p;
  console.log(p_b, Date.now() - start);
}

run();
