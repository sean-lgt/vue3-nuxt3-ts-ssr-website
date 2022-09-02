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
      ...airbnb.userObjectStore,
      ...airbnb.orderObjectStore,
      ...airbnb.recordObjectStore
    })
    .then((res: any) => {
      console.log('初始化所有对象仓库', res)
      // store 登录数据持久化处理
      localStorage.getItem('userId') && store.commit('setUserStatus', 1)
      next()
    })
})

router.isReady().then(() => {
  // 所有路由都加载完毕后挂载
  // 通过全局的路由守卫
  router.beforeResolve((to, from, next) => {
    // 对所有匹配的路由组件调用 asyncData
    const toComponents = router
      .resolve(to)
      .matched.flatMap((record: any) => Object.values(record.components)) // 路由去的地址
    const fromComponents = router
      .resolve(from)
      .matched.flatMap((record: any) => Object.values(record.components)) // 路由过来的地址
    // 看路由匹配是否一致
    const actived = toComponents.filter((c, i) => {
      return fromComponents[i] !== c
    })
    console.log('🚀【是否需要进行服务端预处理】', actived)

    if (!actived.length) {
      return next() // 属于路由跳转的,直接跳转路由
    } else {
      next()
    }
    console.log('🚀【start----loading】')
    Promise.all(
      actived.map((Component: any) => {
        if (Component.asyncData) {
          return Component.asyncData({
            store,
            route: router.currentRoute
          })
        }
      })
    ).then(() => {
      // next()
      console.log('🚀【end----loading】')
    })
  })

  // 挂载完成后将由客户端接管操作
  app.mount('#app')
})
