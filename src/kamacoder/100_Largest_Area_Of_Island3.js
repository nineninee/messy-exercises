/**
 * 卡码网100.最大岛屿面积
 * 方法：深搜
 * 备注：dfs处理下一节点
 */

const r1 = require('readline').createInterface({ input: process.stdin });
// 创建readline接口
let iter = r1[Symbol.asyncIterator]();
// 创建异步迭代器
const readline = async () => (await iter.next()).value;

let graph // 地图
let N, M // 地图大小
let visited // 访问过的节点
let result = 0 // 最大岛屿面积
let count = 0 // 岛屿内节点数
const dir = [[0, 1], [1, 0], [0, -1], [-1, 0]] //方向


// 读取输入，初始化地图
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
 * @description: 从（x，y）开始深度优先遍历地图
 * @param {*} graph 地图
 * @param {*} visited 访问过的节点
 * @param {*} x 开始搜索节点的下标
 * @param {*} y 开始搜索节点的下标
 * @return {*}
 */
const dfs = (graph, visited, x, y) => {
  for (let i = 0; i < 4; i++) {
    let nextx = x + dir[i][0]
    let nexty = y + dir[i][1]
    if (nextx < 0 || nextx >= N || nexty < 0 || nexty >= M) continue

    // 此dfs会从传入节点的下一节点开始处理，所以须判断下一节点是否是未访问过的陆地，否则就直接返回（相当于终止条件）
    if (!visited[nextx][nexty] && graph[nextx][nexty] === 1) {
      visited[nextx][nexty] = true
      count++
      dfs(graph, visited, nextx, nexty)
    }
  }
}

(async function () {

  // 读取输入，初始化地图
  await initGraph()

  // 统计最大岛屿面积
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (!visited[i][j] && graph[i][j] === 1) { //遇到没有访问过的陆地
        // dfs从下一节点开始处理，所以需要将当前节点计入面积并标记为已访问
        count = 1
        visited[i][j] = true

        // 深度优先遍历，统计岛屿内节点数，并将岛屿标记为已访问
        dfs(graph, visited, i, j)

        // 更新最大岛屿面积
        result = Math.max(result, count)
      }
    }
  }
  console.log(result);
})()