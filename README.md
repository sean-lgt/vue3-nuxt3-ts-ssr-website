# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## 项目结构目录

```
├── auto-imports.d.ts             # element-plus 自动导入组件
├── commitlint.config.cjs         # git commitlint 配置文件
├── components.d.ts               # 组件声明文件
├── dist                          # 使用 npm run build:ssr 生成的文件
│   ├── client                    # 生成的客户端文件
│   │   ├── assets
│   │   ├── index.html
│   │   ├── ssr-manifest.json
│   │   ├── ssr-manifest.json.gz
│   │   └── vite.svg
│   └── server                    # 生成的服务端文件
│       ├── assets
│       ├── entry-server.mjs
│       ├── entry-server.mjs.gz
│       └── vite.svg
├── index.html                    # vite html 模板文件
├── .env.development              # 环境变量文件
├── nuxt3-app-start-demo          # nuxt3 初体验项目文件
│   ├── app.vue
│   ├── nuxt.config.ts
│   ├── package-lock.json
│   ├── package.json
│   ├── pages
│   │   └── home.vue
│   ├── README.md
│   └── tsconfig.json
├── package-lock.json
├── package.json        # 相关依赖包配置文件
├── public          
│   └── vite.svg
├── README.md
├── server.js           # node 服务端文件
├── src
│   ├── api             # 接口 api 文件
│   │   ├── detail
│   │   ├── index.ts
│   │   ├── interface.ts
│   │   ├── layout
│   │   ├── login
│   │   ├── order
│   │   └── record
│   ├── App.vue         # spa 根目录 
│   ├── assets          # 静态资源文件
│   │   ├── images
│   │   ├── scss
│   │   └── vue.svg
│   ├── components      # 全局自定义组件
│   │   ├── common      # 公共组件 分页
│   │   └── Layout      # layout 布局组件
│   ├── composables     # hooks 函数组件
│   │   ├── common
│   │   └── login
│   ├── db              # 使用 indexedDB 自建的 mock 目录
│   │   ├── index.ts
│   │   ├── objectStores
│   │   └── type.ts
│   ├── entry-client.ts      # 客户端入口文件
│   ├── entry-server.ts      # 服务端入口文件
│   ├── language             # 国际化语言配置
│   │   ├── en.ts
│   │   ├── i18n.ts
│   │   └── zh.ts
│   ├── main.ts              # vite 入口文件
│   ├── router               # 路由
│   │   └── index.ts
│   ├── store                # vuex 状态管理
│   │   └── index.ts
│   ├── style.css            # 全局 css
│   ├── utils                # 工具箱
│   │   ├── http.ts
│   │   └── indexedDB.ts
│   ├── views                # 页面视图
│   │   ├── detail
│   │   ├── home
│   │   ├── login
│   │   ├── mine
│   │   ├── order
│   │   └── record
│   └── vite-env.d.ts
├── tsconfig.json            # ts 配置
├── tsconfig.node.json
└── vite.config.ts           # vite 项目配置
```
