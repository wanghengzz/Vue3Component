import { defineStore } from 'pinia'
import type { SettingsState } from '../types'

type Theme = 'light' | 'dark'

export const useSettingsStore = defineStore('settings', {
  state: (): SettingsState => ({
    theme: 'light',
    language: 'zh-CN',
    sidebar: {
      collapsed: false
    }
  }),

  getters: {
    currentTheme(): string {
      return this.theme
    }
  },

  actions: {
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
    },
    
    setLanguage(lang: string) {
      this.language = lang
    },
    
    toggleSidebar() {
      this.sidebar.collapsed = !this.sidebar.collapsed
    },

    setTheme(theme: Theme) {
      this.theme = theme
    }
  },

  persist: {
    key: 'settings'
  }
}) 