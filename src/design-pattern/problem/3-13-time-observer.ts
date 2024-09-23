namespace TimeObserver {
  // 创建 readline 接口
  const rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const iter = rl[Symbol.asyncIterator]();
  const readline = async () => (await iter.next()).value;

  // 主题接口
  interface Subject {
    // 注册观察者
    registerObserver(observer: Observer): void;
    // 移除观察者
    removeObserver(observer: Observer): void;
    // 通知观察者
    notifyObserver(message: string): void;
  }

  // 观察者接口-观察者
  interface Observer {
    // 更新信息
    update(message: string): void;
  }

  // 具体主题-时钟
  class Clock implements Subject {
    private students: Observer[] = [];
    private time: string = "";

    // 注册观察者
    registerObserver(observer: Observer): void {
      this.students.push(observer);
    }

    // 移除观察者
    removeObserver(observer: Observer): void {
      this.students = this.students.filter((item) => item !== observer);
    }

    // 通知观察者
    notifyObserver(): void {
      this.students.forEach((observer) => {
        observer.update(this.time);
      });
    }

    // 设置时间
    setTime(time: string): void {
      this.time = time;
      this.notifyObserver();
    }
  }

  // 具体观察者-学生
  class Student implements Observer {
    private name: string;

    constructor(name: string) {
      this.name = name;
    }

    // 更新信息
    update(message: string): void {
      console.log(`${this.name} ${message}`);
    }
  }

  // 客户端代码
  (async () => {
    //  创建时钟对象
    const clock: Clock = new Clock();

    // 读取输入
    const N = await readline();
    for (let i = 0; i < N; i++) {
      const name = await readline();

      // 创建观察者对象
      const student: Student = new Student(name);

      // 注册观察者
      clock.registerObserver(student);
    }

    // 设置时间
    const M = await readline();
    for (let i = 0; i < M; i++) {
      clock.setTime(String(i + 1));
    }
  })();
}
