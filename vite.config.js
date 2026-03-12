import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

export default defineConfig({
  plugins: [uni()],
  transpileDependencies: ['uview-plus'],
  publicPath: './',
  devServer: {
    // host: '0.0.0.0',
    // port: 3000,
    proxy: {
      // 匹配所有 /api 开头的请求
      '/api': {
          target: 'https://markwallpapers.com',
        // ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
})