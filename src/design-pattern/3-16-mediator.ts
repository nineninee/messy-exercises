namespace Mediator {
  // 抽象中介者
  abstract class Mediator {
    public register(colleague: Colleague): void {}
    // 定义一个抽象的发送消息方法
    public abstract send(message: string, colleague: Colleague): void;
  }

  // 具体中介者
  class ConcreteMediator extends Mediator {
    private colleagues: Colleague[] = [];

    public register(colleague: Colleague): void {
      this.colleagues.push(colleague);
    }

    public send(message: string, colleague: Colleague): void {
      this.colleagues.forEach((c) => {
        if (c != colleague) {
          c.receive(message);
        }
      });
    }
  }

  // 同事对象
  abstract class Colleague {
    protected mediator: Mediator;

    constructor(mediator: Mediator) {
      this.mediator = mediator;
    }

    public abstract send(message: string): void;

    public abstract receive(message: string): void;
  }
  // 具体同事对象1
  class ConcreteColleague1 extends Colleague {
    constructor(mediator: Mediator) {
      super(mediator);
    }

    public send(message: string): void {
      this.mediator.send(message, this);
    }

    public receive(message: string): void {
      console.log("ConcreteColleague1 received: " + message);
    }
  }
  // 具体同事对象2
  class ConcreteColleague2 extends Colleague {
    constructor(mediator: Mediator) {
      super(mediator);
    }

    public send(message: string): void {
      this.mediator.send(message, this);
    }

    public receive(message: string): void {
      console.log("ConcreteColleague2 received: " + message);
    }
  }

  (async () => {
    // 创建中介者
    const mediator = new ConcreteMediator();

    // 创建同事对象
    const colleague1 = new ConcreteColleague1(mediator);
    const colleague2 = new ConcreteColleague2(mediator);

    // 将同事对象注册到中介者
    mediator.register(colleague1);
    mediator.register(colleague2);

    // 同事对象发送消息
    colleague1.send("Hello, colleague2!");
    colleague2.send("Hi, colleague1!");
  })();
}
