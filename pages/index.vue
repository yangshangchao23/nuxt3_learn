<script setup lang="ts"></script>

<template>
  <v-container class="flex-column align-center flex justify-center">
    首页
    <NuxtLink to="/server" class="text-blue-500 underline underline-offset-auto"
      >跳转接口测试页面</NuxtLink
    >
    <div v-for="(item, index) in 100" class="h-6 w-auto">内容{{ index }}</div>
  </v-container>
</template>
