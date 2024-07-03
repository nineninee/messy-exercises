<template>
  <div>
    <h1>Singleton</h1>
    <button @click="createInstanceOfSingleton">click to create a Singleton instance</button>
    <button @click="createInstanceOfSingleton2">click to create a Singleton instance again</button>
    <h3>{{ s1.params }}</h3><h3>{{ s2.params }}</h3>
    <h3>当前的实例是否相等：{{ s1 == s2 }}</h3>
  </div>
</template>
<script setup>
import { ref } from 'vue';
// class Singleton {
//   _instance = null;
//   constructor(type) {
//     this.type = type;
//   }
//   static getInstance() {
//     if (!Singleton._instance) {
//       Singleton.instance = new Singleton();
//     }
//     // 如果这个唯一的实例已经存在，则直接返回
//     return Singleton._instance;
//   }
// }

class Singleton {
  constructor(params) {
    if (typeof Singleton.instance === 'object') {
      return Singleton.instance
    }

    this.params = params
    Singleton.instance = this

    return this
  }
}

const s1 = ref({})
const s2 = ref({})
function createInstanceOfSingleton() {
  //  s1.value = Singleton.getInstance();
   s1.value = new Singleton({ name: 's1'});
   console.log(s1.value , s2.value);
}

function createInstanceOfSingleton2() {
  // s2.value = Singleton.getInstance();
  s2.value = new Singleton({ name: 's2'});
  console.log(s1.value , s2.value);
}
</script>

<style scoped lang="scss"></style>
