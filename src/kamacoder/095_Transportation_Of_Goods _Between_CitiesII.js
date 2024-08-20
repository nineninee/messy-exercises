/**
 * 卡码网0094.城市间货物运输I- bellaman_ford算法 判断负权回路
 */

const rl = require("readline").createInterface({ input: process.stdin });
const iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

let N // N个城市
let M // M条边
let grid = [] // 存储边
let minDist = [] // 存储最短距离
let isInQueue = [] // 存储是否在队列中
let queue = [] // 队列

class Edge {
  constructor(to, val) {
    this.to = to;
    this.val = val;
  }
}

const init = async () => {
  let line
  line = await readline();
  [N, M] = line.split(' ').map(Number);

  grid = new Array(N + 1).fill(0).map(() => new Array())
  minDist = new Array(N + 1).fill(Infinity)
  isInQueue = new Array(N + 1).fill(false)

  for (let i = 0; i < M; i++) {
    line = await readline()
    let [u, v, w] = line.split(' ').map(Number)
    grid[u].push(new Edge(v, w))
  }
}

void (async function () {
  await init()

  let start = 1
  let end = N
  minDist[start] = 0

  queue.push(start)
  isInQueue[start] = true

  while (queue.length) {
    let node = queue.shift()
    isInQueue[node] = false

    for (const edge of grid[node]) {
      let from = node
      let to = edge.to
      let val = edge.val

      if (minDist[to] > minDist[from] + val) {
        minDist[to] = minDist[from] + val
        if (isInQueue[to] == false) {
          queue.push(to)
          isInQueue[to] = true
        }
      }
    }
  }

  if (minDist[N] == Infinity) {
    console.log('unconnected')
  } else {
    console.log(minDist[N])
  }
})()



 // 6 7
 // 5 6 -2
 // 1 2 1
 // 5 3 1
 // 2 5 2
 // 2 4 -3
 // 4 6 4
 // 1 3 5