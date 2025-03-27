/*
 * @Author: 
 * @Date: 2025-01-13 09:52:49
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-03-26 09:46:25
 * @Description: 
 * @FilePath: \vue3-project\src\stores\index.ts
 */
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 导入各个模块
import { useSettingsStore } from './modules/settings'
import { useLoginStore } from './modules/login'
import { useEnumStore } from './modules/enume'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// 创建根 store
export const useStore = () => {
  return {
    settings: useSettingsStore(),
    login: useLoginStore(),
    enum: useEnumStore(),
    // 可以继续添加其他模块
    // auth: useAuthStore(),
  }
}

export default pinia 
