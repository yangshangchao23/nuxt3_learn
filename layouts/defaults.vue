<script setup lang="ts">
const drawer = ref(true)
const rail = ref(true)
</script>

<template>
  <v-layout class="layout-wrapper d-flex rounded rounded-md">
    <aside class="layout-vertical-nav">
      <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"
      >
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
          title="John Leider"
          nav
        >
          <template #append>
            <v-btn
              icon="mdi-chevron-left"
              variant="text"
              @click.stop="rail = !rail"
            />
          </template>
        </v-list-item>
        <v-divider />
        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-home-city" title="Home" value="home" />
          <v-list-item
            prepend-icon="mdi-account"
            title="My Account"
            value="account"
          />
          <v-list-item
            prepend-icon="mdi-account-group-outline"
            title="Users"
            value="users"
          />
        </v-list>
      </v-navigation-drawer>
    </aside>
    <div class="layout-content-wrapper">
      <v-app-bar title="Application bar" class="layout-navbar" />
      <v-main class="d-flex flex-column align-center justify-center">
        <div class="layout-page-content p-6">
          <div v-for="(item, index) in 100" class="h-6 w-auto">
            内容{{ index }}
          </div>
        </div>
      </v-main>
    </div>
  </v-layout>
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
