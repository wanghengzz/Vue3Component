<!--
 * @Author: 
 * @Date: 2025-01-14 10:51:59
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-01-17 14:19:51
 * @Description: 
 * @FilePath: \vue3-project\src\components\commonButton\commonButton.vue
-->
<template>
  <div class="common-button">
    <el-button 
      v-for="(item, index) in buttonGroup" 
      :key="index"
      :type="item.type" 
      :disabled="item.disabled" 
      @click="item.onClick"
    >
      <el-icon v-if="item.icon && item.iconPosition === 'left'" :size="props.size">
        <component :is="item.icon" />
      </el-icon>
      <span>{{ item.text }}</span>
      <el-icon v-if="item.icon && item.iconPosition === 'right'" :size="props.size">
        <component :is="item.icon" />
      </el-icon>
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import type { ButtonItem } from '../types/button'
import type { PropType } from 'vue'

const props = defineProps({
  buttonGroup: {
    type: Array as PropType<ButtonItem[]>,
    required: true
  },
  size: {
    type: Number,
    default: 16
  }
})
</script>

<style lang="scss" scoped>
.common-button {
  display: flex;
  // justify-content: space-between;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  .el-button {
    margin: 0px;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    
    .icon-wrapper {
      margin-right: 4px;
    }
  }
}
</style>