<template>
  <div style="height: 80%; width: 100%; border: 1px solid #999">
    <VirtualList :listData="data" :itemSize="100"/>
  </div>
</template>

<script setup>
import VirtualList from "./components/VirtualList.vue";
const { proxy } = getCurrentInstance();

const data = ref([])
for(let i = 0; i < 1000; i++){
  data.value.push({id: i, value: i})
}
</script>

<style scoped lang="scss"></style>
