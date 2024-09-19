namespace UniversalRemoteControl {
  // 创建 readline 接口
  const rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const iter = rl[Symbol.asyncIterator]();
  const readline = async () => (await iter.next()).value;

  // 创建实现接口
  interface TV {
    on(): void;
    off(): void;
    turnChannel(): void;
  }

  // 创建具体实现类, 实现实现化接口
  class SonyTV implements TV {
    on(): void {
      console.log("Sony TV is ON");
    }
    off(): void {
      console.log("Sony TV is OFF");
    }
    turnChannel(): void {
      console.log("Switching Sony TV channel");
    }
  }

  class TCLTV implements TV {
    on(): void {
      console.log("TCL TV is ON");
    }
    off(): void {
      console.log("TCL TV is OFF");
    }
    turnChannel(): void {
      console.log("Switching TCL TV channel");
    }
  }

  // 创建抽象类: 包含一个对实现化接口的引用
  abstract class RemoteControl {
    protected tv: TV;

    constructor(tv: TV) {
      this.tv = tv;
    }

    public performOperation(): void {}
  }

  // 实现抽象接口
  class PowerOperation extends RemoteControl {
    constructor(tv: TV) {
      super(tv);
    }

    performOperation(): void {
      this.tv.on();
    }
  }

  class OFFOperation extends RemoteControl {
    constructor(tv: TV) {
      super(tv);
    }

    performOperation(): void {
      this.tv.off();
    }
  }

  class SwitchChannelOperation extends RemoteControl {
    constructor(tv: TV) {
      super(tv);
    }

    performOperation(): void {
      this.tv.turnChannel();
    }
  }

  (async () => {
    const N = await readline();
    for (let i = 0; i < N; i++) {
      const [type, action] = (await readline()).split(" ");
      let tv: TV | undefined, remoteControl: RemoteControl | undefined;

      if (type == "0") {
        tv = new SonyTV();
      } else if (type == "1") {
        tv = new TCLTV();
      }

      if (!tv) return;

      if (action == "2") {
        remoteControl = new PowerOperation(tv);
      } else if (action == "3") {
        remoteControl = new OFFOperation(tv);
      } else if (action == "4") {
        remoteControl = new SwitchChannelOperation(tv);
      }

      if (!remoteControl) return;

      remoteControl.performOperation();
    }
  })();
}
