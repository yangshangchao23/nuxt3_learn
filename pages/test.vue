<script setup lang="ts">
const router = useRouter()
const goIndex = () => {
  // router.push({
  //   name: 'index',
  // })
  router.back()
}

const content =
  '## Are you ok? \n<br/><p>Hello</p> <p>今天要坐:rocket:去太空找嫦娥姐姐玩，然后坐:steam_locomotive:去找她</p>'

// 代码块高亮显示
const codeContent = `
##### 示例代码
这里是一个计算 1 + 1 的 JavaScript 示例：
\`\`\`javascript
const result = 1 + 1;
console.log(\`1 + 1 = \${result}\`);
\`\`\`
`
</script>

<template>
  <!-- 1=4px, p-6= padding:24px -->
  <div class="p-6">
    <div class="m-4">
      <h4>使用tailwindcss</h4>
      <div
        class="bg-sky-700 px-4 py-2 text-black hover:bg-sky-800 sm:px-8 sm:py-3 dark:text-red-500"
      >
        Hello Tailwind CSS
      </div>
    </div>
    <div class="absolute right-0 top-0 m-4">
      <ColorMode />
    </div>
    <div class="prose mt-4">
      <h4>使用markdown组件</h4>
      <MdRender :content="content" />
      <!-- 代码块显示 -->
      <MdRender :content="codeContent" />
      <!-- 对比一下pre 标签和代码块显示  -->
      <!-- HTML <pre> 元素表示预定义格式文本。在该元素中的文本通常按照原文件中的编排，以等宽字体的形式展现出来，文本中的空白符（比如空格和换行符）都会显示出来。(紧跟在 <pre> 开始标签后的换行符也会被省略) -->
      <div v-if="false" class="language-bash extra-class">
        <pre class="language-bash">
          <code>
            <span class="token function">npm</span><span class="token function">install</span> markdown-it --save
            bower <span class="token function">install</span> markdown-it --save
          </code>
        </pre>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* @tailwind base;重置了标签样式，需在组件设置 */
// h4 {
//   font-weight: 700;
// }
</style>
