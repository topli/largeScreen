import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve  } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue()],
  resolve: {
    // 配置路径别名
    alias: {
      '@': resolve(__dirname, './src'),
    },
  }
})
