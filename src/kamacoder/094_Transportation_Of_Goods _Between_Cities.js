/**
 * 卡码网0094.城市间货物运输I
 */

const rl = require("readline").createInterface({ input: process.stdin });
const iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

let N // N个城市
let M // M条边
let grid = [] // 存储边
let minDist = [] // 存储最短距离


const init = async () => {
  let line
  line = await readline();
  [N, M] = line.split(' ').map(Number);

  grid = new Array(M).fill(0).map(() => new Array(3).fill(0))
  minDist = new Array(N + 1).fill(Infinity)

  for (let i = 0; i < M; i++) {
    line = await readline()
    let [u, v, w] = line.split(' ').map(Number)
    grid.push([u, v, w])
  }
}

void (async function () {
  await init()

  let start = 1
  let end = N
  minDist[start] = 0

  for (let i = 1; i < N; i++) {
    for (const slide of grid) {
      let from = slide[0]
      let to = slide[1]
      let price = slide[2]

      if (minDist[from] != Infinity && minDist[to] > minDist[from] + price) {
        minDist[to] = minDist[from] + price
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