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
console.log(router.getRoutes())
const navList = router.getRoutes().filter(item => item.path !== '/')
</script>

<style scoped lang="scss">
.layout-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .nav-container {
    padding: 20px;
    background-color: #f8f9fa;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    a {
      color: #333;
      text-decoration: none;
      padding: 10px 20px;
      margin: 0 5px;
      border-radius: 4px;
      transition: all 0.3s ease;
      &:hover {
        background-color: #e9ecef;
      }
      &.active {
        color: #007bff;
        background-color: #e9ecef;
      }
    }
  }
  .app-container {
    width: 100%;
    height: calc(100vh - 60px); // 减去导航栏的高度
  }
}

</style>
