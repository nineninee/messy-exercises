namespace Test {
  // // 创建 readline 接口
  // const rl = require("readline").createInterface({
  //   input: process.stdin,
  //   output: process.stdout,
  // });
  // const iter = rl[Symbol.asyncIterator]();
  // const readline = async () => (await iter.next()).value;

  // 创建实现接口
  interface Implementation {
    operationImpl(): void;
  }

  // 创建具体实现类: 实际提供服务的对象
  class ConcreteImplementationA implements Implementation {
    operationImpl(): void {
      console.log(
        "ConcreteImplementationA: Here's the result in a concrete way."
      );
    }
  }

  class ConcreteImplementationB implements Implementation {
    operationImpl(): void {
      console.log(
        "ConcreteImplementationB: Here's the result in a concrete way."
      );
    }
  }

  // 创建抽象接口: 包含一个对实现化接口的引用
  abstract class Abstraction {
    protected implementation: Implementation;

    constructor(implementation: Implementation) {
      this.implementation = implementation;
    }

    public operation() {
      this.implementation.operationImpl();
    }
  }

  // 实现抽象接口: 创建RefinedAbstraction类，该类通过将工作委派给实现对象来定义一个额外的操作
  class RefinedAbstraction extends Abstraction {
    constructor(implementation: Implementation) {
      super(implementation);
    }

    public operation() {
      this.implementation.operationImpl();
    }
  }

  (async () => {
    const concreteImplementationA = new ConcreteImplementationA();
    const concreteImplementationB = new ConcreteImplementationB();

    const refinedAbstractionA = new RefinedAbstraction(concreteImplementationA);
    const refinedAbstractionB = new RefinedAbstraction(concreteImplementationB);

    refinedAbstractionA.operation();
    refinedAbstractionB.operation();
  })();
}


/**********************以电视机和遥控器举例**********************/
namespace Test1 {
  // 创建实现接口---电视机
  interface TV {
    on(): void;
    off(): void;
    turnChannel(): void;
  }

  // 创建具体实现类: 实际提供服务的对象---不同品牌的电视机
  class SonyTV implements TV {
    on(): void {
      console.log("SonyTV: on");
    }

    off(): void {
      console.log("SonyTV: off");
    }

    turnChannel(): void {
      console.log("SonyTV: turnChannel");
    }
  }

  class LGTV implements TV {
    on(): void {
      console.log("LGTV: on");
    }

    off(): void {
      console.log("LGTV: off");
    }

    turnChannel(): void {
      console.log("LGTV: turnChannel");
    }
  }

  // 创建抽象接口: 包含一个对实现化接口的引用---创建遥控器, 控制电视机
  abstract class RemoteControl {
    protected tv: TV;

    constructor(tv: TV) {
      this.tv = tv;
    }

    turnOn(): void {
      this.tv.on();
    }

    turnOff(): void {
      this.tv.off();
    }

    changeChannel(): void {
      this.tv.turnChannel();
    }
  }

  // 实现抽象接口---实现遥控器类
  class BasicRemoteControl extends RemoteControl {
    constructor(tv: TV) {
      super(tv);
    }

    turnOn(): void {
      this.tv.on();
    }
    turnOff(): void {
      this.tv.off();
    }
    changeChannel(): void {
      this.tv.turnChannel();
    }
  }

  (async () => {
    const sonyTV = new SonyTV();
    const lgTV = new LGTV();

    const sonyTVController = new BasicRemoteControl(sonyTV);
    const lgTVController = new BasicRemoteControl(lgTV);

    sonyTVController.turnOn();
    sonyTVController.turnOff();
    sonyTVController.changeChannel();

    lgTVController.turnOn();
    lgTVController.turnOff();
    lgTVController.changeChannel();
  })();
}
