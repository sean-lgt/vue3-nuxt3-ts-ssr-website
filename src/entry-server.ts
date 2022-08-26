/*
 * 服务端入口文件
 */

import { createApp } from '@/main'
import { renderToString } from 'vue/server-renderer'

export async function render(url: string) {
  const { app, router } = createApp()
  await router.push(url) // 当前路由地址
  await router.isReady()
  const html = await renderToString(app)
  return html
}
