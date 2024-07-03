import { def } from "@vue/shared";
import { createStore } from "vuex";
import counter from './counter'
import text from './counter'
import persistPlugin from './persistPlugin'

const store = createStore({
  modules: {
    counter,
    text
  },
  // plugins其实就是一个函数，在store发生变化时，会将store作为参数传递给这个函数
  plugins: [persistPlugin]
})

export default store