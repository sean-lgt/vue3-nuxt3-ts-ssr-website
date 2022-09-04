import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router'
// import home from '@/views/home/index.vue'
// import mine from '@/views/mine/index.vue'
// import login from '@/views/login/index.vue'

// 使用路由懒加载
const home = () => import('@/views/home/index.vue')
const mine = () => import('@/views/mine/index.vue')
const login = () => import('@/views/login/index.vue')
const roomDetail = () => import('@/views/detail/index.vue')
const record = () => import('@/views/record/index.vue')

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: home,
    meta: {
      title: '爱此迎-全球大型房屋租赁平台',
      keywords: '爱此迎，特价房源，品质房源，租赁平台',
      description:
        '爱此迎（Aircnb）是房屋租赁平台。爱此迎（Aircnb）的房屋涉及上海、北京、杭州、苏州等60个城市，覆盖了特价房源、品质房源，帮助用户实现从线上房屋预定和浏览功能。 ',
      keepAlive: false
    }
  },
  {
    path: '/mine',
    name: 'mine',
    component: mine,
    meta: {
      title: '爱此迎-我的',
      keywords: '',
      description: '',
      keepAlive: false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      title: '爱此迎-登录/注册',
      keywords: '',
      description: '',
      keepAlive: false
    }
  },
  {
    path: '/roomDetail/:id',
    name: 'roomDetail',
    component: roomDetail,
    meta: {
      title: '爱此迎-',
      keepAlive: false
    }
  },
  {
    path: '/record',
    name: 'record',
    component: record,
    meta: {
      title: '爱此迎-历史足迹',
      keywords: '',
      description: '',
      keepAlive: false
    }
  }
]

// 创建路由
const router = createRouter({
  history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
  routes
})

/**
 * @description: 创建一个新的路由实例
 * @return {*}
 */
export const createSSRRouter = () => {
  return createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes,
    scrollBehavior(): void {
      // 路由进行切换时，自动滚动到顶部
      window.scrollTo(0, 0)
    }
  })
}

export default router
