/**
 * 卡码网103.水流问题
 * 方法：深搜
 * 思路: 从第一边界和第二边界开始向高处流, 标记可以留到的位置, 两个边界都能到达的位置就是所求结果
 */

 const r1 = require('readline').createInterface({ input: process.stdin });
 // 创建readline接口
 let iter = r1[Symbol.asyncIterator]();
 // 创建异步迭代器
 const readline = async () => (await iter.next()).value;
 
 let graph // 地图
 let N, M // 地图大小
 const dir = [[0, 1], [1, 0], [0, -1], [-1, 0]] //方向
 
 
 // 读取输入，初始化地图
 const initGraph = async () => {
   let line = await readline();
   [N, M] = line.split(' ').map(Number);
   graph = new Array(N).fill(0).map(() => new Array(M).fill(0))
 
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
  * @return {*}
  */
 const dfs = (graph, visited, x, y) => {
   if (visited[x][y]) return
   visited[x][y] = true
 
   for (let i = 0; i < 4; i++) {
     let nextx = x + dir[i][0]
     let nexty = y + dir[i][1]
     if (nextx < 0 || nextx >= N || nexty < 0 || nexty >= M) continue //越界, 跳过
 
     // 不能流过, 跳过 (注意因为是从边界往高处流, 所以这里是graph[xx][yy] >= graph[nextx][nexty], 还要注意不是graph[xx][yy] >= graph[nextx][nexty])
     if (graph[x][y] > graph[nextx][nexty]) continue
 
     dfs(graph, visited, nextx, nexty)
   }
 }
 
 (async function () {
 
   // 读取输入，初始化地图
   await initGraph()
 
   // 记录第一边界可到达的节点
   let firstBorder = new Array(N).fill(false).map(() => new Array(M).fill(false))
 
   // 记录第二边界可到达的节点
   let secondBorder = new Array(N).fill(false).map(() => new Array(M).fill(false))
 
   // 第一边界左边和第二边界右边
   for (let i = 0; i < N; i++) {
     dfs(graph, firstBorder, i, 0)
     dfs(graph, secondBorder, i, M - 1)
   }
 
   // 第一边界上边和第二边界下边
   for (let j = 0; j < M; j++) {
     dfs(graph, firstBorder, 0, j)
     dfs(graph, secondBorder, N - 1, j)
   }
 
   // 遍历地图，判断是否能到达第一组边界和第二组边界
   for (let i = 0; i < N; i++) {
     for (let j = 0; j < M; j++) {
       if (firstBorder[i][j] && secondBorder[i][j]) console.log(i + ' ' + j);
     }
   }
 })()