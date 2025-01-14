<!--
 * @Author: 
 * @Date: 2025-01-14 10:51:59
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-01-14 11:05:15
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
      {{ item.text }}
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import type { Props } from '../types/button'
defineProps<Props>()
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
  }
}
</style>