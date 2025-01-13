import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 导入各个模块
import { useSettingsStore } from './modules/settings'
import { useUserStore } from './modules/user'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// 创建根 store
export const useStore = () => {
  return {
    settings: useSettingsStore(),
    user: useUserStore(),
    // 可以继续添加其他模块
    // auth: useAuthStore(),
  }
}

export default pinia 
