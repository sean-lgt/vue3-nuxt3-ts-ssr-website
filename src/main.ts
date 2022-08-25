import { createApp } from 'vue'
import router from './router'
// import './style.css'
import { ElMessage } from 'element-plus'
import 'element-plus/dist/index.css' // 全局引入element-plus 样式
import App from './App.vue'
import i18n from './language/i18n'
import airbnb from './db'

const app = createApp(App)

router.beforeEach((to, from, next) => {
  console.log('🚀【sdfafa】')
  airbnb.airbnbDB
    .openStore({
      ...airbnb.languageObjectStore,
      ...airbnb.userObjectStore
    })
    .then((res: any) => {
      console.log('初始化所有对象仓库', res)
      next()
    })
})

app.config.globalProperties.$message = ElMessage

app.use(router).use(i18n).mount('#app')
