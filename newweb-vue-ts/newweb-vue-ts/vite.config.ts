import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    port: 5888,
    https: false,
  },
  resolve: {
    alias: {
      '@': resolve('./src'),
      '@/*': resolve('./src/*'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 两种方式都可以
        additionalData: '@import "@/assets/scss/global.scss";',
        // additionalData: '@use "@/assets/scss/global.scss" as *;'
      },
    },
  },
})
