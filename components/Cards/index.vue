<script setup lang="ts">
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

onMounted(() => {
  changeCardTab('1', props.item.cmsType)
})

const activeTab = ref('1')
const renderTableData = ref([])
const changeCardTab = (tabid, cmsType) => {
  console.log(tabid, cmsType)

  activeTab.value = tabid
  if (cmsType === 'fagui') {
    renderTableData.value = props.item.tableData
  }
  if (cmsType === 'dayi') {
    renderTableData.value = props.item.tableData.filter(
      (item) => item.categoryTypes === tabid
    )
  }
  if (cmsType === 'zhengce') {
    const type = tabid === '1' ? 'public' : 'private'
    renderTableData.value = props.item.tableData.filter(
      (item) => item.accessTypes === type
    )
  }
}
</script>

<template>
  <el-card class="mt-4">
    <template #header>
      <div class="flex justify-between">
        <h1>{{ item.name }}</h1>
        <ul class="flex">
          <li
            class="mr-2"
            v-for="tab in item.tabList"
            :key="tab.id"
            :class="{
              'text-blue-500': tab.id === activeTab,
            }"
            @click="changeCardTab(tab.id, item.cmsType)"
          >
            {{ tab.name }}
          </li>
        </ul>
      </div>
    </template>
    <el-table :data="renderTableData" style="width: 100%">
      <el-table-column prop="title" label="标题" />
      <el-table-column
        v-if="item.cmsType === 'fagui'"
        prop="docNum"
        label="发文号"
        width="180"
      />
      <el-table-column prop="publishDate" label="时间" width="180" />
    </el-table>
  </el-card>
</template>

<style scoped lang="scss"></style>
