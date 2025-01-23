/*
 * @Author: 
 * @Date: 2025-01-21 14:48:44
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-01-21 14:52:57
 * @Description: 
 * @FilePath: \vue3-project\src\views\About\helper\index.ts
 */
export const list = {
  type: 'text',
  title: '关于我们',
  content: '关于我们',
  get: () => {
    return '关于我们'
  },
  set: (value: string) => {
    console.log(value)
  },
}