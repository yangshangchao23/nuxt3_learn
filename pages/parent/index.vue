<script lang="ts" setup>
  const show = ref(false)
</script>

<template>
  <div>parent模块默认的list页面页，或者重定向至该页面</div>
  <button v-if="!show" @click="show = !show">显示列表</button>
  <!-- 使用封装的通用弹窗组件 -->
  <CommonDialog v-if="show" />
  <!-- 懒加载 -->
  <LazyCommonDialog v-if="show" />
</template>