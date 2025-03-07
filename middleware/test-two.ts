export default defineNuxtRouteMiddleware((to, from) => {
  console.log('test-two');
 //  类似于页面的路由拦截器/导航守卫/beforeRouteEnter
 if(to.path === '/middleware'){
   // 记得加return否则不跳转
   return navigateTo('/login')
 }
})
