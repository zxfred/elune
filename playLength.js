// 计算去重之后的播放时长总和
// ["0-500", "600-1000", "200-300", "800-1500", "2000-3000"]

function playLength(arr = []) {
  const list = arr.map((v) => v.split("-"));

  if (list.length === 1) return list[1] - list[0];

  const listLength = list.length; // 保存 list 的长度
  let i = 0;
  let d = 0; // 断开的时间总和
  while (i < listLength - 1) {
    const [start1, end1] = list[0];
    const [start2, end2] = list[1];
    const temp = [start1, end1, start2, end2];
    const max = Math.max(...temp);
    const min = Math.min(...temp);

    // 如果断开, 累加断开的时间
    if (end1 < start2 || start1 > end2) {
      d = d + max - min - (end1 - start1) - (end2 - start2);
    }
    // 合并两个时间段并添加到数组顶部
    list.splice(0, 2);
    list.unshift([min, max]);
    i++;
  }

  return list[0][1] - list[0][0] - d;
}

console.log(
  playLength(["0-500", "600-1000", "200-300", "800-1500", "2000-3000"])
);

// 2400
