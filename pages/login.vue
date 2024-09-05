<script lang="ts" setup>
const goIndex = () => {
  navigateTo('/')
}
const route = useRoute()
onMounted(() => {
  if (route.query.code) {
    ElMessage.error(`${route.query.code},${route.query.message}`)
  }
})
</script>

<template>
  <div>
    登录页面
    <el-button @click="goIndex">返回首页</el-button>
  </div>
</template>
