/*
 * @Author:
 * @Date: 2025-01-16 10:11:44
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-03-26 09:50:13
 * @Description:
 * @FilePath: \vue3-project\src\stores\modules\enume.ts
 */
import { defineStore } from 'pinia'
import { getEnumeValue } from '@/api/User'
interface EnumState {
  enum: Record<string, any>
}

export const useEnumStore = defineStore('enum', {
  state: (): EnumState => ({
    enum: {},
  }),
  getters: {
    getEnumValue: (state) => (key: string) => {
      let localEnume = localStorage.getItem('enum')
      const parsedEnum = localEnume ? JSON.parse(localEnume) : {}
      return state.enum[key] || parsedEnum[key]
    },
  },
  actions: {
    setEnum(key: string, value: any) {
      this.enum[key] = value
    },
    async setEnumData() {
      let res = (await getEnumeValue({})) as any
      if (res.retCode == '200') {
        this.enum = res.data
        localStorage.setItem('enum', JSON.stringify(this.enum))
      }
    },
  },
  persist: {
    key: 'enum',
  },
})
