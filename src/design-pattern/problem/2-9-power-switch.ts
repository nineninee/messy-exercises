namespace PowerSwitch {
  // 创建 readline 接口
  const rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const iter = rl[Symbol.asyncIterator]();
  const readline = async () => (await iter.next()).value;

  class AirConditionerController {
    turnOff(): void {
      console.log("Air Conditioner is turned off.");
    }
  }

  class DeskLampController {
    turnOff(): void {
      console.log("Desk Lamp is turned off.");
    }
  }

  class Televisioncontroller {
    turnOff(): void {
      console.log("Television is turned off.");
    }
  }

  class Facded {
    private AirConditionerController: AirConditionerController;
    private DeskLampController: DeskLampController;
    private Televisioncontroller: Televisioncontroller;

    constructor() {
      this.AirConditionerController = new AirConditionerController();
      this.DeskLampController = new DeskLampController();
      this.Televisioncontroller = new Televisioncontroller();
    }

    operation(type: string): void {
      if (type == "1") {
        this.AirConditionerController.turnOff();
      } else if (type == "2") {
        this.DeskLampController.turnOff();
      } else if (type == "3") {
        this.Televisioncontroller.turnOff();
      } else if (type == "4") {
        console.log("All devices are off.");
      } else {
        console.log("Invalid input.");
      }
    }
  }

  (async () => {
    const facded: Facded = new Facded();

    const N = await readline();
    for (let i = 0; i < N; i++) {
      const type = await readline();
      facded.operation(type);
    }
  })();
}
