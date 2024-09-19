namespace CompanyOrganizationalStructure {
  // 创建 readline 接口
  const rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const iter = rl[Symbol.asyncIterator]();
  const readline = async () => (await iter.next()).value;

  // 组织接口
  interface Component {
    display(depth?: number): void;
  }

  // 部门
  class Department implements Component {
    private name: string;
    private children: Array<Component>;

    constructor(name: string) {
      this.name = name;
      this.children = new Array<Component>();
    }

    public add(component: Component): void {
      this.children.push(component);
    }

    public display(depth: number): void {
      let indent: string = "";
      for (let i = 0; i < depth; i++) {
        indent += "  ";
      }

      console.log(`${indent}${this.name}`);

      for (let child of this.children) {
        child.display(depth + 1);
      }
    }
  }

  // 员工
  class Employee implements Component {
    private name: string;

    constructor(name: string) {
      this.name = name;
    }

    public display(depth: number): void {
      let indent: string = "";
      for (let i = 0; i < depth; i++) {
        indent += "  ";
      }
      console.log(`${indent}  ${this.name}`);
    }
  }

  // 公司
  class Company implements Component {
    private name: string;
    private root: Department;

    constructor(name: string) {
      this.name = name;
      this.root = new Department(name);
    }

    public add(component: Component): void {
      this.root.add(component);
    }

    public display(): void {
      console.log("Company Structure:");

      this.root.display(0);
    }
  }

  (async () => {
    // 创建公司
    const companyName = await readline();
    const company = new Company(companyName);

    const N = await readline();

    for (let i = 0; i < N; i++) {
      const line = await readline();
      const [type, name] = line.split(" ");
      if (type === "D") {
        const department = new Department(name);
        company.add(department);
      } else if (type === "E") {
        const employee = new Employee(name);
        company.add(employee);
      }
    }

    company.display();
  })();
}

// MyCompany
// 8
// D HR
// E HRManager
// D Finance
// E AccountantA
// E AccountantB
// D IT
// E DeveloperA
// E DeveloperB
