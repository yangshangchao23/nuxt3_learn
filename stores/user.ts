import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    name: 'John Doe',
    age: 30,
  }),
  getters: {
    doubleCount: (state) => state.age * 2,
  },
  actions: {
    increment() {
      this.age++
    },
  },
})