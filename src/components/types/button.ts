/*
 * @Author:
 * @Date: 2024-11-12 14:45:43
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-01-14 13:49:55
 * @Description:
 * @FilePath: \vue3-project\src\components\types\button.ts
 */

export interface ButtonType {
  text: string
  type: 'primary' | 'danger' | 'warning' | 'success'
  disabled?: boolean
  onClick?: () => void
}

export interface Props {
  buttonGroup: Array<ButtonType>
}