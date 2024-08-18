import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  // console.log(nuxtApp, 'nuxtApp');
  return {
    // 1.一个常见应用是给NuxtApp实例提供一些额外的帮助方法
    provide: {
      hello: () => 'world'
    }
  }
})