namespace DecoratorPattern {

  // 组件接口
  interface Component {
    operation(): void;
  }

  // 具体组件
  class ConcreteComponent implements Component {
    operation(): void {
      console.log('ConcreteComponent operation');
    }
  }

  // 定义Decorator装饰类, 继承自Component
  abstract class Decorator implements Component {
    protected component: Component;

    constructor(component: Component) {
      this.component = component;
    }

    operation(): void {
      this.component.operation();
    }
  }

  // 定义具体的装饰者实现, 给具体组件添加功能
  class ConcreteDecorator extends Decorator {
    constructor(component: Component) {
      super(component);
    }

    operation(): void{
      // 在调用具体组件方法之前, 可以添加自己的操作
      console.log('ConcreteDecorator operation before');
      super.operation();
      // 在调用具体组件方法之后, 可以添加自己的操作
      console.log('ConcreteDecorator operation after');
    }
  }

  // 使用
  (async () => {
    const component = new ConcreteComponent();
    const decorator = new ConcreteDecorator(component);
    decorator.operation();
  })();
}
