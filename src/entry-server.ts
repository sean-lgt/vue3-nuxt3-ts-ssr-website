/*
 * 服务端入口文件
 */

import { createApp } from '@/main'
import { renderToString } from 'vue/server-renderer'

export async function render(url: string) {
  const { app, router, store } = createApp()
  await router.push(url) // 当前路由地址
  await router.isReady()

  const matchedComponents = router.currentRoute.value.matched.flatMap(
    (record: any) => {
      return Object.values(record.components)
    }
  )

  // 对所有匹配的路由组件调用 asyncData
  await Promise.all(
    matchedComponents.map((Component: any) => {
      if (Component.asyncData) {
        return Component.asyncData({
          store,
          route: router.currentRoute
        })
      }
    })
  )

  const html = await renderToString(app)
  return html
}
