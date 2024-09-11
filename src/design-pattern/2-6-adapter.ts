// 目标接口
interface Target {
  request(): void;
}

// 被适配者
class Adaptee {
  specificRequest(): void {
      console.log('Specific request');
  }
}

// 适配器类
class Adapter implements Target {
  private adaptee: Adaptee;

  constructor(adaptee: Adaptee) {
    this.adaptee = adaptee;
  }

  request(): void {
      this.adaptee.specificRequest();
  }
}

// 使用
const target = new Adapter(new Adaptee());
target.request();