export default defineNuxtRouteMiddleware((to, from) => {
   console.log(to);
  //  类似于页面的路由拦截器/导航守卫/beforeRouteEnter
  if(to.path === '/middleware'){
    // 记得加return否则不跳转
    return navigateTo('/login')
    // 加了return,vue组件中绑了两个middleware只会触发一个，否则按文件名顺序触发多个
  }
})
