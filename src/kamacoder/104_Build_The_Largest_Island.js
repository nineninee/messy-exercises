/**
 * 卡码网104.建造最大岛屿
 * 方法：深搜
 * 思路: 统计各个岛屿面积, 并做标记; 最后遍历海洋, 判断周边岛屿的最大面积;
 */
const r1 = require('readline').createInterface({ input: process.stdin });
// 创建readline接口
let iter = r1[Symbol.asyncIterator]();
// 创建异步迭代器
const readline = async () => (await iter.next()).value;

let graph // 地图
let N, M // 地图大小
let visited // 访问过的节点, 标记岛屿
const dir = [[0, 1], [1, 0], [0, -1], [-1, 0]] //方向

let count = 0 // 统计岛屿面积
let areaMap = new Map() // 存储岛屿面积


// 读取输入，初始化地图
const initGraph = async () => {
  let line = await readline();
  [N, M] = line.split(' ').map(Number);
  graph = new Array(N).fill(0).map(() => new Array(M).fill(0))
  visited = new Array(N).fill(0).map(() => new Array(M).fill(0))

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
 * @param {*} mark 当前岛屿的标记
 * @return {*}
 */
const dfs = (graph, visited, x, y, mark) => {
  if (visited[x][y] != 0) return
  visited[x][y] = mark
  count++

  for (let i = 0; i < 4; i++) {
    let nextx = x + dir[i][0]
    let nexty = y + dir[i][1]
    if (nextx < 0 || nextx >= N || nexty < 0 || nexty >= M) continue //越界, 跳过

    // 已访问过, 或者是海洋, 跳过
    if (visited[nextx][nexty] != 0 || graph[nextx][nexty] == 0) continue

    dfs(graph, visited, nextx, nexty, mark)
  }
}

(async function () {

  // 读取输入，初始化地图
  await initGraph()

  let isAllLand = true //标记整个地图都是陆地

  let mark = 2 // 标记岛屿
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (graph[i][j] == 0 && isAllLand) isAllLand = false
      if (graph[i][j] === 1 && visited[i][j] === 0) {
        count = 0
        dfs(graph, visited, i, j, mark)
        areaMap.set(mark, count)
        mark++
      }
    }
  }

  // 如果全是陆地, 直接返回面积
  if (isAllLand) {
    console.log(N * M);
    return
  }

  let result = 0  // 记录最后结果
  let visitedIsland = new Map() //标记访问过的岛屿, 因为海洋四周可能是同一个岛屿, 需要标记避免重复统计面积
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (visited[i][j] === 0) {
        count = 1  // 记录连接之后的岛屿数量
        visitedIsland.clear()  // 每次使用时，清空

        // 计算海洋周围岛屿面积
        for (let m = 0; m < 4; m++) {
          const nextx = i + dir[m][0]
          const nexty = j + dir[m][1]
          if (nextx < 0 || nextx >= N || nexty < 0 || nexty >= M) continue //越界, 跳过

          const island = visited[nextx][nexty]
          if (island == 0 || visitedIsland.get(island)) continue// 四周是海洋或者访问过的陆地 跳过

          // 标记为访问, 计算面积
          visitedIsland.set(island, true)
          count += areaMap.get(visited[nextx][nexty])
        }

        result = Math.max(result, count)
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
