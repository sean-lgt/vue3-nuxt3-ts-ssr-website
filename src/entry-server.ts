/*
 * 服务端入口文件
 */

import { createApp } from '@/main'
import { renderToString } from 'vue/server-renderer'

export async function render(url: string, manifest: any) {
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
      return Component
    })
  )
  // 渲染上下文
  const context: any = {}
  const appHtml = await renderToString(app, context)
  const state = store.state
  // 生产环境需要 预加载 静态资源
  if (import.meta.env.PROD) {
    const preloadLinks = renderLinks(context.modules, manifest)
    return { appHtml, state, preloadLinks }
  } else {
    return { appHtml, state }
  }
}

/**
 * @description: 预加载链接，静态资源
 * @return {*}
 * @param {any} modules
 * @param {any} manifest
 */
function renderLinks(modules: any, manifest: any) {
  let links = ''
  modules.forEach((id: any) => {
    const files = manifest[id]
    if (files) {
      files.forEach((file: any) => {
        links += renderPreloadLink(file)
      })
    }
  })
  return links
}

/**
 * @description: 预加载链接拼接，通过后缀名判断
 * @return {*}
 * @param {any} file
 */
function renderPreloadLink(file: any) {
  if (file.endsWith('.js')) {
    return `<link rel="modulepreload" crossorigin href="${file}">`
  } else if (file.endsWith('.css')) {
    return `<link rel="stylesheet" href="${file}">`
  } else if (file.endsWith('.woff')) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`
  } else if (file.endsWith('.woff2')) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`
  } else if (file.endsWith('.gif')) {
    return ` <link rel="preload" href="${file}" as="image" type="image/gif">`
  } else if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
    return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`
  } else if (file.endsWith('.png')) {
    return ` <link rel="preload" href="${file}" as="image" type="image/png">`
  } else {
    // TODO
    return ''
  }
}
