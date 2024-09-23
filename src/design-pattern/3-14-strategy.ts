namespace Strategy {
  // 抽象策略抽象类
  abstract class Strategy {
    abstract aligrithmInterface(): void;
  }

  // 具体策略类
  class ConcreteStrategyA extends Strategy {
    aligrithmInterface() {
      console.log("策略A");
    }
  }

  // 具体策略类
  class ConcreteStrategyB extends Strategy {
    aligrithmInterface(){
      console.log("策略B");
    }
  }

  // 环境类 包含一个策略实例，并在需要时调用策略对象的方法。
  class Context {
    private strategy: Strategy;

    // 设置具体的策略
    constructor(strategy: Strategy) {
      this.strategy = strategy;
    }

    // 执行策略
    contextInterface(){
      this.strategy.aligrithmInterface();
    }
  }

  (async () => {
    // 创建上下文对象, 并设置具体的策略
    const contextA: Context = new Context(new ConcreteStrategyA());
    // 执行策略
    contextA.contextInterface()

    const contextB: Context = new Context(new ConcreteStrategyB())
    contextB.contextInterface()
  })();
}
