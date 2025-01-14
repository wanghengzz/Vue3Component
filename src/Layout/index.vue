<template>
  <div class="layout-container">
    <nav class="nav-container">
      <router-link v-for="item in navList" :to="item.path" :key="item.path">{{ item.meta.title }}</router-link>
    </nav>

    <div class="app-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const navList = router.getRoutes().filter(item => item.path !== '/')
</script>

<style scoped lang="scss">
.layout-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .nav-container {
    background-color: #f8f9fa;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 10px;
    height: $nav-height;
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
    width: calc(100% - $content-padding * 2);
    height: calc(100vh - $nav-height); // 减去导航栏的高度
    padding: $content-padding;
    & > div {
      width: 100%;
      height: 100%;
    }
  }
}

</style>
