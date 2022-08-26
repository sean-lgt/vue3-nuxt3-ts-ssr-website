<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import HelloWorld from './components/HelloWorld.vue'
import HeaderCommon from './components/Layout/HeaderCommon.vue'
import FooterCommon from './components/Layout/FooterCommon.vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
// import { getRoomList } from './api/index'

const route = useRoute()
const store = useStore()
// console.log('🚀【import.meta.env】', import.meta.env)
// const fetchList = async () => {
//   const result = await getRoomList()
//   console.log('🚀【请求获取到的数据】', result)
// }
// fetchList()

// const valueDate = ''
const { locale } = useI18n()
// console.log('🚀【lang】', locale.value)
const localeLanguage = ref(zhCn)
const changeLang = (lang: any) => {
  console.log('🚀【sdfasad】', lang)
  localeLanguage.value = lang
  locale.value = lang.name

  console.log('🚀【lang】', locale.value)
}
console.log('🚀【12121-12312】', store.state.locale)
</script>

<template>
  <el-config-provider :locale="store.state.locale">
    <!-- 头部 -->
    <header-common
      @changeLang="changeLang"
      v-show="route.fullPath.indexOf('login') === -1"
    ></header-common>
    <!-- 主体 -->
    <div class="main-container">
      <router-view></router-view>
    </div>
    <!-- 底部 -->
    <footer-common
      v-show="route.fullPath.indexOf('login') === -1"
    ></footer-common>
  </el-config-provider>
</template>

<style lang="scss" scoped>
.wrapper {
  button {
    font-size: 40px;
  }
}
</style>

<style>
body {
  padding: 0;
  margin: 0;
}
</style>
