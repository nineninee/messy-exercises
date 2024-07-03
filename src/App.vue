<template>
  <router-view />
  <!-- <HelloWorld msg="Hello Vue 3.0 + Vite" /> -->
  <!-- <NormalClass />
  <Singleton />
  <FactoryPattern /> -->
</template>

<script setup>
import HelloWorld from './components/HelloWorld.vue'
import NormalClass from './components/NormalClass.vue';
import Singleton from './components/Singleton.vue';
import FactoryPattern from './components/FactoryPattern.vue';

</script>

<style>
.el-main {
  height: calc( 100vh - 125px);
  overflow: hidden;
}
</style>
