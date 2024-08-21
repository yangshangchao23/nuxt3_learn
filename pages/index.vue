<template>
  <div>
    <NuxtLink to="/test">跳转测试</NuxtLink>
    <!-- 黑暗模式选择 -->
    <select v-model="$colorMode.preference">
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="sepia">Sepia</option>
    </select>
  </div>
</template>

<script lang="ts" setup>
const colorMode = useColorMode()
console.log(colorMode.preference)
</script>
