<script setup lang="ts">
const drawer = ref(true)
const rail = ref(true)
const open = ref(['Users'])
</script>

<template>
  <v-layout class="layout-wrapper">
    <aside class="layout-vertical-nav">
      <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"
      >
        <v-list-item nav height="64px">
          <template #prepend>
            <div class="nav-header flex items-center">
              <v-avatar size="48px" class="mr-3">
                <v-img src="@/assets/images/bot_avatar.png" />
              </v-avatar>
              <h1>欣智AI搜索</h1>
            </div>
          </template>
          <template #append>
            <v-btn
              icon="mdi-chevron-left"
              variant="text"
              @click.stop="rail = !rail"
            />
          </template>
        </v-list-item>
        <v-divider />
        <v-list v-model:opened="open" density="compact" nav>
          <v-list-item
            prepend-icon="mdi-magnify"
            title="主页"
            value="index"
            to="/"
          />
          <v-list-item
            prepend-icon="mdi-monitor"
            title="浏览器设置"
            value="engine"
            to="/search-engine"
          />
        </v-list>
        <v-expansion-panels>
          <v-expansion-panel>
            <template #title>
              <v-row class="flex items-center">
                <v-col cols="3" class="pl-1">
                  <v-icon icon="mdi-history" size="26" />
                </v-col>
                <v-col cols="9" class="pl-2">近期搜索</v-col>
              </v-row>
            </template>
            <template #text> 111111 </template>
          </v-expansion-panel>
        </v-expansion-panels>
        <!-- 底部菜单栏 -->
        <div>
          <v-list-item
            prepend-icon="mdi-cellphone"
            title="手机端"
            value="cellphone"
          />
          <v-divider class="opacity-1" />
          <v-list-item height="64px">
            <template #prepend>
              <div class="nav-header flex items-center">
                <v-avatar size="48px" class="mr-3">
                  <v-img src="@/assets/images/bot_avatar.png" />
                </v-avatar>
                <span>用户xxxxx</span>
              </div>
            </template>
            <template #append>
              <v-btn icon="mdi-dots-horizontal-circle-outline" variant="text" />
            </template>
          </v-list-item>
        </div>
      </v-navigation-drawer>
    </aside>
    <div class="layout-content-wrapper">
      <v-app-bar title="Application bar" class="layout-navbar" />
      <v-main>
        <!-- page -->
        <slot />
      </v-main>
    </div>
  </v-layout>
</template>
