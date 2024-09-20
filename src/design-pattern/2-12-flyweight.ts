namespace Test {
  // 定义享元结构: 接受外部状态并作为参数进行处理
  interface Flyweight {
    operation(externalState: string): void;
  }

  // 实现具体享元类, 存储内部状态
  class ConcreteFlyweight implements Flyweight {
    private intrinsicState: string;

    constructor(intrinsicState: string){
      this.intrinsicState = intrinsicState
    }

    operation(externalState: string): void {
      console.log(`Intrinsic State: ${this.intrinsicState}, External State: ${externalState}`);
    }
  }

  // 创建享元工厂类, 创建并管理Flyweight对象, 当用户请求一个Flyweight时, 享元工厂会提供一个已经创建的的实例或者创建一个
  class FlyweightFactory {
    private flyweights: Map<string, Flyweight> = new Map();

    public getFlyweight(key: string){
      if(!this.flyweights.has(key)){
        this.flyweights.set(key, new ConcreteFlyweight(key))
      }
      return this.flyweights.get(key)
    }
  }

  // 客户端代码
  (async () => {
    const factory: FlyweightFactory = new FlyweightFactory();

    const flyweight1: Flyweight = factory.getFlyweight("A")!;
    flyweight1.operation("ExternalState 1");

    const flyweight2: Flyweight = factory.getFlyweight("B")!;
    flyweight2.operation("ExternalState 2");

    const flyweight3: Flyweight = factory.getFlyweight("A")!
    flyweight3.operation("ExternalState 3");
  })();
}
