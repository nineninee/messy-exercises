// 创建 readline 接口
const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
const iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

// 定义计算机端口接口
interface ComputerPort {
  connect(): void;
}

// TypeC接口类实现ComputerPort接口
class TypeC implements ComputerPort {
  connect(): void {
    console.log("TypeC");
  }
}

// USB设备类
class USBDevice {
  connectUSB(): void {
    console.log("USB Adapter");
  }
}

// TypeC到USB适配器类
class TypeCToUSBAdapter extends USBDevice implements ComputerPort {
  connect(): void {
    super.connectUSB();
  }
}

(async () => {
  let N = await readline();

  const map = new Map<string, ComputerPort>()
  map.set("1", new TypeC())
      .set("2", new TypeCToUSBAdapter())
  for (let i = 0; i < N; i++) {
    const type = await readline();
    map.get(type)?.connect()
  }
})();
