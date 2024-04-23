import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // 添加一个别名 "@components" 指向 "src/components" 目录
      'Models': path.resolve(__dirname, 'src/models'),
      // 你可以根据需要添加更多别名
      'Utils': path.resolve(__dirname, 'src/utils'),
      'Modules': path.resolve(__dirname, 'src/modules'),
      'Src': path.resolve(__dirname, 'src'),

    },
  },
  server: {
    proxy: {
        '/flower': {
            target: 'http://localhost:3000',
            changeOrigin: true,
        }
    }
  }
})
