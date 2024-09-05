/**********************只能通过类访问单例对象**********************/
// class Singleton {
//   constructor(name) {
//     this.name = name
//   }

//   static getInstance(name) {
//     if (!this.instance) {
//       return this.instance = new Singleton(name);
//     }
//     return this.instance
//   }
// }

// // var w1 = Singleton.getInstance('mysql1')
// // var w2 = Singleton.getInstance('mysql2')
// // var w2 = Singleton.getInstance('mysql3')


/**********************可以通过类和new访问单例对象**********************/
class Singleton {
  constructor(name) {
    if (Singleton.instance) return Singleton.instance
    Singleton.instance = this
    this.name = name
  }

  static getInstance(name) {
    if (!this.instance) {
      return this.instance = new Singleton(name);
    }
    return this.instance
  }
}

let s1 = new Singleton('mysql1')
let s2 = new Singleton('mysql2')
console.log(s1 === s2); // true

var w1 = Singleton.getInstance('mysql1')
var w2 = Singleton.getInstance('mysql2')
console.log(w1 === w2); // true