<template>
  <el-menu router default-active="2" class="el-menu-vertical" :collapse="isCollapse" @open="handleOpen" @close="handleClose" @select="handleSelect"
   	>
    <el-menu-item index="1" class="titleName">
      <el-icon>
        <Management />
      </el-icon>
      <template #title>lalalal</template>
    </el-menu-item>

    <el-sub-menu index="/viteBuildStructure" class="menu">
      <template #title>
        <el-icon>
          <Management />
        </el-icon>
        <span>vite打包结构控制</span>
      </template>
    </el-sub-menu>

    <el-sub-menu index="/hilightMenu" class="menu">
      <template #title>
        <el-icon>
          <Management />
        </el-icon>
        <span>滚动高亮-掘金滚动效果</span>
      </template>
    </el-sub-menu>

    <el-sub-menu index="/storePersist" class="menu">
      <template #title>
        <el-icon>
          <Management />
        </el-icon>
        <span>仓库持久化</span>
      </template>

      <el-menu-item index="/storePersist/pinia" class="menu">pinia</el-menu-item>
      <el-menu-item index="/storePersist/vuex" class="menu">vuex</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { ref, defineExpose } from "vue";
import { Management } from "@element-plus/icons-vue";
const { proxy } = getCurrentInstance();

const isCollapse = ref(false);

const handleSelect = (key, keyPath) => {
  console.log(key,keyPath);
  proxy.$router.push(key);
};

const handleOpen = (key, keyPath) => {
  // console.log(key, keyPath);
  proxy.$router.push(key);
};
const handleClose = (key, keyPath) => {
  // console.log(key, keyPath);
};

defineExpose({
  isCollapse,
});
</script>

<style scoped>
.el-menu-vertical,
.el-menu-vertical:not(.el-menu--collapse) {
  height: 100vh;
}

.titleName {
  font-size: 24px;
  font-weight: 600;
}

.menu {
  font-size: 14px;
}
</style>
