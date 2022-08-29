const fs = require('fs')
const path = require('path')
const express = require('express')
const serveStatic = require('serve-static') // 生产环境使用
const { createServer: createViteServer } = require('vite')
// 是否是生产环境
const isProd = process.env.NODE_ENV === 'production'
console.log('🚀【是否为生产环境】', isProd)
async function createServer() {
  const app = express()

  // 以中间件模式创建 Vite 应用，这将禁用 Vite 自身的 HTML 服务逻辑并让上级服务器接管控制
  // 如果你想使用 Vite 自己的 HTML 服务逻辑（将 Vite 作为一个开发中间件来使用），那么这里请用 'html')
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
  })
  if (!isProd) {
    // 使用 vite 的 Connect 实例作为中间件
    app.use(vite.middlewares)
  } else {
    // 生产环境
    app.use(serveStatic(path.resolve(__dirname, 'dist/client')))
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl
    let template
    let render
    try {
      if (!isProd) {
        // 开发环境
        // 1. 读取 index.html
        template = fs.readFileSync(
          path.resolve(__dirname, 'index.html'),
          'utf-8'
        )

        // 2. 应用 Vite HTML 转换。这将会注入 Vite HMR 客户端，
        //    同时也会从 Vite 插件应用 HTML 转换。
        //    例如：@vitejs/plugin-react 中的 global preambles
        template = await vite.transformIndexHtml(url, template)

        // 3. 加载服务器入口。vite.ssrLoadModule 将自动转换
        //    你的 ESM 源码使之可以在 Node.js 中运行！无需打包
        //    并提供类似 HMR 的根据情况随时失效。
        render = (await vite.ssrLoadModule('/src/entry-server.ts')).render
      } else {
        // 生产环境
        // 1. 读取 index.html
        template = fs.readFileSync(
          path.resolve(__dirname, 'dist/client/index.html'),
          'utf-8'
        )
        // 2/3. 加载服务器入口
        // render = require('./dist/server/entry-server.mjs').render
        render = (await import('./dist/server/entry-server.mjs')).render
      }

      // 4. 渲染应用的 HTML。这假设 entry-server.js 导出的 `render`
      //    函数调用了适当的 SSR 框架 API。
      //    例如 ReactDOMServer.renderToString()
      const { appHtml, state } = await render(url)

      // 5. 注入渲染后的应用程序 HTML 到模板中。
      const html = template
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace("'<!--vuex-state-->'", JSON.stringify(state))

      // 6. 返回渲染后的 HTML。
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      // 如果捕获到了一个错误，让 Vite 来修复该堆栈，这样它就可以映射回
      // 你的实际源码中。
      vite.ssrFixStacktrace(e)
      next(e)
    }
  })

  app.listen(3000, () => {
    console.log(
      '🚀【node-serve 运行】3000',
      isProd ? '  --生产环境' : '  --开发环境'
    )
  })
}

createServer()