namespace SupermarketDiscount {
  const r1 = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const iter = r1[Symbol.asyncIterator]();
  const readline = async () => (await iter.next()).value;

  abstract class DiscountStrategy  {
    abstract compute(price: number): number;
  }

  class StrategyA extends DiscountStrategy  {
    compute(price: number) {
      return Math.round(price * 0.9);
    }
  }

  class StrategyB extends DiscountStrategy  {
    compute(price: number): number {
      switch (true) {
        case price >= 100 && price < 150:
          return price - 5;
        case price >= 150 && price < 200:
          return price - 15;
        case price >= 200 && price < 300:
          return price - 25;
        case price >= 300:
          return price - 40;
        default:
          return price;
      }
    }
  }

  class DiscountContext  {
    private strategy: DiscountStrategy ;

    constructor(strategy: DiscountStrategy ) {
      this.strategy = strategy;
    }

    setStrategy(strategy: DiscountStrategy ) {
      this.strategy = strategy;
    }

    applyDiscount(price: number) {
      return this.strategy.compute(price);
    }
  }

  (async () => {
    const N = await readline();
    for (let i = 0; i < Number(N); i++) {
      const [price, strategy] = (await readline()).split(" ").map(Number);
      const context = new DiscountContext (strategy == 1 ? new StrategyA() : new StrategyB());
      console.log(context.applyDiscount(price));
    }
  })();
}

// 4
// 100 1
// 200 2
// 300 1
// 300 2
