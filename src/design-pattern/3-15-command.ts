namespace Commadn {

  // 定义执行操作的接口：包含一个execute方法。有的时候还会包括unExecute方法，表示撤销命令。
  interface Command {
    execute(): void;
    undo(): void;
  }

  // 实现命令接口，执行具体的操作
  class ConreteCommand implements Command {
    private receiver: Receiver;

    constructor(receiver: Receiver) {
      this.receiver = receiver;
    }

    execute() {
      this.receiver.action();
    }

    undo() {
      console.log("撤销");
    }
  }

  // 定义接受者类，知道如何实施与执行一个请求相关的操作。
  class Receiver {
    action() {
      console.log("Receiver");
    }
  }

  // 定义调用者类，调用命令对象执行请求。
  class Invoker {
    private commandQueue: Command[] = [];
    private undoStack: Command[] = [];

    constructor() {
      this.commandQueue = [];
      this.undoStack = [];
    }

    // 设置命令并执行
    setAndExecuteCommand(command: Command) {
      command.execute();

      // 加入队列
      this.commandQueue.unshift(command);

      // 加入栈中
      this.undoStack.push(command);
    }

    // 撤销上一个命令
    undoLastCommand() {
      if (this.undoStack.length) {
        // 从栈中移除
        const command = this.undoStack.pop();

        // 撤销执行
        command && command.undo(); //需要命令类实现undo方法

        // 从队列中删除
        this.commandQueue.shift();
      } else {
        console.log("没有可撤销的命令");
      }
    }

    // 执行命令队列中的所有命令
    executeCommandsInQueue() {
      for (let command of this.commandQueue) {
        command.execute();
      }
    }
  }

  // 调用者类中可以维护一个命令队列或者“撤销栈”，以支持批处理和撤销命令。

  (async () => {
    const receiver: Receiver = new Receiver();

    const command1: Command = new ConreteCommand(receiver);
    const command2: Command = new ConreteCommand(receiver);
    const command3: Command = new ConreteCommand(receiver);

    const invoker: Invoker = new Invoker();
    invoker.setAndExecuteCommand(command1);

    invoker.undoLastCommand();
    invoker.undoLastCommand();

    invoker.setAndExecuteCommand(command2);
    invoker.setAndExecuteCommand(command3);

    invoker.executeCommandsInQueue();
  })();
}
