/*
 * @Author: 
 * @Date: 2025-01-16 10:25:49
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-03-04 14:24:48
 * @Description: 
 * @FilePath: \vue3-project\src\hook\getEnumeValue.ts
 */
import { useStore } from '../stores'
export const getEnumeValue = (key: string,addAll = false) => {
  const store = useStore()
  let list =store.enum.getEnumValue(key) || []
  let all = { enumValue: '', enumDesc: '全部' }
  if(addAll){
    return [all, ...list]
  }
  return list
}



