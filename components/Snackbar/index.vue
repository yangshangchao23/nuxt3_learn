<script setup lang="ts">
const visible = ref(false)
const message = ref('')
const timeout = ref(3000)
const color = ref('success')

// 定义成以指令的方式唤起组件
const showSnackbar = (
  msg: string,
  colorValue: string = 'success',
  duration: number = 3000
) => {
  message.value = msg
  color.value = colorValue
  timeout.value = duration
  visible.value = true
}

// 显式暴露给外部使用的函数
defineExpose({ showSnackbar })
</script>

<template>
  <v-snackbar v-model="visible" :timeout="timeout" :color="color" top>
    {{ message }}
    <template #action="{ attrs }">
      <v-btn text v-bind="attrs" @click="visible = false">Close</v-btn>
    </template>
  </v-snackbar>
</template>

<style scoped></style>
