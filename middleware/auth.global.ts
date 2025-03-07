// 需求：除了跳转首页、login、server页面，其他页面都要做登录鉴权（通常是校验token是否存在）
export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.server) {
    console.log('server')
  } else {
    console.log('client')
  }
  let unAuthRoutes = ['/pinia', '/global-css'] // 假设这三个页面都需要seo优化
  // type tokenType =
  let token: string | null = ''
  if (import.meta.client) {
    token = localStorage.getItem('token')
  }
  if (!token) {
    if (unAuthRoutes.includes(to.path)) {
      return navigateTo({
        path: '/login',
        query: {
          code: 401,
          message: '请先登录',
        },
      })
    }
  }
})
