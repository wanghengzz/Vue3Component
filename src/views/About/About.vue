<!--
 * @Author: 
 * @Date: 2025-01-13 09:48:59
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-01-13 13:41:46
 * @Description: 
 * @FilePath: \vue3-project\src\views\About\About.vue
-->
<template>
  <div class="about">
    <h1>
      <el-button type="primary" @click="handleClick">Primary</el-button>
    </h1>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/stores/index'
const store = useStore()
console.log(store)
const handleClick = () => {
  store.settings.setTheme('dark')
}
</script> 