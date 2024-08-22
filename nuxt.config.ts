// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    "@nuxt/icon",
    "@nuxtjs/i18n"
  ],
  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'dark', // fallback value if not system preference found
    // hid: 'nuxt-color-mode-script',
    // globalName: '__NUXT_COLOR_MODE__',
    // componentName: 'ColorScheme',
    // classPrefix: '',
    // classSuffix: '-mode',
    // storageKey: 'nuxt-color-mode'
  },
  i18n: {
    strategy: 'no_prefix', // 添加路由前缀的方式  no_prefix 不添加  prefix_and_default
    locales: ['en', 'zh'], // 配置语种
    defaultLocale: 'zh', // 默认语种
    vueI18n: './i18n.config.ts' // if you are using custom path, default
  }
})