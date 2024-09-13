namespace RentHouse {
  // 创建 readline 接口
  const rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const iter = rl[Symbol.asyncIterator]();
  const readline = async () => (await iter.next()).value;

  interface RentHouse {
    rent(area: number): void;
  }

  class Buyer implements RentHouse {
    rent(area: number): void {
      console.log("YES");
    }
  }

  class HousingAgent implements RentHouse {
    private buyer?: Buyer;

    rent(area: number): void {
      if (!this.buyer) {
        this.buyer = new Buyer();
      }

      if (area > 100) {
        this.buyer.rent(area);
      } else {
        console.log("NO");
      }
    }
  }

  (async () => {
    const N = await readline();

    const agent = new HousingAgent();

    for (let i = 0; i < N; i++) {
      const area = parseInt(await readline());
      agent.rent(area);
    }
  })();
}
