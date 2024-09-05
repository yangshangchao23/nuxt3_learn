<template>
  <div>
    <div class="top-100 left-100 fixed">垂直滚动距离:{{ y }}</div>
    <div class="h-[2000px] bg-[#00ff00]"></div>
  </div>
</template>

<script lang="ts" setup>
const { y } = useWindowScroll()
</script>
