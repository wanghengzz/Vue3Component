<!--
 * @Author: 
 * @Date: 2024-11-12 14:00:48
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-01-13 10:01:27
 * @Description: 
 * @FilePath: \vue3-project\src\components\SearchContainer.vue
-->
<template>
  <div class="search-container">
    <div class="search-content">
      <!-- <slot name="search"></slot> -->
      <template v-for="name in slotNames" :key="name">
        <slot :name="name"></slot>
      </template>
    </div>
    <div class="search-buttons" v-if="buttons.length">
      <el-button
        :type="item.type"
        v-for="(item, index) in button"
        :key="index"
        :disabled="item.disabled"
        @click="item.onClick"
      >
        {{ item.text }}
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" name="" setup>
import { ButtonType } from '../components/helper/button'
import { defineProps, reactive,useSlots } from 'vue'
interface Props {
  buttons: ButtonType[]
}
const { buttons = [] } = defineProps<Props>()
const button = reactive<ButtonType[]>(buttons)

const slots = useSlots()
const slotNames = Object.keys(slots) as string[]

</script>

<style scoped lang="scss">
.search-container {
  width: 100%;
  display: flex;
  align-items: center;
  min-height: 30vh;

  .search-content {
    width: 80%;
    height: 100%;
    display: flex;
  }

  .search-buttons {
    width: 20%;
    height: 100%;
    display: flex;
    // align-items: center;
    align-content: flex-start;
    gap: 8px;
    flex-wrap: wrap;
  }
}
:deep(.el-button) {
  margin-left: 0px;
  min-width: 80px;
}
</style>
