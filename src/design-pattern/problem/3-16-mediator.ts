namespace Mediator {
  // 创建 readline 接口
  const rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const iter = rl[Symbol.asyncIterator]();
  const readline = async () => (await iter.next()).value;

  // 抽象中介者
  interface ChatRoomMediator {
    sendMessage(sender: string, message: string): void;
    addUser(user: ChatUser): void;
    getUsers(): Map<string, ChatUser>;
  }

  // 具体中介者
  class ChatRoomMediatorImpl implements ChatRoomMediator {
    private users: Map<string, ChatUser> = new Map();

    sendMessage(sender: string, message: string): void {
      this.users.forEach((user, name) => {
        if (name !== sender) {
          user.receiveMessage(sender, message);
        }
      });
    }

    addUser(user: ChatUser): void {
      this.users.set(user.getName(), user);
    }

    getUsers(): Map<string, ChatUser> {
      return this.users;
    }
  }

  // 抽象同事类
  abstract class ChatUser {
    private mediator: ChatRoomMediator;
    private name: string;
    private receivedMessages: string[] = [];

    constructor(name: string, mediator: ChatRoomMediator) {
      this.name = name;
      this.mediator = mediator;
      mediator.addUser(this);
    }

    getName(): string {
      return this.name;
    }

    sendMessage(message: string): void {
      this.mediator.sendMessage(this.name, message);
    }

    abstract receiveMessage(sender: string, message: string): void;

    getReceivedMessages(): string[] {
      return this.receivedMessages;
    }

    addReceivedMessage(message: string): void {
      this.receivedMessages.push(message);
    }
  }

  // 具体同事类
  class ConcreteChatUser extends ChatUser {
    constructor(name: string, mediator: ChatRoomMediator) {
      super(name, mediator);
    }

    receiveMessage(sender: string, message: string): void {
      const receivedMessage = this.getName() + " received: " + message;
      this.addReceivedMessage(receivedMessage);
      console.log(receivedMessage);
    }
  }

  (async () => {
    const mediator: ChatRoomMediator = new ChatRoomMediatorImpl();

    const N = await readline();
    // console.log(N);

    const userNames = (await readline()).split(" ");
    // console.log(userNames);

    // 创建用户对象
    for (const userName of userNames) {
      new ConcreteChatUser(userName, mediator);
    }

    // 发送消息并输出
    let line;
    while ((line = await readline())) {
      const [senderName, message] = line.split(" ");
      // console.log(senderName, message);

      const user = mediator.getUsers().get(senderName);
      if (user != undefined) {
        user.sendMessage(message);
      }
    }
  })();
}
