/**
 * 卡码网100.最大岛屿面积
 * 方法：广搜
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
 * @description: 从(x, y)开始广度优先遍历
 * @param {*} graph 地图
 * @param {*} visited 访问过的节点
 * @param {*} x 开始搜索节点的下标
 * @param {*} y 开始搜索节点的下标
 * @return {*}
 */
const bfs = (graph, visited, x, y) => {
  let queue = []
  queue.push([x, y])
  count++
  visited[x][y] = true  //只要加入队列就立刻标记为访问过

  while (queue.length) {
    let [xx, yy] = queue.shift()
    for (let i = 0; i < 4; i++) {
      let nextx = xx + dir[i][0]
      let nexty = yy + dir[i][1]
      if(nextx < 0 || nextx >= N || nexty < 0 || nexty >= M) continue
      if(!visited[nextx][nexty] && graph[nextx][nexty] === 1){
        queue.push([nextx, nexty])
        count++
        visited[nextx][nexty] = true
      }
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
        // 重新计算面积
        count = 0

        // 广度优先遍历，统计岛屿内节点数，并将岛屿标记为已访问
        bfs(graph, visited, i, j)

        // 更新最大岛屿面积
        result = Math.max(result, count)
      }
    }
  }
  console.log(result);
})()
