/*
 * @Author: 
 * @Date: 2024-09-19 16:02:57
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-01-13 13:38:26
 * @Description: 
 * @FilePath: \vue3-project\vite.config.ts
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/style/variables.scss" as *;`,
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
