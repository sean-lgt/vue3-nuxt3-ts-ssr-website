import { createRouter, createWebHashHistory } from 'vue-router'
import home from '@/views/home/index.vue'
import mine from '@/views/mine/index.vue'

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
  }
]

// 创建路由
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
