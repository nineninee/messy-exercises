// 定义产品类: 包含多个组成部分, 这些部分的属性和方法构成了产品的接口
class Product {
  part1
  part2
  setPart1(part1) {
    this.part1 = part1
  }
  setPart2(part2) {
    this.part2 = part2
  }
}

// 定义抽象建造者: 创建一个接口(js没有), 包含构建产品各个部分的抽象方法.这些方法通常用于设置产品的各个属性
class Builder {
  buildPart1(part1){}
  buildPart2(part2){}
  getResult(){}
}

// 创建具体建造类: 实现抽象建造者接口, 构建具体的产品
class ConcreteBuilder extends Builder {
  product = new Product()

  buildPart1(part1){
    this.product.setPart1(part1)
  }
  buildPart2(part2){
    this.product.setPart2(part2)
  }
  getResult(){
    return this.product
  }
}

// 定义Director类: 指导者类用来控制构建产品的顺序和步骤
class Director {
  builder

  constructor(builder){
    this.builder = builder
  }

  construct(){
    this.builder.buildPart1('步骤1')
    this.builder.buildPart2('步骤2')
  }
}

// 使用
// 创建具体的建造者
const builder = new ConcreteBuilder()
// 创建指导者
const director = new Director(builder)
// 指导者构建产品
director.construct()
// 获取构建好的产品
const product = builder.getResult()
// 输出产品信息
console.log(product);