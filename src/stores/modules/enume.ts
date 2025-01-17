/*
 * @Author: 
 * @Date: 2025-01-16 10:11:44
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-01-16 10:24:02
 * @Description: 
 * @FilePath: \vue3-project\src\stores\modules\enume.ts
 */
import { defineStore } from 'pinia'

interface EnumState {
  enum: Record<string, any>
}

export const useEnumStore = defineStore('enum', {
  state: (): EnumState => ({
    enum: {
    }
  }),
  getters: {
    getEnumValue: (state) => (key: string) => {
      return state.enum[key]
    }
  },
  actions: {
    setEnum(key: string, value: any) {
      this.enum[key] = value
    },
    setEnumData(value: any) {
      this.enum = value
    }
  },
  persist: {
    key: 'enum'
  }
})