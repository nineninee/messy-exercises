/**
 * 卡码网53.最小生成树之prim
 */
const r1 = require('readline').createInterface({ input: process.stdin });
// 创建readline接口
let iter = r1[Symbol.asyncIterator]();
// 创建异步迭代器
const readline = async () => (await iter.next()).value;


let V, E // 节点数和边数
let grid = []  // 边集
let minDist = [] // 最小距离

let isInTree = [] // 标记是否在最小生成树中

const init = async () => {
  // 读取第一行输入
  let line = await readline();
  [V, E] = line.split(' ').map(Number)

  // 初始化grid, minDist 和 isInTree
  grid = new Array(V + 1).fill(0).map(() => new Array(V + 1).fill(10001)) // 填一个默认最大值，题目描述val最大为10000
  minDist = new Array(V + 1).fill(10001)
  isInTree = new Array(V + 1).fill(false)

  // 读取边集
  while (E--) {
    line = await readline();
    let [x, y, k] = line.split(' ').map(Number)
    grid[x][y] = k
    grid[y][x] = k
  }
}


(async function () {
  // 根据输入, 初始化数据
  await init()

  // 我们只需要循环 n-1次，建立 n - 1条边，就可以把n个节点的图连在一起
  for (let i = 1; i < V; i++) {

    // 1.prim三部曲: 第一步, 选择距生成树最近的节点
    let cur
    let minVal = Infinity // 选中哪个节点 加入最小生成树
    for (let j = 1; j <= V; j++) {
      // 选择最小生成树节点的条件: 1. 不在最小生成树中 2. 距离最小生成树最近
      if (!isInTree[j] && minDist[j] < minVal) {
        cur = j
        minVal = minDist[j]
      }
    }

    // 2.prim三部曲: 第二步, 把最近节点(cur)加入生成树
    isInTree[cur] = true

    // 3.prim三部曲: 第三步, 更新其他节点到生成树的距离
    for (let j = 1; j <= V; j++) {
      // 更新条件: 1. 不在最小生成树中 2. 与cur节点的距离比离最小生成树的距离更小
      if (!isInTree[j] && grid[cur][j] < minDist[j]) {
        minDist[j] = grid[cur][j]
      }
    }
  }

  // 统计结果
  let result = 0
  for (let i = 2; i <= V; i++) { // 不统计第一个节点, 因为统计的是边的权值
    result += minDist[i]
  }
  console.log(result);
})()

 // 7 11
 // 1 2 1
 // 1 3 1
 // 1 5 2
 // 2 6 1
 // 2 4 2
 // 2 3 2
 // 3 4 1
 // 4 5 1
 // 5 6 2
 // 5 7 1
 // 6 7 1
