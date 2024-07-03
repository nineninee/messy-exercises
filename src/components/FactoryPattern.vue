<template>
  <div>
    <h1>Factory Pattern</h1>
    <input v-model="dishName"/>
    <input v-model="dishDescription"/>
    <button @click="addDish">Add Dish</button>
    <button @click="getDish">Get Dish</button>
    <button @click="removeDish">Remove Dish</button>
   <div v-for="(dish, dishName) in menu">{{ dishName }}: {{ dish }}</div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

class Restaurant{
  constructor(){
    this.menuData = {};
  }
  // 获取菜单
  getMenu(){
    return this.menuData;
  }
  // 获取菜品
  getDish(dishName){
    if(!this.menuData[dishName]){
      console.log('未获取到菜品');
      return null;
    }
    return this.menuData[dishName];
  }
  // 添加菜品
  addDish(dishName, description){
    if(!dishName){
      console.log('菜品名不能为空');
      return null;
    }
    if(!this.menuData[dishName]){
      this.menuData[dishName] = new Dish(dishName, description);
      console.log('菜品添加成功');
      return this.menuData[dishName];
    }
    console.log('菜品已存在');
    return null
  }
  // 移除菜品
  removeDish(dishName){
    if(!this.menuData[dishName]){
      console.log('未获取到菜品');
    }
    delete this.menuData[dishName];
  }
}
class Dish{
  constructor(name, description){
    this.name = name
    this.description = description
  }
  eat(){
    console.log(`我在吃${this.name}, 它${this.description}`)
  }
}


const dishName = ref('')
const dishDescription = ref('')
const restaurant =  ref(new Restaurant())
const menu = ref(restaurant.value.getMenu())

const addDish = () => {
  restaurant.value.addDish(dishName.value, dishDescription.value)
}
const getDish = () => {
  console.log(restaurant.value.getDish(dishName.value))
}
const removeDish = () => {
  restaurant.value.removeDish(dishName.value)
}

</script>

<style scoped lang='scss'>

</style>