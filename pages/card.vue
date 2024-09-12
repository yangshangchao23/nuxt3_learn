<script setup lang="ts">
import { formateData } from '~/mock/cardData'
import { originData } from '~/mock/cardData'

interface CardInfo {
  cmsType: string
  name: string
  tabList: any[]
  tableData: any[]
}

interface CardType {
  [key: string]: string
  // 以下方法也可
  // fagui: string
  // dayi: string
  // zhengce: string
}

let cardType: CardType = {
  fagui: '法规',
  dayi: '答疑',
  zhengce: '政策',
}

// 数组根据某个字段去重
const uniqueByProperty = (array, property) => {
  return array.reduce((acc, current) => {
    const existingIndex = acc.findIndex(
      (item) => item[property] === current[property]
    )
    if (existingIndex === -1) {
      acc.push(current)
    }
    return acc
  }, [])
}
// 获取卡片右上角tab类型
const getTabList = (cmsType: string, tableData?: any[]) => {
  // 方案1: 自己写死
  // if(cmsType === 'fagui'){
  //   return []
  // }
  // if(cmsType === 'dayi'){
  //   return ['总局答疑','各省答疑']
  // }
  // return ['总局政策','各省政策']
  // 方案2:方案1的写法优化
  let list: any[] = []
  switch (cmsType) {
    case 'fagui':
      list = []
      break
    case 'dayi':
      list = [
        { id: '1', name: '总局答疑' },
        { id: '2', name: '各省答疑' },
      ]
      break
    case 'zhengce':
      list = [
        { id: '1', name: '总局政策' },
        { id: '2', name: '各省政策' },
      ]
      break
    default:
      break
  }
  return list
  // 方案3: 从原数据拿
  // if (cmsType === 'fagui') return []
  // if (cmsType === 'dayi') {
  //   return uniqueByProperty(tableData, 'categoryTypes')
  // }
  // if (cmsType === 'zhengce') {
  //   return uniqueByProperty(tableData, 'accessTypes')
  // }

  // 对比：方案3从数据拿，取得的id值，切换tab也跟着后端返回的数据变化。但需查重，效率有影响
  // 方案1 则写死，后端的tabId一旦变化，前端要改。但是速度更快。
}

const formateList = computed(() => {
  let list = formateData.map((item) => {
    return {
      ...item,
      name: cardType[item.cmsType],
      tabList: getTabList(item.cmsType),
    }
  })
  return list
})

const formateListFromOrigin = computed(() => {
  let info: any = {}
  originData.forEach((item) => {
    const { cmsType, ...rest } = item
    if (!info[cmsType]) {
      info[cmsType] = {
        cmsType,
        name: cardType[cmsType],
        tabList: getTabList(cmsType),
        tableData: [],
      }
    }
    info[cmsType].tableData.push(rest)
  })
  return Object.values(info) as CardInfo[]
})
</script>

<template>
  <div v-for="item in formateListFromOrigin" :key="item.cmsType">
    <Cards :item="item" />
  </div>
</template>

<style scoped lang="scss"></style>
