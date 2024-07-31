/**
 * 卡码网117.软件构建
 */
const r1 = require('readline').createInterface({ input: process.stdin });
// 创建readline接口
let iter = r1[Symbol.asyncIterator]();
// 创建异步迭代器
const readline = async () => (await iter.next()).value;


let N, M // 节点数和边数
let inDegrees = [] // 入度
let umap = new Map() // 记录文件依赖关系
let result = [] // 结果


// 根据输入, 初始化数据
const init = async () => {
  // 读取第一行输入
  let line = await readline();
  [N, M] = line.split(' ').map(Number)

  inDegrees = new Array(N).fill(0)

  // 读取边集
  while (M--) {
    line = await readline();
    let [x, y] = line.split(' ').map(Number)

    // 记录入度
    inDegrees[y]++

    // 记录x指向哪些文件
    if (!umap.has(x)) {
      umap.set(x, [y])
    } else {
      umap.get(x).push(y)
    }
  }
}

(async function () {
  // 根据输入, 初始化数据
  await init()

  let queue = [] // 入度为0的节点
  for (let i = 0; i < N; i++) {
    if (inDegrees[i] == 0) {
      queue.push(i)
    }
  }

  while (queue.length) {
    let cur = queue.shift() //当前文件

    result.push(cur)

    let files = umap.get(cur) // 当前文件指向的文件

    // 当前文件指向的文件入度减1
    if (files && files.length) {
      for (let i = 0; i < files.length; i++) {
        inDegrees[files[i]]--
        if (inDegrees[files[i]] == 0) queue.push(files[i])
      }
    }
  }

  // 这里result.length == N 一定要判断, 因为可能存在环
  if (result.length == N) return console.log(result.join(' '))
  console.log(-1)
})()

 // 5 4
 // 0 1
 // 0 2
 // 1 3
 // 2 4
