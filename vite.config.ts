import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // 將 Vuetify 分離為獨立 chunk
          'vuetify': ['vuetify'],
          // 將 Vue 相關包分離
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
        }
      }
    },
    chunkSizeWarningLimit: 1000, // 提高警告閾值到 1MB
  }
})
