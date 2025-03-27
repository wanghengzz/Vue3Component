/*
 * @Author: 
 * @Date: 2024-09-19 16:02:57
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-03-04 13:04:30
 * @Description: 
 * @FilePath: \vue3-project\vite.config.ts
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// https://vitejs.dev/config/
const localServer = 'http://127.0.0.1:9000'
export default defineConfig({
  plugins: [vue()],
  // 配置代理
  server: {
    proxy: {
      '/api': {
        target: localServer,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
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
