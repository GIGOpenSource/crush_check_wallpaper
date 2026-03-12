import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

export default defineConfig({
  plugins: [uni()],
  transpileDependencies: ['uview-plus'],
  // server: {
  //   host: '0.0.0.0',
  //   port: 3000,
  //   proxy: {
  //     // 匹配所有 /api 开头的请求
  //     '/api': {
  //       target: 'http://192.168.77.43:8002/', // 后端基础地址（不要加末尾的 /）
  //       changeOrigin: true, // 必须开启：模拟跨域请求的 Origin
  //       secure: false, // 非 HTTPS 接口需关闭
  //       rewrite: (path) => path.replace(/^\/api/, '/api') // 保留 /api 前缀（因为后端接口带 /api）
  //     }
  //   }
  // },
  //  resolve: {
  //   alias: {
  //     '@': '/src', // 若你的代码在 src 目录下；否则改为 '@': '/'
  //   }
  // }
})