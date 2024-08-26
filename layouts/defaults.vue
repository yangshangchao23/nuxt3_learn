<script setup lang="ts">
import DefaultLayoutWithVerticalNav from './components/DefaultLayoutWithVerticalNav.vue'
</script>

<template>
  <div>
    <DefaultLayoutWithVerticalNav>
      <!-- page -->
      <slot />
    </DefaultLayoutWithVerticalNav>
  </div>
</template>

<style lang="scss">
.layout-wrapper {
  .layout-content-wrapper {
    min-width: calc(100% - 6.83rem);
    // overflow: hidden;
    .layout-page-content {
    }
  }
}
</style>
