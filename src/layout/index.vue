<template>
  <div class="common-layout">
    <el-container>
        <el-aside class="side"  width="collapse">
          <!-- 侧边栏 -->
          <NarBar ref="narbar"/>
        </el-aside>
      <el-container>
        <el-header height="125px">
                 <!-- 头部 -->
          <el-card class="box-card" >
            <HeaderContent ref="headerContent" @updateNarBar="updateNarBar"/>
          </el-card>
        </el-header>
        <el-main>
              <!-- 内容 -->
              <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import NarBar from './components/NarBar.vue';
import HeaderContent from './components/HeaderContent.vue';
 
import { ref } from 'vue';
const narbar = ref(null);
 
const updateNarBar = () => {
    narbar.value.isCollapse = !narbar.value.isCollapse;
}
 
</script>
 
<style>
*{
  padding: 0%;
  margin: 0%;
}
</style>