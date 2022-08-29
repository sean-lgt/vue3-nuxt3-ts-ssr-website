import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router'
import home from '@/views/home/index.vue'
import mine from '@/views/mine/index.vue'
import login from '@/views/login/index.vue'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: home,
    meta: {
      title: '首页',
      keepAlive: false
    }
  },
  {
    path: '/mine',
    name: 'mine',
    component: mine,
    meta: {
      title: '我的',
      keepAlive: false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      title: '登录',
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
    routes
  })
}

export default router
