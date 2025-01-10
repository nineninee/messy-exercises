namespace Test {
  // 创建 readline 接口
  const rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const iter = rl[Symbol.asyncIterator]();
  const readline = async () => (await iter.next()).value;

  // 备忘录
  class Memento {
    private value: number;
    constructor(value: number) {
      this.value = value;
    }
    getValue(): number {
      return this.value;
    }
  }

  // 发起人
  class Counter {
    private value: number;
    private undoStack: Memento[] = [];
    private redoStack: Memento[] = [];

    constructor(value: number) {
      this.value = value;
    }

    public increment(): void {
      this.redoStack.length = 0;
      this.undoStack.push(new Memento(this.value));
      this.value++;
    }

    public decrement(): void {
      this.redoStack.length = 0;
      this.undoStack.push(new Memento(this.value));
      this.value--;
    }

    public undo(): void {
      if (this.undoStack.length > 0) {
        this.redoStack.push(new Memento(this.value));
        this.value = this.undoStack.pop()!.getValue();
      }
    }

    public redo(): void {
      if (this.redoStack.length > 0) {
        this.undoStack.push(new Memento(this.value));
        this.value = this.redoStack.pop()!.getValue();
      }
    }

    public getValue(): number {
      return this.value;
    }
  }

  (async () => {
    const counter = new Counter(0);

    // 发送消息并输出
    let line;
    while ((line = await readline())) {
      const operation = line;
      switch (operation) {
        case "Increment":
          counter.increment();
          break;
        case "Decrement":
          counter.decrement();
          break;
        case "Undo":
          counter.undo();
          break;
        case "Redo":
          counter.redo();
          break;
      }
      console.log(counter.getValue());
    }
  })();
}
