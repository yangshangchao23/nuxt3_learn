// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Your custom configs here
  {
    files: ['**/*.vue', '**/*.ts', '**/*.tsx'],
    rules: {
      // 'no-console': ["error", { allow: ["warn", "error"] }]
      // 关闭由于可能会引起xss攻击,不给使用v-html。若不配这个，需考虑使用第三方插件依赖提前给v-html的内容清毒
      'vue/html-self-closing': ['error', {
        html: {
          void: 'any',
          normal: 'any',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }],
      'vue/no-v-html': 'off'
    },
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
    ],
  }
)
