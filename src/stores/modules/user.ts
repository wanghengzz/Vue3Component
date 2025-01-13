/*
 * @Author: 
 * @Date: 2025-01-13 09:52:25
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-01-13 09:59:01
 * @Description: 
 * @FilePath: \vue3-project\src\stores\modules\user.ts
 */
import { defineStore } from 'pinia'
import type { UserState } from '../types'

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    id: 0,
    username: '',
    token: '',
    roles: []
  }),

  getters: {
    isLoggedIn(): boolean {
      return !!this.token
    },
    userRoles(): string[] {
      return this.roles
    }
  },

  actions: {
    async login(username: string, password: string) {
      try {
        // 模拟API调用
        const response = await fetch('/api/login', {
          method: 'POST',
          body: JSON.stringify({ username, password })
        })
        const data = await response.json()
        
        this.username = data.username
        this.token = data.token
        this.roles = data.roles
      } catch (error) {
        throw new Error('登录失败')
      }
    },

    logout() {
      this.id = 0
      this.username = ''
      this.token = ''
      this.roles = []
    }
  },

  persist: {
    key: 'user'
  }
}) 