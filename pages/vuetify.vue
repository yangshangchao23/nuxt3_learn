<script setup>
const snackbarRef = ref(null)

// 组件中调用
const triggerSnackbar = () => {
  snackbarRef.value.showSnackbar('Hello, this is a Snackbar!', 'info', 5000)
}

// 调用app.vue全局注册的组件
const showSnackbar = inject('showSnackbar')
const triggerSnackbarGlobal = () => {
  showSnackbar('This is a global snackbar!', 'success', 3000)
}
</script>

<template>
  <div>
    <v-btn @click="triggerSnackbar">Show Snackbar</v-btn>
    <v-btn @click="triggerSnackbarGlobal">Global Show Snackbar</v-btn>
    <Snackbar ref="snackbarRef" />
  </div>
</template>
