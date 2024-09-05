// stores/index.ts
// export * from './modules/user'
// export * from './modules/auth'
// vue组件中使用
// import { useUserStore, useAuthStore } from '@/stores'

// 看案例也没建议用index.ts 来导出所有了，可能这样操作的话，就不用在组件中导入不同的模块，少了几行代码
// 如果不用index.ts 导出所有
// 需要 vue组件中使用
// import { useAuthStore } from '~/stores/auth'
// import { useUserStore } from '~/stores/user'
// 但是现在nuxt.config.ts在可以配置自动引入某个文件夹下的方法，所以就不用手动引入了
// imports: {
//   // Auto-import pinia store defined in `~/store`
//   dirs: ['stores', 'api'],
// },
