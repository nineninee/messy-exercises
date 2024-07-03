const r1 = require('readline').createInterface({ input: process.stdin });
// 创建readline接口
let iter = r1[Symbol.asyncIterator]();
// 创建异步迭代器
const readline = async () => (await iter.next()).value;

let graph;
let N, M;

// 收集符合条件的路径
let result = [];
// 1节点到终点的路径
let path = [];


// 创建邻接表，初始化邻接表
async function initGraph() {
  let line;
  line = await readline();
  [N, M] = line.split(' ').map(i => parseInt(i))
  graph = new Array(N + 1).fill(0).map(() => new Array())

  while (line = await readline()) {
    const strArr = line.split(' ').map(i => parseInt(i))
    strArr ? graph[strArr[0]].push(strArr[1]) : null
  }
};

// 深度搜索
async function dfs(graph, x, n) {
  // 当前遍历节点为x， 到达节点为n
  if (x == n) {
    result.push([...path])
    return
  }

  graph[x].forEach(i => {
    path.push(i)
    dfs(graph, i, n)
    path.pop(i)
  })
};




(async function () {
  // 创建邻接表，初始化邻接表
  await initGraph();

  // 从节点1开始深度搜索
  path.push(1);

  // 深度搜索
  dfs(graph, 1, N);

  // 输出
  if (result.length > 0) {
    result.forEach(i => {
      console.log(i.join(' '))
    })
  } else {
    console.log(-1)
  }
})();



