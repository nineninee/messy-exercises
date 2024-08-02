/**
 * 卡码网0047.参加科学大会-dijkstra朴素版
 */
const rl = require("readline").createInterface({ input: process.stdin });
const iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

let N, M // N个节点 M条边
let grid = [] // 图
let minDist = [] // 距离原点最小距离
let visited = [] // 是否访问过
let parent = [] //记录路径
let start = 1 // 起始点
let end // 终点

const init = async () => {
  let line
  line = await readline();
  [N, M] = line.split(" ").map(Number);

  minDist = Array(N + 1).fill(Infinity);
  visited = Array(N + 1).fill(false);
  parent = Array(N + 1).fill(-1);
  grid = Array(N + 1).fill().map(() => Array(N + 1).fill(Infinity));

  while (M--) {
    line = await readline();
    let [S, E, V] = line.split(" ").map(Number);
    grid[S][E] = V
  }
}

void (async function () {
  // 获取输入, 初始化数据
  await init();

  end = N //终点
  minDist[start] = 0 //起点距离自身最小距离为0

  // 遍历所有节点
  for (let i = 1; i <= N; i++) {
    let cur = 1
    let minVal = Infinity

    // 1. 选取离源点最近且没有访问过的节点
    for (let j = 1; j <= N; j++) {
      if (!visited[j] && minDist[j] < minVal) {
        minVal = minDist[j]
        cur = j
      }
    }

    // 2. 标记该节点已访问
    visited[cur] = true

    // 3. 更新源点到非访问节点的距离
    for (let j = 1; j <= N; j++) {
      if (!visited[j] && grid[cur][j] + minDist[cur] < minDist[j]) {
        minDist[j] = grid[cur][j] + minDist[cur]
        parent[j] = cur
      }
    }
  }

  // minDist[end] === Infinity ? console.log(-1) : console.log(minDist[end])

  // 输出最短情况
  for (let i = 1; i <= N; i++) {
    console.log(parent[i], '->', i);
  }
})();

 // 7 9
 // 1 2 1
 // 1 3 4
 // 2 3 2
 // 2 4 5
 // 3 4 2
 // 4 5 3
 // 2 6 4
 // 5 7 4
 // 6 7 9