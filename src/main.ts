/*
 * @Author: 
 * @Date: 2024-09-19 16:02:57
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-01-17 14:12:53
 * @Description: 
 * @FilePath: \vue3-project\src\main.ts
 */
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import './style/globle.scss'
import router from './router'
import pinia from './stores'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import Components from './components'
// 引入el-icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
// 注册el-icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(Components)
app.use(pinia)
app.use(router)
app.use(ElementPlus, {
  locale: zhCn,
})
app.mount('#app')
