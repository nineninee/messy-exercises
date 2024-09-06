const rl = require("readline").createInterface({ input: process.stdin });
const iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

// 定义抽象产品
class Block {
  produce(){
    throw new Error('Not implemented')
  }
}

// 定义具体产品-圆形积木
class CircleBlock extends Block {
  produce(){
    console.log('Circle Block');
  }
}

// 定义具体产品-方形积木
class SquareBlock extends Block {
  produce(){
    console.log('Square Block');
  }
}

// 定义抽象工厂
class BlockFactory {
  createBlock(){
    throw new Error('Not implemented')
  }
}

// 定义具体工厂-圆形积木工厂
class CircleBlockFactory extends BlockFactory {
  createBlock(){
    return new CircleBlock()
  }
}

// 定义具体工厂-方形积木工厂
class SquareBlockFactory extends BlockFactory {
  createBlock(){
    return new SquareBlock()
  }
}

// 积木工厂系统
class BlockFactorySystem {
  #blocks = []

  produceBlocks(factory, quantity){
    for(let i = 0; i < quantity; i++){
      let block = factory.createBlock()
      this.#blocks.push(block)
      block.produce()
    }
  }

  getBlocks(){
    return this.#blocks
  }
}

(async () => {
  let blockFactorySystem = new BlockFactorySystem()

  let N = await readline()

  for(let i = 0; i < N; i++){
    let [blockType, quantity] = (await readline()).split(' ')
    let factory = blockType === 'Circle' ? new CircleBlockFactory() : new SquareBlockFactory()
    blockFactorySystem.produceBlocks(factory, quantity)
  }
})()
