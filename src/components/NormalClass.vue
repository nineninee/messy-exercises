<template>
  <div>
    <h1>NormalClass</h1>
    <button @click="creatNormalPerson">click to create a NormalPerson</button>
    <button @click="creatYellowPerson">click to create a  YellowPerson</button>
    
  </div>
</template>
<script setup>
class NormalPerson {
  //属性 #name 在类 NormalPerson 外部不可访问，因为它具有专用标识符
  #name = "李大玄";
  sex = "男";
  constructor(name, age) {
    this.name = name
    this.age = age;
  }
  getName() {
    return this.#name;
  }
  getSex() {
    return this.sex;
  }
  say() {
    console.log(`${this.name}说：我${this.age}岁了`);
  }
}


class YellowPerson extends NormalPerson {
  constructor(name, age){
    super(name, age)
  }
  getName(){
    // return this.#name
    return this.name
  }
  getSex(){
    return this.sex
  }
  say(){
    console.log(`${this.name}说：我${this.age}岁了，我是黄种人`);
  }
}

function creatNormalPerson() {
  const person1 = new NormalPerson("张三", 20);
  console.log(person1.getName());
  console.log(person1.getSex());
  person1.say();
}


function creatYellowPerson() {
  const person1 = new YellowPerson("黄恢弘", 10);
  console.log(person1.getName());
  console.log(person1.getSex());
  person1.say();
}
</script>

<style scoped lang="scss"></style>
