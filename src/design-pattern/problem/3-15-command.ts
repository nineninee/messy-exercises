namespace Command {
  // 创建 readline 接口
  const rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const iter = rl[Symbol.asyncIterator]();
  const readline = async () => (await iter.next()).value;

  interface Command {
    execute(): void;
  }

  class OrderCommand implements Command {
    private receiver: DrinkMaker;
    private drinkName: string;

    constructor(receiver: DrinkMaker, drinkName: string) {
      this.receiver = receiver;
      this.drinkName = drinkName;
    }

    execute(): void {
      this.receiver.action(this.drinkName);
    }
  }

  class DrinkMaker {
    public action(drinkName: string): void {
      console.log(`${drinkName} is ready!`);
    }
  }

  class DrinkMachine {
    private command: Command;

    constructor(command: Command) {
      this.command = command;
    }

    public setCommand(command: Command): void {
      this.command = command;
    }

    public executeOrder(): void {
      this.command.execute();
    }
  }

  (async () => {
    let N = await readline();

    for (let i = 0; i < N; i++) {
      const drinkName: string = await readline();

      const drinkMachine: DrinkMachine = new DrinkMachine(
        new OrderCommand(new DrinkMaker(), drinkName)
      );

      drinkMachine.executeOrder();
    }
  })();
}
