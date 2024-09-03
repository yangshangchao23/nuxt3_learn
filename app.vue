<template>
  <div>
    <NuxtLayout name="defaults">
      <NuxtPage />
    </NuxtLayout>
    <!-- 全局注册提示组件 -->
    <Snackbar ref="snackbarRef" />
    <!-- # Attribute "v-for" should go before "class".（参：vue/attributes-order | eslint-plugin-vue） -->
    <!-- <NuxtLink
      v-for="item in [1, 2, 3]"
      :key="item"
      class="link"
      :to="`${item}`"
    /> -->
  </div>
</template>

<script lang="ts" setup>
// 测试eslint和prettier
// console.warn('警告打印输出')
// console.log('正常打印输出')
// console.error('错误打印输出')
// console.info('错误打印输出')
// const title: string = '我是标题'
// const acc: number = '123'
// console.log(acc)

// 全局注册提示组件唤起方法
const snackbarRef = ref(null)
provide('showSnackbar', (msg, color, duration) => {
  snackbarRef.value.showSnackbar(msg, color, duration)
})
</script>

<style>
body {
  background-color: #fff;
  color: rgba(0, 0, 0, 0.8);
}
.dark-mode body {
  background-color: #091a28;
  color: #ebf4f1;
}
.sepia-mode body {
  background-color: #f1e7d0;
  color: #433422;
}
</style>
