const rl = require("readline").createInterface({ input: process.stdin });
const iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

// Aluminum Frame  Knobby Tires
// Carbon Frame Slim Tires

// mountain road

class Bike {
  frame
  tires
  setFrame(frame) {
    this.frame = frame
  }
  setTires(tires) {
    this.tires = tires
  }
  toString() {
    return `${this.frame} ${this.tires}`
  }
}

class BikeBuilder {
  buildFrame() { }
  buildTires() { }
  getResult() { }
}

class MountainBikeBuilder extends BikeBuilder {
  bike

  constructor() {
    super()
    this.bike = new Bike()
  }

  buildFrame(){
    this.bike.setFrame('Aluminum Frame')
  }

  buildTires(){
    this.bike.setTires('Knobby Tires')
  }

  getResult() {
    return this.bike
  }
}

class RoadBikeBuilder extends BikeBuilder {
  bike

  constructor() {
    super()
    this.bike = new Bike()
  }

  buildFrame(){
    this.bike.setFrame('Carbon Frame')
  }

  buildTires(){
    this.bike.setTires('Slim Tires')
  }

  getResult() {
    return this.bike
  }
}

class Director {
  builder

  constructor(builder) {
    this.builder = builder
  }

  construct() {
    this.builder.buildFrame()
    this.builder.buildTires()
    return this.builder.getResult()
  }
}

(async () => {
  let N = await readline()

  let director, builder
  for (let i = 0; i < N; i++) {
    const type = await readline()

    builder = type === 'mountain' ? new MountainBikeBuilder() : new RoadBikeBuilder()
    director = new Director(builder)

    const bike = director.construct()
    console.log(bike.toString())
  }
})()


// 3
// mountain
// road
// mountain