/*
 * @Author:
 * @Date: 2024-11-12 14:45:43
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-01-23 15:10:40
 * @Description:
 * @FilePath: \vue3-project\src\components\types\button.ts
 */

import type { Component } from 'vue'

export interface ButtonItem {
  text: string
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  icon?: string | Component
  disabled?: boolean
  onClick: () => void
  iconPosition?: 'left' | 'right'
  size?: number
  loading?:boolean
}

export interface Props {
  buttonGroup: ButtonItem[]
}