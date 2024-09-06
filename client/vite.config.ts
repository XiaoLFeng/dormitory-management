import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["*"],
  },
  server: {
    proxy: {
      '/api/v1': {
        target: 'http://localhost:8080', // 代理到 Gin 服务器
        changeOrigin: true,
      },
    },
  },
})
