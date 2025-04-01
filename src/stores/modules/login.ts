/*
 * @Author:
 * @Date: 2025-01-13 09:52:25
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-04-01 13:42:56
 * @Description:
 * @FilePath: \vue3-project\src\stores\modules\login.ts
 */
import { defineStore } from 'pinia'
import type { UserState } from '../types'
import { LoginIn, Register } from '@/api/Login'
export const useLoginStore = defineStore('login', {
  state: (): UserState => ({
    id: 0,
    username: '',
    token: '',
    roles: [],
  }),

  getters: {
    isLoggedIn(): boolean {
      return !!this.token
    },
    userRoles(): string[] {
      return this.roles
    },
  },

  actions: {
    async login(username: string, password: string) {
      try {
        // 模拟API调用
        const response = (await LoginIn({ username, password })) as any
        console.log(response, '~~')
        this.username = response.data.username
        this.token = response.data.token
        localStorage.setItem('token', response.data.token)

        // this.id = response.id
        // this.username = response.username
        // this.token = response.token
        // this.roles = response.roles
      } catch (error) {
        throw new Error('登录失败')
      }
    },

    async RegisterUser(username: string, password: string) {
      try {
       await Register({ username, password })
      } catch (error) {
        throw new Error('注册失败')
      }
    },
    logout() {
      this.id = 0
      this.username = ''
      this.token = ''
      this.roles = []
    },
  },

  persist: {
    key: 'user',
  },
})
