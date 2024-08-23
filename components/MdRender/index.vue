<script lang="ts" setup>
import MarkdownIt from 'markdown-it'
import { full as emojiPlugin } from 'markdown-it-emoji'
import subPlugin from 'markdown-it-sub'
import supPlugin from 'markdown-it-sup'
import shikiPlugin from '@shikijs/markdown-it'

interface TData {
  content: string
}

const props = defineProps<TData>()

const md = MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
})

md.use(emojiPlugin) // 表情插件
md.use(subPlugin) // 下标符号插件
md.use(supPlugin) // 上标符号插件
// code高亮
md.use(
  await shikiPlugin({
    themes: {
      light: 'vitesse-light', // 觉得背景色是白色不够凸显，可以配置成其他深色主题 'github-dark'
      dark: 'vitesse-dark',
    },
  })
)
const mdToHtml = (str: string) => {
  return md.render(str)
}
const contentHtml = computed(() => mdToHtml(props.content))

// todo：尝试切换代码块高亮主题-未成功
const curTheme = ref('github-dark')
const applyShikiTheme = async () => {
  md.use(
    await shikiPlugin({
      themes: {
        light: curTheme.value,
        dark: 'vitesse-dark',
      },
    })
  )
}
onMounted(() => {
  // 初始化应用主题
  // applyShikiTheme()
})
const themes = ['github-dark', 'vitesse-light', 'vitesse-dark']
const toggleTheme = async () => {
  curTheme.value =
    themes[
      (Math.max(themes.indexOf(document.body.dataset.theme), 0) + 1) %
        themes.length
    ]
  console.log(curTheme.value, 'curTheme')

  document.body.dataset.theme = curTheme.value
  await applyShikiTheme()
}
</script>

<template>
  <article class="md-content prose">
    <div v-html="contentHtml"></div>
  </article>
  <!-- <button
    class="bg-sky-700 text-black hover:bg-sky-800 sm:px-8 sm:py-3 dark:text-red-500"
    @click="toggleTheme()"
  >
    Toggle theme
  </button> -->
</template>

<style lang="scss" scoped>
/* @tailwind base;重置了标签样式，需在组件设置 */
.md-content {
  // &:deep(h2) {
  //   font-weight: 700;
  // }
  // 解决:使用了shiki,代码块背景色pre标签行内样式为background-color: #ffffff; 为什么是会默认设置行内样式是白色？就是这样
  // 官方不推荐这样使用，还是配置light模式为其他深色主题即可
  // &:deep(.shiki) {
  //   background-color: var(--tw-prose-pre-bg) !important;
  // 或者
  //   background-color: var(--shiki-dark-bg) !important; /* 使用 CSS 变量 */
  //   color: var(--shiki-dark) !important; /* 使用 CSS 变量 */
  // }
}
</style>
