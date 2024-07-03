const r1 = require('readline').createInterface({ input: process.stdin });
// 创建readline接口
let iter = r1[Symbol.asyncIterator]();
// 创建异步迭代器
const readline = async () => (await iter.next()).value;

let graph
let N, M
let visited
let result = 0
const dir = [[0, 1], [1, 0], [0, -1], [-1, 0]]

const initGraph = async () => {
  let line = await readline();
  [N, M] = line.split(' ').map(Number);
  graph = new Array(N).fill(0).map(() => new Array(M).fill(0))
  visited = new Array(N).fill(false).map(() => new Array(M).fill(false))

  for (let i = 0; i < N; i++) {
    line = await readline()
    line = line.split(' ').map(Number)
    for (let j = 0; j < M; j++) {
      graph[i][j] = line[j]
    }
  }
}

/**
 * @description: 从节点x,y开始深度优先遍历
 * @param {*} graph 是地图，也就是一个二维数组
 * @param {*} visited 标记访问过的节点，不要重复访问
 * @param {*} x 表示开始搜索节点的下标
 * @param {*} y 表示开始搜索节点的下标
 * @return {*}
 */
const dfs = (graph, visited, x, y) => {
  for (let i = 0; i < 4; i++) {
    const nextx = x + dir[i][0]
    const nexty = y + dir[i][1]
    if (nextx < 0 || nextx >= N || nexty < 0 || nexty >= M) continue
    if (!visited[nextx][nexty] && graph[nextx][nexty] === 1) {
      visited[nextx][nexty] = true
      dfs(graph, visited, nextx, nexty)
    }
  }
}

(async function () {

  // 读取输入，初始化地图
  await initGraph()

  // 统计岛屿数
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (!visited[i][j] && graph[i][j] === 1) {
        // 标记已访问
        visited[i][j] = true

        // 遇到没访问过的陆地，+1
        result++

        // 深度优先遍历，将相邻陆地标记为已访问
        dfs(graph, visited, i, j)
      }
    }
  }
  console.log(result);
})()