import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    proxy: {
      // forward dev requests for the AI analyze endpoint to backend
      '/analyze-ai': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false,
      },
      // forward dev requests for records endpoint to backend
      '/records': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false,
      },
      // forward health check to backend
      '/health': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})