<script setup lang="ts">
const router = useRouter()
const goIndex = () => {
  // router.push({
  //   name: 'index',
  // })
  router.back()
}
</script>

<template>
  <div class="flex h-full items-center justify-center p-96">
    <div
      class="bg-sky-700 px-4 py-2 text-black hover:bg-sky-800 sm:px-8 sm:py-3 dark:text-red-500"
    >
      Hello Tailwind CSS
    </div>
    <div class="absolute right-0 top-0 m-4">
      <ColorMode />
    </div>
  </div>
</template>
