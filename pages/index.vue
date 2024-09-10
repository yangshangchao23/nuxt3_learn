<script setup lang="ts"></script>

<template>
  <v-container class="flex-column align-center flex justify-center">
    首页
    <NuxtLink to="/test" class="text-blue-500 underline underline-offset-auto"
      >clolormode-markdown</NuxtLink
    >
    <NuxtLink to="/server" class="text-blue-500 underline underline-offset-auto"
      >跳转接口测试页面-useFetch</NuxtLink
    >
    <NuxtLink
      to="/server-fetch"
      class="text-blue-500 underline underline-offset-auto"
      >跳转接口测试页面-$fetch</NuxtLink
    >
    <NuxtLink
      to="/vuetify"
      class="text-blue-500 underline underline-offset-auto"
      >vuetify</NuxtLink
    >
    <NuxtLink
      to="/element"
      class="text-blue-500 underline underline-offset-auto"
      >element</NuxtLink
    >
    <NuxtLink to="/pinia" class="text-blue-500 underline underline-offset-auto"
      >pinia-needAuth</NuxtLink
    >
    <NuxtLink to="/vueuse" class="text-blue-500 underline underline-offset-auto"
      >vueuse</NuxtLink
    >
    <NuxtLink
      to="/middleware"
      class="text-blue-500 underline underline-offset-auto"
      >middleware</NuxtLink
    >
    <NuxtLink
      to="/global-css"
      class="text-blue-500 underline underline-offset-auto"
      >global-css</NuxtLink
    >
    <NuxtLink to="/typing" class="text-blue-500 underline underline-offset-auto"
      >typing</NuxtLink
    >
    <!-- <div v-for="(item, index) in 100" class="h-6 w-auto">内容{{ index }}</div> -->
  </v-container>
</template>
