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
  visited[x][y] = true  //只要加入队列就立刻标记为访问过

  while (queue.length) {
    let [x, y] = queue.shift()
    for (let i = 0; i < 4; i++) {
      let nextx = x + dir[i][0]
      let nexty = y + dir[i][1]
      if(nextx < 0 || nextx >= N || nexty < 0 || nexty >= M) continue
      if(!visited[nextx][nexty] && graph[nextx][nexty] === 1){
        queue.push([nextx, nexty])
        visited[nextx][nexty] = true
      }
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
        // 遇到没访问过的陆地，+1
        result++

        // 广度优先遍历，将相邻陆地标记为已访问
        bfs(graph, visited, i, j)
      }
    }
  }
  console.log(result);
})()




// 4 5
// 1 1 0 0 0
// 1 1 0 0 0
// 0 0 1 0 0
// 0 0 0 1 1
