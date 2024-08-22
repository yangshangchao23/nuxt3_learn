<script lang="ts" setup>
const colorMode = useColorMode()
console.log(colorMode.preference)

const { locale, setLocale } = useI18n()

onMounted(() => {
  console.log('locale--language', locale.value)
})
const changeLocale = () => {
  console.log('xxx,here')
  // locale.value === 'en' ? setLocale('zh') : setLocale('en')
  locale.value = locale.value === 'en' ? 'zh' : 'en'
}
</script>

<template>
  <div>
    <NuxtLink to="/test">跳转测试</NuxtLink>
    <h3>模式选择</h3>
    <!-- 黑暗模式选择 -->
    <select v-model="$colorMode.preference">
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="sepia">Sepia</option>
    </select>
    <h3>语言切换</h3>
    <div>
      <button
        class="rounded bg-sky-700 sm:px-8 sm:py-3"
        @click="setLocale('zh')"
      >
        中文
      </button>
      <button
        class="rounded bg-sky-700 sm:px-8 sm:py-3"
        @click="setLocale('en')"
      >
        英文
      </button>
      <button
        class="rounded bg-sky-700 sm:px-8 sm:py-3"
        @click="changeLocale()"
      >
        切换
      </button>
      <p>{{ $t('index.welcome') }}</p>
      <p>{{ $t('index.messages') }}</p>
    </div>
  </div>
</template>
