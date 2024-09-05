import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  // todo：state为什么是函数？和Vuex有什么区别
  state: () => ({
    username: 'John Doe',
    age: 30,
  }),
  getters: {
    // 可以用state.x 获取也可以用this.x 获取
    doubleAge: (state) => state.age * 2,
  },
  actions: {
    increment() {
      this.age++
    },
  },
})
