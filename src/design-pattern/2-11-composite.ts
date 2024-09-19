namespace Test {
  // 组件接口
  interface Component {
    operation(): void;
  }

  // 叶子组件
  class Leaf implements Component {
    operation() {
      console.log("执行叶子组件操作");
    }
  }

  // 组合组件: 包含叶子节点操作的行为
  class Composite implements Component {
    protected componentList: Array<Component> = new Array<Component>();

    add(component: Component) {
      this.componentList.push(component);
    }

    remove(component: Component) {
      this.componentList = this.componentList.filter(
        (item) => item !== component
      );
    }

    operation() {
      for (const component of this.componentList) {
        component.operation();
      }
    }
  }

  (async () => {
    const leaf = new Leaf();
    const composite = new Composite();
    composite.add(leaf);
    composite.operation();

    const leaf2 = new Leaf();
    composite.add(leaf2);
    composite.operation();

    composite.remove(leaf);
    composite.operation();
  })();
}
