function insertSort(arr) {
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) {
      var temp = arr[i];
      var j = i - 1;
      arr[i] = arr[j];

      while (j >= 0 && temp < arr[j]) {
        arr[j + 1] = arr[j];
        j--;
      }

      arr[j + 1] = temp;
    }
  }
}

var arr = [524, 684, 5, 69, 15];

insertSort(arr);

console.log(arr); // 结果为[5, 15, 69, 92, 524, 684]
