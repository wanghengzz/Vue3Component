/*
 * @Author: 
 * @Date: 2025-01-13 09:48:42
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-04-01 14:29:09
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
import { useStore } from '@/stores'

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
          show: true,
        },
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('../views/About/About.vue'),
        meta: {
          title: '关于',
          show: true,
        },
      },
      {
        path: 'product',
        name: 'Product',
        component: () => import('../views/Product/index.vue'),
        meta: {
          title: '产品',
          show: true,
        },
      },
      // {
      //   path: 'iframe',
      //   name: 'Iframe',
      //   component: () => import('../views/Iframe/index.vue'),
      //   meta: {
      //     title: 'iframe',
      //     isIframe: true,
      //   },
      //   props: (route) => ({
      //     iframeUrl: route.query.url || 'http://localhost:8081/iframe',
      //   }),
      // },
      // {
      //   path: 'iframe2',
      //   name: 'Iframe2',
      //   component: () => import('../views/Iframe/index.vue'),
      //   meta: {
      //     title: 'iframe2',
      //     isIframe: true,
      //   },
      //   props: (route) => ({
      //     iframeUrl: route.query.url || 'http://localhost:8081/about',
      //   }),
      // },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login/index.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound/index.vue'),
    meta: {
      title: '404',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 添加类型化的路由守卫
router.beforeEach((to, from, next) => {
  // 获取本地存储的token
  let store=useStore()
  const token = store.login.token
  
  // 设置白名单路由，这些路由不需要验证token
  const whiteList = ['/login']
  
  // 使用可选链操作符安全地访问 meta 属性
  document.title = `${to.meta?.title ?? '默认标题'}`

  if (whiteList.includes(to.path)) {
    // 如果是白名单路由，直接放行
    next()
  } else if (!token) {
    // 如果没有token，重定向到登录页
    next('/login')
  } else {
    // 有token，放行
    next()
  }
})


export default router 