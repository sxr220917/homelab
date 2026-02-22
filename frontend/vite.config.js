import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // 拦截所有以 /api 开头的请求
      '/api': {
        target: 'http://localhost:8000', // 指向你本地运行的 FastAPI 后端
        changeOrigin: true,
        // 重写路径：把请求中的 '/api' 削掉
        // 因为你的后端接口是 /health，而不是 /api/health
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
