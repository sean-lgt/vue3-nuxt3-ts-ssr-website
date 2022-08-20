<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import { useRouter } from 'vue-router'
import { getRoomList } from './api/index'

const router = useRouter()
console.log('🚀【import.meta.env】', import.meta.env)
const fetchList = async () => {
  const result = await getRoomList()
  console.log('🚀【请求获取到的数据】', result)
}
fetchList()

const valueDate = ''
const { locale } = useI18n()
console.log('🚀【lang】', locale.value)
const localeLanguage = ref(zhCn)
const changeLang = (lang) => {
  console.log('🚀【sdfasad】', lang)
  localeLanguage.value = lang
  locale.value = lang.name

  console.log('🚀【lang】', locale.value)
}
</script>

<template>
  <el-config-provider :locale="localeLanguage">
    <el-date-picker v-model="valueDate" type="date" placeholder="Pick a day" />
    <div class="wrapper">
      APP
      <el-button @click="changeLang(zhCn)">中文</el-button>
      <el-button @click="changeLang(en)">英文</el-button>
      <button @click="() => router.push({ path: '/home' })">首页</button>
      <button @click="() => router.push({ path: '/mine' })">个人中心页</button>
      <router-link to="/home">link-首页</router-link>
      <router-link to="/mine">link-个人中心</router-link>
      <router-view></router-view>
    </div>
  </el-config-provider>
</template>

<style lang="scss" scoped>
.wrapper {
  button {
    font-size: 40px;
  }
}
</style>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
