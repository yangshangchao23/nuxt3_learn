<script setup lang="ts">
const text = '更懂你的AI小秘书'
const typedText = ref('')

const flowPrint = () => {
  let index = 0
  const interval = setInterval(() => {
    typedText.value += text[index]
    index++
    if (index === text.length) {
      clearInterval(interval)
    }
  }, 300)
}
</script>

<template>
  <div class="prose">
    <h1>打字机效果</h1>
    <h4>1.自己写的方法</h4>
    <div>
      <el-button @click="flowPrint">开始打字</el-button>
      {{ typedText }}
    </div>
    <h4>2.typeitjs</h4>
    <!-- // 打字机效果组件（配置项详情请查阅 https://www.typeitjs.com/docs/vanilla/usage#options） -->
    <p>
      参考开源后台项目
      <a
        target="_blank"
        href="https://github.com/PanJiaChen/vue-element-admin"
      ></a>
    </p>
  </div>
</template>

<style scoped lang="scss"></style>
