<script lang="ts" setup>
// import { storeToRefs } from 'pinia'

// 忽略波纹线报错，已经nuxt.config.ts配置了自动引入 dirs: ['stores', 'api'],
const authStore = useAuthStore()
const userStore = useUserStore()
const { token, isLogin } = storeToRefs(authStore)
const { username, age } = storeToRefs(userStore)
// 模拟登录
const login = () => {
  setTimeout(() => {
    authStore.token = 'xxxxx'
  }, 1000)
}

const changeAge = () => {
  userStore.increment()
}
</script>

<template>
  <div>
    <h4>模拟登录使用持久化插件</h4>
    <div>token: {{ token }}</div>
    <div>是否登录：{{ isLogin ? '已登录' : '未登录' }}</div>
    <el-button type="primary" @click="login">login</el-button>
    <h4>使用action改变值</h4>
    <div>姓名:{{ username }},年龄 {{ age }}</div>
    <el-button type="primary" @click="changeAge">修改年龄</el-button>
  </div>
</template>
