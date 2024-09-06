const rl = require("readline").createInterface({ input: process.stdin });
const iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

class ShoppingCartManager {
  #cart = new Map()

  constructor(name) {
    if (ShoppingCartManager.instance) return ShoppingCartManager.instance

    this.name = name
    ShoppingCartManager.instance = this
  }

  static getInstance(name) {
    if (!this.instance) {
      return this.instance = new ShoppingCartManager(name);
    }
    return this.instance
  }

  addToCart(name, num) {
    if (this.#cart.has(name)) {
      this.#cart.set(name, this.#cart.get(name) + num)
    } else {
      this.#cart.set(name, num)
    }
  }

  viewCart() {
    for (let [key, value] of this.#cart) {
      console.log(`${key} ${value}`
      )
    }
  }
}

(async () => {
  let cart = ShoppingCartManager.getInstance()
  let n = await readline();
  while (n) {
    const [name, num] = n.split(' ')
    cart.addToCart(name, num)

    n = await readline();
  }
  cart.viewCart()
})()