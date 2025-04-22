/*
 * @Author:
 * @Date: 2025-01-16 10:25:49
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-04-21 10:11:22
 * @Description:
 * @FilePath: \vue3-project\src\hook\getEnumeValue.ts
 */
import { useStore } from '../stores'
export const getEnumeValue = (key: string, addAll = false) => {
  const store = useStore()
  let list = store.enum.getEnumValue(key) || []
  let all = { value: '', label: '全部' }
  if (addAll) {
    return [all, ...list]
  }
  return list
}
