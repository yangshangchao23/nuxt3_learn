// 插件用例：访问Vue实例
import { defineNuxtPlugin } from '#app'
import { Button } from 'vant'
import 'vant/lib/index.css';

export default defineNuxtPlugin((nuxtApp) => {
  // console.log('nuxtApp', nuxtApp)
  // 把组件挂载到vue实例，扩展vue
  nuxtApp.vueApp.use(Button);
})