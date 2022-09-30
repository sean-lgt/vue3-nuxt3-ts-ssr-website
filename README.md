# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

# 技术选型
在开始一个前端项目之前，我们首先要做的就是技术调研和选型，比如：
- 是否支持国际化
- 是否需要SEO优化
- 是否支持服务端渲染
- 第三方框架的选择
- 技术栈的选择
- 代码管理工具
- 是否需要混合开发，兼容多端
- 是否需要进行响应式布局
- 是否支持PWA
- 是否微前端架构
- 团队协作

# SSR方案初探
## 同构渲染SSR两种方案：
- 一种是使用开箱即用的 Nuxt3框架
- 一种是基于单页面渐进式服务端渲染方案（同构）

## SSR传统服务端渲染
传统的服务渲染有：asp、jsp、ejs等，服务端语言往往同构这些模板引擎将数据和 dom 在服务端渲染完成，返回一个完整静态的 html 页面给客户端，由客户端直接显示。

**原理**
1. 客户端发送 http 请求
2. 服务端响应 http 请求，返回拼接好的 html 字符串给客户端
3. 客户端渲染 html
   
**缺点** 

1. 前后端不分离，不好维护
2. 用户体验不佳，需要重新加载页面
3. 服务端压力大
   
## CSR 客户端渲染
在现代的前端项目中，客户端渲染的代表性技术栈是 vue、react、angular，我们常常使用他们来构建客户端单页或者多页应用程序，以 SPA 构建程序为例，在浏览器首先渲染的是一套空的 html，通过 JS 借进行页面的渲染和路由跳转等操作，所有的数据通过 ajax 请求从服务器获取后，在进行客户端的拼接和展示。 

**原理**
1. 客户daunt发起 http 请求
2. 服务端响应 http 请求，返回一个空的 html 文件
3. 客户端初始化时加载必须的 js 文件，请求接口
4. 将生成的 dom 插入到 html 中
   
**缺点** 

1. 首屏加载慢
2. 不利于SEO
## 同构（现代服务端渲染）
Vue、React 的 SSR 方案实际上就是同构渲染，我们现在讲的服务端渲染概念，是指在前端范畴或者说在 Vue、React 等单页面技术栈范畴内，基于 Node.js Server 运行环境的服务端渲染方案，通过在 Node.js 中运行应用程序的前端框架（例如 React、Vue 等）,将其渲染成HTML，最后再客户端进行注水化处理。简单来说，就是应用程序的大部分代码在服务器（node服务端）和客户端上运行，这就是所谓的现代服务端渲染：同构。

**原理**
1. 客户端发起 http 请求
2. 服务端渲染把 Vue 实例转换成了静态的 html 发送给客户端
3. 客户端渲染时需要把事件、响应式特性等 Vue 的特性都绑回去
   
**缺点** 
1. 服务器压力大
2. 涉及构建设置和部署更多要求
3. 一些三方库可能需要特殊处理
   
**优点**
1. 首屏加载速度快
2. 前后端分离
3. 利于 SEO
4. 有一些现成框架：Nuxt.js、Next.js

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

# 使用husky触发git提交规范
1. 安装husky `npx husky-init ; npm install` 
2. 安装 commitizen git 提交规范：`npm install commitizen -D`
3. 安装并初始化 cz-conventional-changelog：`npx commitizen init cz-conventional-changelog --save-dev --save-exact`
4. 在 package.json 的 script 中配置命令：`"commit":"cz"`
5. 安装 commitlint 限制提交规范，避免直接提交：`npm i @commitlint/config-conventional @commitlint/cli -D`
6. 在项目根目录创建commitlint.config.cjs进行配置
```
module.exports = {
  extends: ['@commitlint/config-conventional']
}
```
7. 使用 husky 生成的 commit-msg 文件，验证提交信息
8. 提交前先执行：`eslint src/**/*.{js,jsx,vue,ts,tsx} --fix`进行代码格式校验
```
// commit-msg
npx --no-install commitlint --config commitlint.config.cjs --edit $1
```
```
// pre-commit
npm run lint
```
# 集成axios并封装请求
## 安装
`npm install axios -D`
## 基本使用
```
import axios from 'axios'
import { url } from 'inspector'

const DEFAULT_CONFIG = {
  timeout: 5000,
  baseUrl: ''
}

const axiosInstance = axios.create({ ...DEFAULT_CONFIG })

// 请求拦截
axiosInstance.interceptors.request.use(
  (config) => {
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

// 响应拦截
axiosInstance.interceptors.response.use(
  (config) => {
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

// 封装请求
const httpRequestGet = (url, params) => {
  return axiosInstance
    .get(url, params)
    .then((res) => res.data)
    .catch()
}

const httpRequestPost = (url, params) => {
  return axiosInstance
    .post(url, params)
    .then((res) => res.data)
    .catch()
}

export default {
  httpRequestGet,
  httpRequestPost
}


// App.vue
import { getRoomList } from './api/index'
const fetchList = async () => {
  const result = await getRoomList()
  console.log('🚀【请求获取到的数据】', result)
}
```
## 封装
```
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const DEFAULT_CONFIG = {
  timeout: 5000,
  baseUrl: ''
}

class Http {
  constructor() {
    this.httpInterceptorsRequest()
    this.httpInterceptorsResponse()
  }

  private static axiosInstance = axios.create({ ...DEFAULT_CONFIG })

  // 请求拦截
  private httpInterceptorsRequest() {
    Http.axiosInstance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        return config
      },
      (err) => {
        return Promise.reject(err)
      }
    )
  }

  // 响应拦截
  private httpInterceptorsResponse() {
    Http.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response
      },
      (err) => {
        return Promise.reject(err)
      }
    )
  }

  /**
   * 封装请求
   */
  // get
  public httpRequestGet<T>(
    url: string,
    params: AxiosRequestConfig
  ): Promise<T> {
    return Http.axiosInstance
      .get(url, { params })
      .then((res) => res.data)
      .catch()
  }

  // post
  public httpRequestPost<T>(
    url: string,
    params: AxiosRequestConfig
  ): Promise<T> {
    return Http.axiosInstance
      .post(url, params)
      .then((res) => res.data)
      .catch()
  }
}

export const http = new Http()
```
