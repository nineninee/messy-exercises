// 1. 定义抽象主题, 一般是接口或者抽象类, 声明真是主题和代理对象实现的业务方法
interface Subject {
  request(): void;
}

// 2. 定义真实主题, 实现抽象主题的具体业务
class RealSubject implements Subject {
  request(): void {
    console.log("RealSubject handles the request");
  }
}

// 3. 定义代理类, 包含对RealSubject的引用, 并提供和真实主题相同的接口, 这样代理就可以替代真实主题, 并对真实主题进行功能拓展;
// 定义代理
class MyProxy implements Subject {
  // 包含一个引用
  private realSubject?: RealSubject;  // ?标识可选属性

  // // 代理类构造函数
  // constructor(subject?: RealSubject) {  // ?标识可选参数
  //   this.realSubject = subject;
  // }

  request(): void {
    // 在访问真实主题之前可以添加额外的逻辑
    if (!this.realSubject) {
      this.realSubject = new RealSubject();
    }

    // 调用真实主题的方法
    this.realSubject.request();

    // 在访问真实主题之后可以添加额外的逻辑
  }
}

// 4. 使用代理类
const proxy: MyProxy = new MyProxy()
proxy.request()