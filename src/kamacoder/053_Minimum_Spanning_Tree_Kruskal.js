/**
 * 卡码网53.最小生成树之kruskal
 */
const r1 = require('readline').createInterface({ input: process.stdin });
// 创建readline接口
let iter = r1[Symbol.asyncIterator]();
// 创建异步迭代器
const readline = async () => (await iter.next()).value;


let V, E // 节点数和边数
let edges = [] // 边集
let father = []  // 并查集

// 定义边类 l,r为边两边的节点 val为边的权值
class Edge {
  l
  r
  val
  constructor(l, r, val) {
    this.l = l
    this.r = r
    this.val = val
  }
}

// 根据输入, 初始化数据
const init = async () => {
  // 读取第一行输入
  let line = await readline();
  [V, E] = line.split(' ').map(Number)

  // 读取边集
  while (E--) {
    line = await readline();
    let [x, y, k] = line.split(' ').map(Number)
    edges.push(new Edge(x, y, k))
  }
}


// 初始化并查集
const initUnionFind = () => {
  for (let i = 0; i <= V; i++) {
    father[i] = i
  }
}

// 查找并查集的根节点
const find = (u) => {
  return father[u] === u ? u : father[u] = find(father[u])
}

// 将节点合并到一个集合中
const join = (u, v) => {
  u = find(u)
  v = find(v)
  if (u == v) return
  father[v] = u
}

// 判断两个节点是否在同一个集合中
const isSame = (u, v) => {
  u = find(u)
  v = find(v)
  return u == v
}

(async function () {
  // 根据输入, 初始化数据
  await init()

  // 记录结果
  let result_val = 0

  // kruskal算法: 按权值排序
  edges.sort((a, b) => a.val - b.val)

  // 初始化并查集
  initUnionFind()

  // 遍历
  edges.forEach(edge => {
    // 如果祖先不同，则不在同一个集合
    if (!isSame(edge.l, edge.r)) {
      join(edge.l, edge.r) // 这条边可以作为生成树的边
      result_val += edge.val // 两个节点加入到同一个集合
    }
  });

  console.log(result_val);
  return 0
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
