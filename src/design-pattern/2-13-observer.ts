namespace Test {
  // 创建 readline 接口
  // const rl = require("readline").createInterface({
  //   input: process.stdin,
  //   output: process.stdout,
  // });
  // const iter = rl[Symbol.asyncIterator]();
  // const readline = async () => (await iter.next()).value;

  // 主题接口-主题
  interface Subject {
    // 注册观察者
    registerObserver(observer: Observer): void;
    // 移除观察者
    removeObserver(observer: Observer): void;
    // 通知观察者
    notifyObserver(message: string): void;
  }

  // 观察者接口-观察者
  interface Observer {
    // 更新方法
    update(message: string): void;
  }

  // 具体主题实现
  class ConcreteSubject implements Subject {
    private observers: Array<Observer> = new Array<Observer>()

    private state: string = ''

    // 注册观察者
    registerObserver(observer: Observer): void {
      this.observers.push(observer)
    }

    // 移除观察者
    removeObserver(observer: Observer): void {
      const index = this.observers.indexOf(observer)
      if (index > -1) {
        this.observers.splice(index, 1)
      }
    }

    // 通知观察者
    notifyObserver(): void {
      this.observers.forEach(observer => {
        observer.update(this.state)
      })
    }

    // 设置状态
    setState(state: string): void {
      this.state = state
      this.notifyObserver()
    }
  }

  // 具体观察者实现
  class ConcreteObserver implements Observer {
    update(message: string): void {}
  }

  // 客户端代码
  (async () => {})();
}
