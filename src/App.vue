<!--
 * @Author: 
 * @Date: 2024-09-19 16:02:57
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-01-16 10:24:21
 * @Description: 
 * @FilePath: \vue3-project\src\App.vue
-->
<script setup lang="ts">
import { useStore } from './stores'
import { onMounted } from 'vue'
import { enumData } from './mock'
const store = useStore()
onMounted(() => {
  store.enum.setEnumData(enumData)
})
</script>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style scoped lang="scss">
.app-container {
  width: 100%;
  height: 100%;
}
</style>
