<template>
  <div class="h-full">
    <el-row class="flex flex-row h-full">
      <el-col :span="8" class="h-full">
        <div class="flex flex-col justify-start align-start">
          <div
            class="toc"
            v-for="item in list"
            :style="{ 'margin-left': size(item.layer) }"
          >
            <a :href="`#section-${item.id}`" class="">{{ item.title }}</a>
          </div>
        </div>
      </el-col>
      <el-divider class="h-full" direction="vertical" />
      <el-col
        :span="15"
        class="h-full pr-5 context overy-auto"
        @scroll="debounceScroll"
      >
        <div :id="`section-${item.id}`" v-for="item in list">
          <div style="height: 1200px;background-color: antiquewhite;">{{ item.content }}</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
const { proxy } = getCurrentInstance();
import { useDebounceFn } from "@vueuse/core";

const list = ref([
  {
    id: 1,
    layer: 1,
    title: "标题1",
    content: "内容1",
  },
  {
    id: 2,
    layer: 1,
    title: "标题2",
    content: "内容2",
  },
  {
    id: "2-1",
    layer: 2,
    title: "标题2.1",
    content: "内容2.1",
  },
  {
    id: "2-2",
    layer: 2,
    title: "标题2.2",
    content: "内容2.2",
  },
  {
    id: 3,
    layer: 1,
    title: "标题3",
    content: "内容3",
  },
  {
    id: "3-1",
    layer: 2,
    title: "标题3.1",
    content: "内容3.1",
  },
]);

// 高亮指定元素
function highlight(id) {
  // 去掉其他高亮元素
  document
    .querySelectorAll("a.highlight")
    .forEach((a) => a.classList.remove("highlight"));

  // 高亮当前元素
  if (id instanceof HTMLElement) {
    id.classList.add("highlight");
  }
  if (id.startsWith("#")) {
    id = id.substring(1);
  }
  document.querySelector(`a[href="#${id}"]`).classList.add("highlight");
}

const titles = [];
proxy.$nextTick(() => {
  // 获取所有目录里面的a元素
  const links = document.querySelectorAll('.toc a[href^="#"]');

  for (const link of links) {
    link.addEventListener("click", (e) => {
      highlight(link);
    });

    const url = new URL(link.href); // 获得a标签的hash值
    const dom = document.querySelector(url.hash);
    if (dom) {
      titles.push(dom);
    }
  }

  highlight(titles[0].id);
});


const debounce = (fn, delay = 500) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

const handleScroll = (e) => {
  console.log('scroll');
  const rects = titles.map((title) => title.getBoundingClientRect());
  const topRange = 300;

  for (let i = 0; i < titles.length; i++) {
    const rect = rects[i];
    const title = titles[i];
    if (rect.top > 0 && rect.top < topRange) {
      highlight(title.id);
      break;
    }
    if(rect.top < 0 && rects[i + 1] && rects[ i+ 1].top > document.documentElement.clientHeight){
      highlight(title.id);
      break;
    }
  }
};

const debounceScroll = debounce(handleScroll, 100);

//动态计算缩进大小
const size = (num) => {
  return num * 10 + "px";
};

const jump = (index) => {
  let target = document.getElementById(index).offsetTop;
  if (target) {
    window.scrollTo({
      top: target - 80,
    });
  }
};
</script>

<style scoped lang="scss">
.highlight {
  color: #409eff;
  font-weight: bold;
}
</style>
