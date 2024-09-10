// 抽象工厂模式 每个具体工厂负责创建一组相关的产品

// 抽象产品-A
class ProductA {
  display() {}
}
// 抽象产品-B
class ProductB {
  display() {}
}

// 具体产品A1
class ConcreteProductA1 extends ProductA {
  display() {
    console.log('具体产品A1')
  }
}
// 具体产品A2
class ConcreteProductA2 extends ProductA {
  display() {
    console.log('具体产品A2');
  }
}
// 具体产品B1
class ConcreteProductB1 extends ProductB {
  display(){
    console.log('具体产品B1');
  }
}
// 具体产品B2
class ConcreteProductB2 extends ProductB {
  display(){
    console.log('具体产品B2');
  }
}


// 抽象工厂
class AbstractFactory {
  createProductA(){}
  createProductB(){}
}

// 具体工厂1-成产A1和B1
class ConcreteFactory1 extends AbstractFactory {
  createProductA(){
    return new ConcreteProductA1()
  }
  createProductB(){
    return new ConcreteProductB1()
  }
}

// 具体工厂2-成产A2和B2
class ConcreteFactory2 extends AbstractFactory {
  createProductA(){
    return new ConcreteProductA2()
  }
  createProductB(){
    return new ConcreteProductB2()
  }
}

// 使用
const factory1 = new ConcreteFactory1()
const productA1 = factory1.createProductA()
const productB1 = factory1.createProductB()
productA1.display()
productB1.display()

const factory2 = new ConcreteFactory2()
const productA2 = factory2.createProductA()
const productB2 = factory2.createProductB()
productA2.display()
productB2.display()