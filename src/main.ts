import { createApp } from 'vue'
import router from './router'
// import './style.css'
import 'element-plus/dist/index.css' // 全局引入element-plus 样式
import App from './App.vue'
import i18n from './language/i18n'

const app = createApp(App)

app.use(router).use(i18n).mount('#app')
