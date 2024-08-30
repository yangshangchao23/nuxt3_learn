<script setup lang="ts">

// 简单的接口- server\api\hello.ts
const { data } = await useFetch('/api/hello')
// 服务器路由server\routes\hello.ts
const { data: routesData } = await useFetch('hello')

const userInfo = ref({})
const apiStatus = ref('')
const apiError = ref({})
// 简单交互-修改用户信息
// !!!错误用法:应该用$fetch
const getUserInfo = async () => {
  const { data, status, error } = await useFetch('/api/user/getInfo', {
    pick: ['name', 'counter'],
  })
  userInfo.value = data
  apiStatus.value = status
  apiError.value = error
}
// !!!错误用法::应该用$fetch
const resetUserInfo = async () => {
  const query = { counter: 0 }
  const { data, status, error } = await useFetch('/api/user/resetInfo', {query})
  userInfo.value = data
  apiStatus.value = status
  apiError.value = error
}

// 1. useFetch
// - 适用场景：useFetch 主要用于服务器端渲染（SSR）或在组件的初始渲染阶段获取数据。它会在组件被创建时自动执行，并且可以在页面加载时预先获取数据。
// - 特点：适合在页面加载时获取数据，确保在渲染之前数据已经准备好。适合用于静态生成的页面。只能在 setup 函数中使用。
// 2. $fetch
// - 适用场景：$fetch 是一个通用的 HTTP 请求方法，适合在客户端进行数据请求，尤其是在用户交互（如按钮点击、表单提交等）时。
// - 特点：可以在组件的任何地方调用，包括 mounted 和其他生命周期钩子。适合动态请求数据，例如根据用户的操作来获取数据。允许在组件已经挂载后进行数据重新获取。

// 使用封装的useHttp
const { data: newsData } = await getNewsList()
console.log(newsData, 'newsData');

</script>

<template>
  <article class="w-full">
    <v-container class="prose">
      <h2>接口测试页面</h2>
      <v-row>
        <v-btn
          variant="text"
          href="https://nuxt.com/docs/guide/directory-structure/server"
          target="_blank"
          color="blue-darken-2"
          >document</v-btn
        >
        <v-btn
          variant="text"
          href="https://nuxt.com.cn/docs/guide/directory-structure/server#%E6%9C%8D%E5%8A%A1%E5%99%A8%E8%B7%AF%E7%94%B1"
          target="_blank"
          color="blue-darken-2"
          >中文文档</v-btn
        >
      </v-row>
      <h4>第一种：server\api\hello.ts</h4>
      <pre>{{ data }}</pre>
      <p>welcome to {{ data?.hello }}</p>
      <p>
        浏览器直接访问：http://localhost:3000/api/hello 可查看接口返回的数据
      </p>
      <v-divider opacity="1" />
      <h4>第二种：服务器路由server\routes\hello.ts</h4>
      <p>~/server/api目录中的文件会自动在其路由中添加/api前缀。</p>
      <p>要添加没有/api前缀的服务器路由，请将它们放入~/server/routes目录中。</p>
      <p>浏览器直接访问：http://localhost:3000/hello 可查看接口返回的数据</p>
      <p>do you have '/api' prefix? {{ routesData?.type }}</p>
      <p class="text-red">
        经测试，会傻傻的，改了返回的数据没更新，或者是null。第一种方式则没有该现象
      </p>

      <div class="text-red-900">
        <v-row
          >请注意，当前服务器路由不支持与pages中的动态路由的全部功能。</v-row
        >
        <v-row
          >以上两种方法无法直接通过点击动作进行页面路由跳转。只能通过浏览器直接访问接口url</v-row
        >
      </div>
      <v-divider opacity="1" />
      <h4>简单交互</h4>
      <div class="my-24 flex flex-col items-center">
        <p class="text-2xl text-gray-600">
          請求狀態:
          {{ apiStatus === 'success' ? '完成' : '請求中' }}
        </p>
        <span v-if="apiError" class="mt-4 text-6xl text-gray-600"
          >是否錯誤: {{ apiError }}</span
        >
        <span class="mt-4 text-2xl text-gray-600">回傳資料:</span>
        <p class="mt-4 text-3xl font-semibold text-blue-500">{{ userInfo }}</p>
        <button
          class="mt-6 rounded-sm bg-blue-500 px-8 py-3 text-xl font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          @click="getUserInfo"
        >
          重新獲取資料
        </button>
        <button
          class="mt-6 rounded-sm bg-blue-500 px-8 py-3 text-xl font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          @click="resetUserInfo"
        >
          重置用户资料
        </button>
      </div>
      <div class="text-red-900">
        <v-row
          >点击获取用户数据的时候,nuxt警告提示: server.vue:29 [nuxt] [useFetch] Component is already mounted, please use $fetch instead. See https://nuxt.com/docs/getting-started/data-fetching</v-row
        >
      </div>
      <v-divider opacity="1" />
      <h4>新闻列表-使用封装的useFetch</h4>
      <pre>{{ newsData }}</pre>
      <div class="text-red-900">
        <v-row
          >除了 SSR 使用的 useFetch，在客户端有时候需要根据用户交互进行网络请求，这时候需要用到官方提供的内置库 $fetch</v-row
        >
        <v-row
          >这句解释就说明了，为什么上面的点击报警告提示！注意useFetch和$fetch的区别</v-row
        >
        <v-row>
          <a href="https://www.perplexity.ai/search/server-vue-12-nuxt-usefetch-co-JepoYRs5QF.D5nCfK7RgfA">useFetch 与 $fetch 的区别</a>
        </v-row>
      </div>
      <v-divider opacity="1" />
      <h4>服务器中间件：server\middleware\log.ts</h4>
      <p>
        中间件处理程序不应返回任何内容（也不应关闭或响应请求），只能检查或扩展请求上下文或抛出错误。
      </p>
      <h4>
        很强大可以自己写接口：更多接口处理请看<a
          href="https://nuxt.com.cn/docs/guide/directory-structure/server#%E7%A4%BA%E4%BE%8B"
          target="_blank"
          >文档示例</a
        >
      </h4>
      <p>获取路由参数，匹配HTTP方法，错误处理，状态码处理等请看详细文档</p>
    </v-container>
  </article>
</template>
