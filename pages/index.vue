<script setup lang="ts"></script>

<template>
  <v-container class="flex-column align-center flex justify-center">
    首页
    <div v-for="(item, index) in 100" class="h-6 w-auto">内容{{ index }}</div>
  </v-container>
</template>
