/*
 * @Author: 
 * @Date: 2025-01-16 10:25:49
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-01-16 10:27:27
 * @Description: 
 * @FilePath: \vue3-project\src\hook\getEnumeValue.ts
 */
import { useStore } from '../stores'
export const getEnumeValue = (key: string) => {
  const store = useStore()
  return store.enum.getEnumValue(key) || []
}