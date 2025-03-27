<!--
 * @Author: 
 * @Date: 2025-01-13 09:48:53
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-03-19 11:07:44
 * @Description: 
 * @FilePath: \vue3-project\src\views\Product\index.vue
-->
<!--
 * @Author: 
 * @Date: 2025-01-13 09:48:53
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-01-15 09:35:19
 * @Description: 
 * @FilePath: \vue3-project\src\views\Home\Home.vue
-->
<template>
  <div class="Product">
    <TabCom :tabs="tabs" @tabClick="tabClick" defaultTab="first">
      <template #first>
        用户管理
      </template>
      <template #second>
        配置管理
      </template>
      <template #third>
        角色管理
      </template>
      <template #fourth>
        任务管理
      </template>
    </TabCom>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue'
import type {Tab} from '@/components/types/tab'
import type { TabsPaneContext } from 'element-plus'

const tabs = reactive<Tab[]>([
  {
    label: '用户管理',
    name: 'first',
    slotName: 'first'
  },
  {
    label: '配置管理',
    name: 'second',
    slotName: 'second'
  },
  {
    label: '角色管理',
    name: 'third',
    slotName: 'third'
  },
  {
    label: '任务管理',
    name: 'fourth',
    slotName: 'fourth'
  },
  {
    label: '报表管理',
    name: 'fifth',
    slotName: 'fifth'
  },
  {
    label: '系统管理',
    name: 'sixth',
    slotName: 'sixth'
  }
])

const tabClick = (tab: TabsPaneContext,e: Event)=>{
  console.log(tab,e)
}

</script>


<style lang="scss"></style>
