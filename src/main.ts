import { createSSRApp } from 'vue'
import { createSSRRouter } from './router'
// import './style.css'
import 'normalize.css/normalize.css' // 重置 css 样式
// import { ElMessage } from 'element-plus' //服务端渲染不支持按需引入的方式，需要注释掉 vite.config.ts 中的配置
import ElementPlus, { ElMessage, ID_INJECTION_KEY } from 'element-plus'
import 'element-plus/dist/index.css' // 全局引入element-plus 样式
import App from './App.vue'
import { createSSRI18n } from './language/i18n'

import { key, createSSRStore } from './store'

// Creates an application instance
export function createApp() {
  const app = createSSRApp(App) // Creates an application instance in SSR Hydration mode.
  const router = createSSRRouter()
  const store = createSSRStore() // 每次都创建一个新的实例
  const i18n = createSSRI18n()

  app.use(router)
  app.use(i18n)
  app.use(ElementPlus) // 全局注册
  app.use(store, key)
  app.config.globalProperties.$message = ElMessage
  app.provide(ID_INJECTION_KEY, {
    prefix: Math.floor(Math.random() * 10000),
    current: 0
  })
  return { app, router, store }
}
