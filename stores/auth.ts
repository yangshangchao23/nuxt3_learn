import { acceptHMRUpdate, defineStore } from 'pinia'

interface AuthStore {
  token: string
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthStore => ({
    token: '',
  }),
  getters: {
    isLogin: (state) => state.token !== '',
  },
  persist: true, // 开启持久化
})

console.log(import.meta.hot, 'import.meta.hot')

// 所以这段代码的作用就是告诉 Vite 和 Pinia，当 useUserStore 发生变化时，可以通过热更新的方式自动更新页面上的数据。这样可以提高开发效率，不需要每次修改 store 都手动刷新页面。
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
