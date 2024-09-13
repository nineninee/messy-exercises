namespace Test {
  class systemA {
    operationA(): void {
      console.log("operationA");
    }
  }

  class systemB {
    operationB(): void {
      console.log("operationB");
    }
  }

  class systemC {
    operationC(): void {
      console.log("operationC");
    }
  }

  class Facded {
    private systemA: systemA;
    private systemB: systemB;
    private systemC: systemC;

    constructor() {
      this.systemA = new systemA();
      this.systemB = new systemB();
      this.systemC = new systemC()
    }

    operation(): void {
      this.systemA.operationA();
      this.systemB.operationB();
      this.systemC.operationC();
    }
  }

  (async () => {
    const facded: Facded= new Facded();
    facded.operation();
  })();
}
