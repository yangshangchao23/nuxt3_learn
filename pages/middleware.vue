<!-- 用户编辑页面，跳转该页面需要先登录（1.跳转进来的 2.直接输入url） -->
<script lang="ts" setup>
definePageMeta({
  middleware: [
    (to, from) => {
      // console.log('middleware')
    },
    // 'test',
    // 'test-two',
  ],
})

if (import.meta.server) {
  console.log('server')
} else {
  console.log('client')
}
</script>

<template>
  <div>路由中间件页面</div>
</template>
