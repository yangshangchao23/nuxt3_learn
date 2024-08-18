<script setup lang="ts">
// 方案1：使用definePageMeta设置统一布局的注意事项
// layout只有一个, 优先展示当前页面使用的layout
// 如果当前页面没有设置layout，则会使用全局的app.vue 中的NuxtLayout
// definePageMeta({
//   layout: ‘custom'  // 默认为default,设置false则表示不使用默认布局
// })
definePageMeta({
  layout: false  // 默认为default,设置false则表示不使用默认布局
})

</script>

<template>
  <section>
    <p>此页面将显示在 /about 路由。</p>
    <!-- 方案2：设置NuxtLayout标签，具名name，则保留两者：全局app.vue中和当前设置的layout -->
    <!--  如果上面的脚本中definePageMeta设置了,layout:false ，则不会使用全局的app.vue中的NuxtLayout,只保留当前的 -->
    <NuxtLayout name="custom">
      <template #header>
        <div>我是自定义的about-header</div>
      </template>
      我是about-bout啊
    </NuxtLayout>
    <!-- 继续加NuxtLayout标签，还可以组合多个布局页哦 -->
    <!-- <NuxtLayout name="default">
      我是about-default
    </NuxtLayout> -->

  </section>
</template>
