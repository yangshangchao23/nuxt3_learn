<script lang="ts" setup></script>

<template>
  <div>
    <div class="prose">
      <!-- <Icon name="uil:github" /> -->
      <el-button @click="ElMessage('hello')">button</el-button>
      <ElButton :icon="ElIconEditPen" type="success">button</ElButton>
      <LazyElButton type="warning">lazy button</LazyElButton>
      <el-icon> <ElIconHouse /></el-icon>

      <!-- 渐变背景色 -->
      <h2
        class="gradient-bg inline-block bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-[3.5rem] font-bold uppercase text-transparent"
      >
        渐变字体示例
      </h2>

      <h2
        class="gradient-bg inline-block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-[3.5rem] font-bold uppercase text-transparent"
      >
        渐变字体示例
      </h2>
    </div>
    <h2
      class="cursor-pointer bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-2xl text-transparent"
    >
      欣智AI搜索
    </h2>
  </div>
</template>

<style lang="scss" scoped>
@keyframes gradient-animation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
.gradient-bg {
  background-size: 200% 200%;
  animation: gradient-animation 4s ease infinite;
}
</style>
