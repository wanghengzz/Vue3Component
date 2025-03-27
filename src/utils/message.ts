/*
 * @Author: 
 * @Date: 2025-02-10 10:18:46
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-02-12 09:37:00
 * @Description: 
 * @FilePath: \vue3-project\src\utils\message.ts
 */
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'
import { h } from 'vue'
export const message = (message: string,type: 'success' | 'error' | 'warning' | 'info' = 'success') => {
  ElMessage[type](message)
}


interface ConfirmOptions {
  message: string
  title?: string
  confirmButtonText?: string
  cancelButtonText?: string
  type?: 'warning' | 'info' | 'success' | 'error'
  onConfirm?: () => void
  onCancel?: () => void
  
}

export const confirmMessage =async (options: ConfirmOptions) => {
  return ElMessageBox.confirm(options.message, options.title || '提示', {
    confirmButtonText: options.confirmButtonText || '确定',
    cancelButtonText: options.cancelButtonText || '取消',
    type: options.type || 'warning',
    customClass: 'confirm-dialog',
    closeOnClickModal: false,
    closeOnPressEscape: false,
    draggable: true,
    showClose: false,
  }).then(() => {
    options.onConfirm?.()
  }).catch(() => {
    options.onCancel?.()
  })
}

interface NotificationOptions {
  message: string
  title?: string
  type?: 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

export const notification = (options: NotificationOptions) => {
  ElNotification({
    title: options.title || 'Title',
    message: h('i', { style: 'color: teal' }, options.message),
    type: options.type || 'success',
    duration: options.duration || 3000,
  })
}


interface PromptOptions {
  message: string
  title?: string
  confirmButtonText?: string
  cancelButtonText?: string
  type?: 'warning' | 'info' | 'success' | 'error'
  onConfirm?: (value: string) => void
  onCancel?: () => void
}

export const promptMessage = async (options: PromptOptions) => {
  return ElMessageBox.prompt(options.message, options.title || '提示', {
    confirmButtonText: options.confirmButtonText || '确定',
    cancelButtonText: options.cancelButtonText || '取消',
    type: options.type || 'warning',
    customClass: 'prompt-dialog',
    closeOnClickModal: false,
    closeOnPressEscape: false,
    draggable: true,
    showClose: false,
  }).then(({ value }) => {
    options.onConfirm?.(value)
  }).catch(() => {
    options.onCancel?.()
  })
}