import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import store from './store'
import App from './App.vue'
import './index.css'
import '@/assets/styles/index.scss' // global css
// import '@/assets/output.css'  // 全局引入样式文件


const app = createApp(App)

app.use(router).use(store).use(ElementPlus).mount('#app')
