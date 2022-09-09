import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import vitePluginCompression from 'vite-plugin-compression' // vite  开启代码压缩 插件

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vitePluginCompression()
    // 按需引入 ele-plus 服务端渲染需注释
    // AutoImport({
    //   resolvers: [ElementPlusResolver()]
    // }),
    // Components({
    //   resolvers: [ElementPlusResolver()]
    // })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData:
          '@import "@/assets/scss/variable.scss";@import "@/assets/scss/main.scss";'
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.vue', '.js', '.json', '.ts']
  },
  // 配置本地服务代理
  server: {
    host: '127.0.0.1',
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://110.42.184.111',
        rewrite: (path) => path
      }
    }
  },
  // 配置打包相关参数
  build: {
    minify: 'terser', // 当设置为 'terser' 时必须先安装Terser  npm add -D terser
    terserOptions: {
      compress: {
        drop_console: true, // 生产环境时移除console
        drop_debugger: true // 生产环境时移除debugger
      }
    }
  }
})
