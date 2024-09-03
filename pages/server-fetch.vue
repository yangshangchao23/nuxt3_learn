<script setup lang="ts">
import { getBannerList } from '~/api/sysconfig'

onMounted(() => {
  // checkIsSimple()
  checkIsSimpleMyFetch()
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

const checkIsSimpleMyFetch = async () => {
  const res = await getBannerList()
  console.log(res, 'res--getbannerlisttt')

  // const { data } = await useAsyncData(() => getBannerList())
  // console.log(data, 'data')
}

const loginMyFetch = async () => {}
</script>
<template>
  <div>
    <!-- composables\request.ts -->
    <v-btn @click="checkIsSimple">查看注册版本</v-btn>
    <v-btn @click="login">登录</v-btn>
    <h4>使用plugin-myfetch</h4>
    <v-btn @click="checkIsSimpleMyFetch">查看注册版本</v-btn>
    <v-btn @click="loginMyFetch">登录</v-btn>
  </div>
</template>

<style scoped lang="scss"></style>
