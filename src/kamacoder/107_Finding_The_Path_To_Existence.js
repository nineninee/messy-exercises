/**
 * 卡码网107.寻找存在的路径
 * 方法：并查集
 */
const r1 = require('readline').createInterface({ input: process.stdin });
// 创建readline接口
let iter = r1[Symbol.asyncIterator]();
// 创建异步迭代器
const readline = async () => (await iter.next()).value;


let N, M // 节点数和边数
let source, destination // 起点 终点
let father = []  // 并查集


// 并查集初始化
const init = () => {
  for (let i = 1; i <= N; i++)  father[i] = i;
}

// 并查集里寻根的过程
const find = (u) => {
  return u == father[u] ? u : father[u] = find(father[u])
}

// 将v->u 这条边加入并查集
const join = (u, v) => {
  u = find(u)
  v = find(v)
  if (u == v) return // 如果发现根相同，则说明在一个集合，不用两个节点相连直接返回
  father[v] = u
}

// 判断 u 和 v是否找到同一个根
const isSame = (u, v) => {
  u = find(u)
  v = find(v)
  return u == v
}


(async function () {
  // 读取第一行输入
  let line = await readline();
  [N, M] = line.split(' ').map(Number);

  // 初始化并查集
  father = new Array(N)
  init()

  // 读取边信息, 加入并查集
  for (let i = 0; i < M; i++) {
    line = await readline()
    line = line.split(' ').map(Number)
    join(line[0], line[1])
  }

  // 读取起点和终点
  line = await readline(); //JS注意这里的冒号
  [source, destination] = line.split(' ').map(Number)

  if (isSame(source, destination)) return console.log(1);
  console.log(0);
})()


 // 5 4
 // 1 2
 // 1 3
 // 2 4
 // 3 4
 // 1 4
