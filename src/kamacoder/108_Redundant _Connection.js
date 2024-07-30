/**
 * 卡码网108.冗余连接
 */
const r1 = require('readline').createInterface({ input: process.stdin });
// 创建readline接口
let iter = r1[Symbol.asyncIterator]();
// 创建异步迭代器
const readline = async () => (await iter.next()).value;


let N // 节点数和边数
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
  N = Number(line);

  // 初始化并查集
  father = new Array(N)
  init()

  // 读取边信息, 加入并查集
  for (let i = 0; i < N; i++) {
    line = await readline()
    line = line.split(' ').map(Number)

    if (!isSame(line[0], line[1])) {
      join(line[0], line[1])
    }else{
      console.log(line[0], line[1]);
      break
    }
  }
})()


// 3
// 1 2
// 2 3
// 1 3