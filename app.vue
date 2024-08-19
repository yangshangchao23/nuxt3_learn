<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
    <NuxtLink
      v-for="item in [1, 2, 3]"
      :key="item"
      class="link"
      :to="`${item}`"
    />
  </div>
</template>

<script lang="ts" setup>
console.warn('警告打印输出');

console.log('正常打印输出');

console.error('错误打印输出');

console.info('错误打印输出');

const title: string = '我是标题';
const acc: number = '123';
console.log(acc);
</script>
