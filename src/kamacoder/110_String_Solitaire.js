/**
 * 卡码网110.字符串接龙
 * 方法：广搜
 * 思路: 从开始字符串广搜, 搜到最终字符串时就是最短路径
 */
const r1 = require('readline').createInterface({ input: process.stdin });
// 创建readline接口
let iter = r1[Symbol.asyncIterator]();
// 创建异步迭代器
const readline = async () => (await iter.next()).value;

let N //输入字符串个数
let beginStr //开始字符串
let endStr //结束字符串
let strSet = new Set() //字符串集合
let visitedMap = new Map() //访问过的字符串

// 读取输入，初始化地图
const init = async () => {
  let line = await readline();
  line = line.trim()
  N = Number(line);

  line = await readline();
  line = line.trim().split(' ')
  beginStr = line[0]
  endStr = line[1]

  for (let i = 0; i < N; i++) {
    line = await readline()
    line = line.trim()
    strSet.add(line.trim())
  }
}

(async function () {

  // 读取输入，初始化数据
  await init()

  // 初始化队列
  let queue = []
  queue.push(beginStr)

  // 初始化visitMap
  visitedMap.set(beginStr, 1)

  while (queue.length) {
    let word = queue.shift()
    let path = visitedMap.get(word)

    // 遍历26个字母
    for (let i = 0; i < word.length; i++) {
      let newWord = word.split('') // 用一个新字符串替换str，因为每次要置换一个字符
      for (let j = 0; j < 26; j++) {
        newWord[i] = String.fromCharCode('a'.charCodeAt() + j)
        // 发现替换字母后，字符串与终点字符串相同
        if (newWord.join('') === endStr) {
          console.log(path + 1);
          return 0;   // 找到了路径 
        }

        // 字符串集合里出现了newWord，并且newWord没有被访问过
        if (strSet.has(newWord.join('')) && !visitedMap.has(newWord.join(''))) {
          // 添加访问信息，并将新字符串放到队列中
          queue.push(newWord.join(''))
          visitedMap.set(newWord.join(''), path + 1)
        }
      }
    }
  }

  console.log(0);
})()

 //  6
 //  abc def
 //  efc
 //  dbc
 //  ebc
 //  dec
 //  dfc
 //  yhn
