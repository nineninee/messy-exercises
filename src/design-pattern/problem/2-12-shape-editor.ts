namespace ShapeEditor {
  // 创建 readline 接口
  const rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const iter = rl[Symbol.asyncIterator]();
  const readline = async () => (await iter.next()).value;

  enum ShapeType {
    CIRCLE,
    SQUARE,
    RECTANGLE,
  }

  class Position {
    private x: number;
    private y: number;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }

    getX() {
      return this.x;
    }

    getY() {
      return this.y;
    }
  }

  // 定义享元结构: 接受外部状态并作为参数进行处理
  interface Shape {
    draw(position: Position): void;
  }

  // 实现具体享元类, 存储内部状态
  class ConcreteShape implements Shape {
    private shapeType: ShapeType;

    constructor(shapeType: ShapeType) {
      this.shapeType = shapeType;
    }

    draw(position: Position): void {
      console.log(
        this.shapeType +
          (this.isFirstTime ? " drawn" : " shared") +
          " at (" +
          position.getX() +
          ", " +
          position.getY() +
          ")"
      );
    }

    private isFirstTime: boolean = true;

    setFirstTime(isFirstTime: boolean) {
      this.isFirstTime = isFirstTime;
    }
  }

  // 创建享元工厂类, 创建并管理Flyweight对象, 当用户请求一个Flyweight时, 享元工厂会提供一个已经创建的的实例或者创建一个
  class ShapeFactory {
    private shapes: Map<ShapeType, Shape> = new Map();

    public getFlyweight(key: ShapeType) {
      if (!this.shapes.has(key)) {
        this.shapes.set(key, new ConcreteShape(key));
      }
      return this.shapes.get(key);
    }
  }

  // 客户端代码
  (async () => {
    const factory: ShapeFactory = new ShapeFactory();

    rl.on("line", (line: any) => {
      let [shapeType, x, y] = line.split(" ");

      const shape: ConcreteShape = factory.getFlyweight(
        shapeType as ShapeType
      ) as ConcreteShape;
      shape.draw(new Position(parseInt(x), parseInt(y)));
      shape.setFirstTime(false);
    });
  })();
}

// CIRCLE 10 20
// RECTANGLE 30 40
// CIRCLE 15 25
// TRIANGLE 5 15
// CIRCLE 10 20
// RECTANGLE 30 40
