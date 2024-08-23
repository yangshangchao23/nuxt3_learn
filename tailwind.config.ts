/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography'

module.exports = {
  content: ['./pages/**/*.{vue,ts}'],
  theme: {
    extend: {
      // @tailwind base;重置了标签样式, 添加@tailwindcss/typography插件并配置可自定义标签样式, 从而覆盖 @tailwind base样式
      // 也可以在需要正常显示标签样式的内容 对应的父级标签加类名 prose 不需配置一下options即可正常显示，更多查看文档 https://github.com/tailwindlabs/tailwindcss-typography
      // typography: {
      //   DEFAULT: {
      //     css: {
      //       h1: {
      //         // 自定义 h1 标签样式
      //       },
      //       h2: {
      //         // 自定义 h2 标签样式
      //         fontWeight: '700', // 设置 h2 字体粗细
      //         fontSize: '22px', // 设置 h2 字体大小
      //       },
      //       // 其他标题样式
      //     },
      //   },
      // },
    },
  },
  plugins: [
    typography, // https://tailwindcss.com/docs/plugins#typography
  ],
}
