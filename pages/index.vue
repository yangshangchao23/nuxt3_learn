<template>
  <div>
    <h1>欢迎来到首页</h1>
    <AppAlert> 这是一个自动导入的组件。 </AppAlert>
    <br />
    <NuxtLink to="/about">跳转关于 查看页面设置的layout</NuxtLink>
    <br />
    <NuxtLink to="/user-admins/aaa">跳转user</NuxtLink>
    <br />
    <NuxtLink to="/parent">跳转 parent 默认列表页</NuxtLink>
    <br />
    <NuxtLink to="/parent/child">跳转 详情子页面</NuxtLink>
    <div>待办列表- 获取数据useAsyncData和useFetch的是使用</div>
    <div v-for="todo in todos" :key="todo.id">
      <input type="checkbox" v-model="todo.completed" />
      <span style="color: blue">{{ todo.title }}</span>
    </div>
    <!-- <div>今天已完成</div> -->
    <!-- <div>{{ today.weather }}</div> -->
    <br />
    <div>
      <h4>useState的使用</h4>
      <button @click="counter++">+</button>
      <span>{{ counter }}</span>
      <button @click="counter--">-</button>
    </div>
    <br />
    <h4>2.plugin使用-访问vue实例</h4>
    <van-button type="warning">警告按钮</van-button>
    <h4>module 第三方模块的使用-pinia</h4>
    <div>{{ userStore.name }}</div>
    <!-- <van-button @click="userStore.$patch({ age: userStore.age+1 })">+</van-button> -->
    <van-button @click="increasement">+</van-button>
    <span>{{ userStore.age }}</span>
    <van-button @click="userStore.$patch({ age: userStore.age - 1 })"
      >-</van-button
    >
    <div>
     访问pinia-getters <span>{{ userStore.doubleCount }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 获取数据-useAsyncData
// const {data: todos} = await useAsyncData("xxx", () => $fetch("/api/todo"));
// console.log(todos, 'res');

// 如何导出多个？
// const {data: today} = await useAsyncData("today", () => $fetch("/api/todo"));
// console.log(today, 'today');

// 获取数据-useFetch
const { data: todos } = await useFetch("/api/todo");

// 更加实践-
// pick参数：页面只需要显示weather字段，则只pick出来weather字段。 作用和const解构差不多意思而已
// 只能pick 返回的数据是仅对象类型. 例如如果是数组对象，页面会500报错
// 个人体验：没事别用pick，用const解构更香。知识看了别人的代码要知道什么意思就好
// const { data: today } = await useFetch("/api/todo", {
//   pick: ["weather"],
// })
//transform参数 -- 可直接返回需要的结果
//transform：在解析后可以用于更改handler函数结果的函数。
// const { data: todos } = await useFetch("/api/todo", {
//   transform: (input) => {
//     return input
//   },
// });

const counter = useCounter();

// plugins目录：Nuxt3会自动读取plugins目录下的文件并加载它们
// 1.一个常见应用是给NuxtApp实例提供一些额外的帮助方法
const { $hello } = useNuxtApp();
console.log($hello());

// module 第三方模块的使用-先下载第三方模块依赖，再找到对应配置nuxt.config.ts配置
// eg:https://nuxt.com.cn/modules/pinia
const userStore = useUserStore();

const increasement = () => {
  // userStore.$patch({ age: userStore.age + 1 });
  userStore.age = userStore.age + 1;
  // 使用pinia-actions
  // userStore.increment();
};
</script>
