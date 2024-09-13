namespace CoffeeWithSugar {
  // 创建 readline 接口
  const rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const iter = rl[Symbol.asyncIterator]();
  const readline = async () => (await iter.next()).value;

  interface Coffee {
    make(): void;
  }

  class BlackCoffee implements Coffee {
    make(): void {
      console.log("Brewing Black Coffee");
    }
  }

  class Latte implements Coffee {
    make(): void {
      console.log("Brewing Latte");
    }
  }

  abstract class CoffeeMachine implements Coffee {
    protected coffee: Coffee;

    constructor(coffee: Coffee) {
      this.coffee = coffee;
    }

    make(): void {
      this.coffee.make();
    }
  }

  class MilkCoffeeMachine extends CoffeeMachine {
    constructor(coffee: Coffee) {
      super(coffee);
    }

    make(): void {
      super.make();
      console.log("Adding Milk");
    }
  }

  class SugarCoffeeMachine extends CoffeeMachine {
    constructor(coffee: Coffee) {
      super(coffee);
    }

    make(): void {
      super.make();
      console.log("Adding Sugar");
    }
  }

  (async () => {
    while (true) {
      const [type, option] = (await readline()).split(" ");
      const coffee: Coffee = type === "1" ? new BlackCoffee() : new Latte();
      const machine: CoffeeMachine =
        option === "1"
          ? new MilkCoffeeMachine(coffee)
          : new SugarCoffeeMachine(coffee);
      machine.make();
    }
  })();
}
