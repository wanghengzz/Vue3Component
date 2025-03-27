<!--
 * @Author: 
 * @Date: 2025-01-13 10:18:32
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-03-27 13:40:26
 * @Description: 
 * @FilePath: \vue3-project\src\Layout\index.vue
-->
<template>
  <div class="layout-container">
    <nav class="nav-container">
      <div>
        <router-link v-for="item in navList" :to="item.path" :key="item.path">{{ item.meta.title }}</router-link>
      </div>
      <div>
        <dropDown />
      </div>
    </nav>

    <div class="app-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import dropDown from './dropDown/index.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const navList = router.getRoutes().filter(item => item?.meta?.show)
console.log(navList);

</script>

<style scoped lang="scss">
.layout-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .nav-container {
    background-color: #f8f9fa;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 10px;
    box-sizing: border-box;
    height: $nav-height;
    display: flex;
    align-items: center;
    justify-content: space-between;
    a {
      color: #333;
      text-decoration: none;
      margin: 0 5px;
      border-radius: 4px;
      transition: all 0.3s ease;
      padding:10px;
      &:hover {
        background-color: #6184a8;
      }
      &.active {
        color: #007bff;
        background-color: #e9ecef;
      }
    }
  }
  .app-container {
    width: 100%;
    height: calc(100vh - $nav-height);
    padding: $content-padding;
    box-sizing: border-box;
    & > div {
      width: 100% !important;
      height: 100% !important;
      display: block;
      box-sizing: border-box;
    }
  }
}

</style>
