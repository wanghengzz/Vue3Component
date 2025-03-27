/*
 * @Author:
 * @Date: 2024-11-12 14:45:43
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-03-20 15:34:19
 * @Description:
 * @FilePath: \vue3-project\src\components\types\button.ts
 */

import type { Component } from 'vue'

export interface ButtonItem {
  text: string
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'upload'
  icon?: string | Component
  disabled?: boolean
  onClick: () => void
  iconPosition?: 'left' | 'right'
  size?: number
  loading?: boolean
  action?: string
  autoUpload?: boolean
  onUploadSuccess?: (response: any) => void
  onUploadError?: (error: any) => void
}

export interface Props {
  buttonGroup: ButtonItem[]
}