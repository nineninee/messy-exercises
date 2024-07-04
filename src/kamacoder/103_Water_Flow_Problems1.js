/**
 * 卡码网103.水流问题
 * 方法：深搜
 */

const r1 = require('readline').createInterface({ input: process.stdin });
// 创建readline接口
let iter = r1[Symbol.asyncIterator]();
// 创建异步迭代器
const readline = async () => (await iter.next()).value;

let graph // 地图
let N, M // 地图大小
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
 * @description: 从（x，y）开始深度优先遍历地图
 * @param {*} graph 地图
 * @param {*} visited 可访问节点
 * @param {*} x 开始搜索节点的下标
 * @param {*} y 开始搜索节点的下标
 * @return {*}
 */
const dfs = (graph, visited, x, y) => {
  if (visited[x][y]) return
  visited[x][y] = true // 标记为可访问

  for (let i = 0; i < 4; i++) {
    let nextx = x + dir[i][0]
    let nexty = y + dir[i][1]
    if (nextx < 0 || nextx >= N || nexty < 0 || nexty >= M) continue //越界,跳过
    if (graph[x][y] < graph[nextx][nexty]) continue //不能流过.跳过
    dfs(graph, visited, nextx, nexty)
  }
}


/**
 * @description: 判断地图上的(x, y)是否可以到达第一组边界和第二组边界
 * @param {*} x 坐标
 * @param {*} y 坐标
 * @return {*} true可以到达，false不可以到达
 */
const isResult = (x, y) => {
  let visited = new Array(N).fill(false).map(() => new Array(M).fill(false))

  let isFirst = false //是否可到达第一边界
  let isSecond = false //是否可到达第二边界

  // 深搜，将(x, y)可到达的所有节点做标记
  dfs(graph, visited, x, y)

  // 判断能否到第一边界左边
  for (let i = 0; i < N; i++) {
    if (visited[i][0]) {
      isFirst = true
      break
    }
  }

  // 判断能否到第一边界上边
  for (let j = 0; j < M; j++) {
    if (visited[0][j]) {
      isFirst = true
      break
    }
  }

  // 判断能否到第二边界右边
  for (let i = 0; i < N; i++) {
    if (visited[i][M - 1]) {
      isSecond = true
      break
    }
  }

  // 判断能否到第二边界下边
  for (let j = 0; j < M; j++) {
    if (visited[N - 1][j]) {
      isSecond = true
      break
    }
  }

  return isFirst && isSecond
}

(async function () {

  // 读取输入，初始化地图
  await initGraph()

  // 遍历地图，判断是否能到达第一组边界和第二组边界
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (isResult(i, j)) console.log(i + ' ' + j);
    }
  }
})()