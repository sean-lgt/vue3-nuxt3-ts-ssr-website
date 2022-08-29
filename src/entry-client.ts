/*
 * 客户端入口文件
 */
import { createApp } from '@/main'
import airbnb from './db'

const { app, router, store } = createApp()

// 取到服务端获取到并且存在window上的state  实现同步
if ((window as any).__INITIAL_STATE__) {
  store.replaceState((window as any).__INITIAL_STATE__)
}
// TODO:初始化所有对象仓库
router.beforeEach((to, from, next) => {
  airbnb.airbnbDB
    .openStore({
      ...airbnb.languageObjectStore,
      ...airbnb.userObjectStore
    })
    .then((res: any) => {
      console.log('初始化所有对象仓库', res)
      next()
    })
})

router.isReady().then(() => {
  // 所有路由都加载完毕后挂载
  // 挂载完成后将由客户端接管操作
  app.mount('#app')
})
