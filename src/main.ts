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
console.log(Components.components, 'Components')

const app = createApp(App)
app.use(Components)
app.use(pinia)
app.use(router)
app.use(ElementPlus, {
  locale: zhCn,
})
app.mount('#app')
