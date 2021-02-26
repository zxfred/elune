let data = {
  name: "jack",
  child: [
    { name: "jack1" },
    {
      name: "jack2",
      child: [
        { name: "jack2-1", child: [{ name: "jack2-1-1" }] },
        { name: "jack2-2" },
      ],
    },
    { name: "jack3", child: [{ name: "jack3-1" }] },
  ],
};

function findNode(data) {
  let tree = Array.isArray(data) ? data : [data];
  tree.forEach((node) => {
    node.child && findNode(node.child);
    console.log(node.name);
  });
}

function findNode2(tree) {
  let result = [];
  let node;
  let list = [tree];
  while ((node = list.shift())) {
    console.log(node.name);
    node.child && list.push(...node.child);
  }
  return result;
}

findNode(data);
