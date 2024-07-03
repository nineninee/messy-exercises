<template>
  <div>
    <h2>vite打包结构控制</h2>
    <h4>
      vite作为脚手架或者构建工具，其内部使用了两个构建工具，一个是rollup，一个是esbuild。
    </h4>
    <p>
      能深度影响打包结果的是rollup，vite没有提供相关的打包控制，可以通过vite间接对rollup进行控制。
      --build.rollupOptions
    </p>
    <p>
      接下来就可以去rollup的官网查看build相关配置项：output等，可配置entryFileNames、
      chunkFileNames、 assetFileNames等项目。
    </p>
  </div>
</template>
<script setup></script>

<style scoped lang="scss"></style>
