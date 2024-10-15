namespace Memento {
  // 创建发起人类: 可以创建备忘录对象
  class Originator {
    private state: string;
    constructor(state: string){
      this.state = state;
    }
    public getState(): string {
      return this.state;
    }
    public setState(state: string): void {
      this.state = state;
    }
    public createMemento(): Memento {
      return new Memento(this.state);
    }
    public restoreFromMemento(memento: Memento): void{
      this.state = memento.getState()
    }
  }

  // 创建备忘录类：保存发起人对象的状态
  class Memento {
    private state: string;
    constructor(state: string) {
      this.state = state;
    }
    public getState(): string {
      return this.state;
    }
  }

  // 创建备忘录管理类：保存备忘录对象
  class Caretaker {
    private mementos: Array<Memento> = new Array<Memento>();

    public addMemento(memento: Memento): void{
      this.mementos.push(memento);
    }

    public getMemento(index: number): Memento {
      return this.mementos[index];
    }
  }

  (async () => {
    // 创建发起人类对象
    const originator = new Originator('State 1')

    // 创建备忘录管理对象
    const caretaker = new Caretaker()

    // 保存备忘录对象
    caretaker.addMemento(originator.createMemento())

    // 修改发起人类对象的状态
    originator.setState('State 2')

    // 保存备忘录对象
    caretaker.addMemento(originator.createMemento())

    // 恢复备忘录对象
    originator.restoreFromMemento(caretaker.getMemento(0))

    console.log(originator.getState())
  })();
}
