<script setup lang="ts">
import { getRegisterSimple } from '~/api/sysconfig'

onMounted(() => {
  checkIsSimple()
})

const checkIsSimple = async () => {
  const res = await getRegisterSimple()
  console.log(res, 'res')
}

const login = async () => {
  const params = {
    username: 'yangsc',
    password: 'Yangsc333',
    botId: '97342d49e8284c549da35b9876d49335',
  }
  const res = await doLoginRest(params)
  console.log(res, 'login')
}
</script>
<template>
  <div>
    <v-btn @click="checkIsSimple">查看注册版本</v-btn>
    <v-btn @click="login">登录</v-btn>
  </div>
</template>

<style scoped lang="scss"></style>
