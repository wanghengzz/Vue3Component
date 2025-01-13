// 用户模块状态接口
export interface UserState {
  id: number
  username: string
  token: string
  roles: string[]
}

// 应用设置模块状态接口
export interface SettingsState {
  theme: 'light' | 'dark'
  language: string
  sidebar: {
    collapsed: boolean
  }
}

// 其他模块的接口定义... 