<!--
 * @Author: 
 * @Date: 2025-03-14 14:40:04
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-04-28 13:46:28
 * @Description: 
 * @FilePath: \vue3-project\src\components\TabCom.vue
-->
<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <template v-for="item in tabs">
      <el-tab-pane :label="item.label" :name="item.name">
        <template v-if="item.slotName" #default>
          <slot :name="item.slotName"></slot>
        </template>
      </el-tab-pane>
    </template>
  </el-tabs>
</template>

<script lang="ts" setup>
import { ref, defineProps, PropType,defineEmits } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import type { Tab } from '@/components/types/tab'

const emits = defineEmits(['tabClick'])
const props= defineProps({
  tabs: {
    type: Array as PropType<Tab[]>,
    required: true,
  },
  defaultTab:{
    type: String,
    required: true
  }
})
const activeName = ref('') 
activeName.value = props.defaultTab
const handleClick = (tab: TabsPaneContext, event: Event) => {
  emits('tabClick', tab, event)
  console.log(tab, event)
}
</script>

<style lang="scss" scoped>
.demo-tabs > .el-tabs__content {
  height: 100%;
  &> div{
    height: 100%;
  }
}
.el-tabs--top {
  height: 100%;
}

</style>
