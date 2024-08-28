<script setup lang="ts">
// 简单的接口- server\api\hello.ts
const { data } = await useFetch('/api/hello')
// 服务器路由server\routes\hello.ts
const { data: routesData } = await useFetch('hello')
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

      <p class="text-red-900">
        <v-row
          >请注意，当前服务器路由不支持与pages中的动态路由的全部功能。</v-row
        >
        <v-row
          >以上两种方法无法直接通过点击动作进行页面路由跳转。只能通过浏览器直接访问接口url</v-row
        >
      </p>
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
