/**
 * 卡码网101.孤岛的总面积
 * 方法：广搜
 */

const r1 = require('readline').createInterface({ input: process.stdin });
// 创建readline接口
let iter = r1[Symbol.asyncIterator]();
// 创建异步迭代器
const readline = async () => (await iter.next()).value;

let graph // 地图
let N, M // 地图大小
let count = 0 // 孤岛的总面积
const dir = [[0, 1], [1, 0], [0, -1], [-1, 0]] //方向


// 读取输入，初始化地图
const initGraph = async () => {
  let line = await readline();
  [N, M] = line.split(' ').map(Number);
  graph = new Array(N).fill(0).map(() => new Array(M).fill(0))

  for (let i = 0; i < N; i++) {
    line = await readline()
    line = line.split(' ').map(Number)
    for (let j = 0; j < M; j++) {
      graph[i][j] = line[j]
    }
  }
}


/**
 * @description: 从（x，y）开始广度优先遍历地图
 * @param {*} graph 地图
 * @param {*} x 开始搜索节点的下标
 * @param {*} y 开始搜索节点的下标
 * @return {*}
 */
const bfs = (graph, x, y) => {
  let queue = []
  queue.push([x, y])
  graph[x][y] = 0 // 只要加入队列，立刻标记

  while (queue.length) {
    let [xx, yy] = queue.shift()
    for (let i = 0; i < 4; i++) {
      let nextx = xx + dir[i][0]
      let nexty = yy + dir[i][1]
      if (nextx < 0 || nextx >= N || nexty < 0 || nexty >= M) continue
      if (graph[nextx][nexty] === 1) {
        queue.push([nextx, nexty])
        graph[nextx][nexty] = 0 // 只要加入队列，立刻标记
      }
    }
  }

}

(async function () {

  // 读取输入，初始化地图
  await initGraph()

  // 遍历地图左右两边
  for (let i = 0; i < N; i++) {
    if (graph[i][0] === 1) bfs(graph, i, 0)
    if (graph[i][M - 1] === 1) bfs(graph, i, M - 1)
  }

  // 遍历地图上下两边
  for (let j = 0; j < M; j++) {
    if (graph[0][j] === 1) bfs(graph, 0, j)
    if (graph[N - 1][j] === 1) bfs(graph, N - 1, j)
  }

  count = 0
  // 统计孤岛的总面积
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (graph[i][j] === 1) count++
    }
  }
  console.log(count);
})()