import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/expediente': {
        target: 'http://localhost:8082',  // Dirección del backend Spring Boot
        changeOrigin: true,
        secure: false,
    
        ws: true,
      },
      '/documento': {
        target: 'http://localhost:8082',  // Dirección del backend Spring Boot
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});