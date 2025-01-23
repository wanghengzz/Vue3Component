<!--
 * @Author: 
 * @Date: 2025-01-13 09:48:59
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-01-21 15:25:21
 * @Description: 
 * @FilePath: \vue3-project\src\views\About\About.vue
-->
<template>
  <div class="about">
    <el-button type="primary" @click="handleClick">Primary</el-button>
    <h1>123</h1>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useStore } from '@/stores/index'
import _ from 'lodash'
import { list } from './helper'
const store = useStore()
console.log(store)
const handleClick = () => {
  store.settings.setTheme('dark')
}

onMounted(() => {
})

</script> 