// 定义抽象产品
class Shape {
  draw() {
    throw new Error('Method draw must be implemented.');
  }
}

// 定义具体产品-圆形
class Circle extends Shape {
  draw() {
    console.log('Drawing a circle.');
  }
}

// 定义具体产品-方形
class Square extends Shape {
  draw() {
    console.log('drawing a square');
  }
}



// 定义抽象工厂
class ShapeFactory {
  createShape() {
    throw new Error('Method createShape must be implemented.');
  }
}

// 定义具体工厂-创建圆形
class CircleFactory extends ShapeFactory {
  createShape() {
    return new Circle();
  }
}

// 定义具体工厂-创建方形
class SquareFactory extends ShapeFactory {
  createShape() {
    return new Square();
  }
}


let circleFactory = new CircleFactory();
let circle = circleFactory.createShape();
circle.draw();

let squareFactory = new SquareFactory();
let square = squareFactory.createShape();
square.draw();

