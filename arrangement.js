// 给定任意二维数组，输出所有的排列组合项。
// 比如 [['A','B'], ['a','b'], [1, 2]]
// 输出 ['Aa1','Aa2','Ab1','Ab2','Ba1','Ba2','Bb1','Bb2']

function arrange(arr) {
  let result = [];
  const idx = new Array(arr.length).fill(0);

  while (idx.includes(0)) {
    const element = idx
      .map((v, i) => {
        return arr[i][v];
      })
      .join("");
    result.push(element);

    const zeroIndex = idx.lastIndexOf(0);
    idx[zeroIndex]++;
    console.log(idx);
  }

  return result;
}

console.log(
  arrange([
    ["A", "B"],
    ["a", "b"],
    [1, 2],
  ])
);
