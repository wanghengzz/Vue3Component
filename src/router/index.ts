/*
 * @Author: 
 * @Date: 2025-01-13 09:48:42
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-01-15 13:46:34
 * @Description: 
 * @FilePath: \vue3-project\src\router\index.ts
 */
/*
 * @Author: 
 * @Date: 2025-01-13 09:48:42
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-01-15 13:30:24
 * @Description: 
 * @FilePath: \vue3-project\src\router\index.ts
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// 定义路由记录类型
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('../Layout/index.vue'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('../views/Home/Home.vue'),
        meta: {
          title: '首页',
        },
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('../views/About/About.vue'),
        meta: {
          title: '关于',
        },
      },
      {
        path: 'iframe',
        name: 'Iframe',
        component: () => import('../views/Iframe/index.vue'),
        meta: {
          title: 'iframe',
          isIframe: true,
        },
        props: (route) => ({
          iframeUrl: route.query.url || 'http://localhost:8081/iframe',
        }),
      },
      {
        path: 'iframe2',
        name: 'Iframe2',
        component: () => import('../views/Iframe/index.vue'),
        meta: {
          title: 'iframe2',
          isIframe: true,
        },
        props: (route) => ({
          iframeUrl: route.query.url || 'http://localhost:8081/about',
        }),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 添加类型化的路由守卫
router.beforeEach((to, from, next) => {
  // 使用可选链操作符安全地访问 meta 属性
  document.title = `${to.meta?.title ?? '默认标题'}`
  next()
})

export default router 