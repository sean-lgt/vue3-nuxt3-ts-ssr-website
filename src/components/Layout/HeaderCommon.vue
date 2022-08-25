<script setup lang="ts">
import { ref, defineEmits, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import { saveLanguageApi, fetchLanguageApi } from '../../api/layout/index'
import { userLogoutApi } from '../../api/login/index'

import { IResultOr } from '@/api/interface'

// fix: Property 'proxy' does not exist on type 'ComponentInternalInstance | null'
const { proxy } = getCurrentInstance()!
const router = useRouter()
const { t } = useI18n()
const activeIndex = ref('records')
// changeLang
const emit = defineEmits<{ (e: 'changeLang', language: any): void }>()
const handleSelect = (e: any) => {
  if (e === 'zh') {
    emit('changeLang', zhCn)
    saveLanguage(zhCn)
  } else if (e === 'en') {
    emit('changeLang', en)
    saveLanguage(en) // 调用接口保存
  } else if (e === 'login') {
    router.push({ name: 'login' })
  } else if (e === 'logout') {
    handleLogout()
  }
  console.log('🚀【点击el-menu】', e)
}

// mock接口，退出登录
const handleLogout = () => {
  userLogoutApi().then((res: IResultOr) => {
    const { success, message } = res
    if (success) {
      // 成功
      console.log('🚀【退出成功】')
      // proxy?.$message.success(message)
      // 存储登录态
      window.localStorage.setItem('userStatus', '0')
      router.push({ path: '/login' })
    } else {
      proxy?.$message.error(message)
    }
  })
}

// mock接口，保存当前语言包
const saveLanguage = (language: any) => {
  saveLanguageApi(language).then((res) => {
    const { success } = res
    if (success) {
      console.log('🚀【保存当前语言包成功】', success)
    }
  })
}
// mock接口 获取当前语言包
const getCurrentLanguage = () => {
  fetchLanguageApi().then((res) => {
    const { success, result } = res
    const { name } = result || {}
    if (success) {
      console.log('🚀【查询当前语言包成功】', result)
      if (!result) {
        emit('changeLang', zhCn)
      } else {
        if (name.name === 'zh') {
          emit('changeLang', zhCn)
        } else if (name.name === 'en') {
          emit('changeLang', en)
        }
      }
    }
  })
}
getCurrentLanguage()
const userStatus = window.localStorage.getItem('userStatus') || 0
</script>
<template>
  <div class="header-common">
    <img src="../../assets/images/layout/logo.png" alt="airbnb" class="logo" />
    <el-menu
      :default-active="activeIndex"
      :ellipsis="false"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="orders"> {{ t('header.orders') }}</el-menu-item>
      <el-menu-item index="records">{{ t('header.records') }}</el-menu-item>
      <el-sub-menu index="language">
        <template #title>{{ t('header.language') }}</template>
        <el-menu-item index="zh">中文</el-menu-item>
        <el-menu-item index="en">English</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="avatar" v-if="userStatus == 1">
        <template #title>
          <img
            src="../../assets/images/layout/avatar.jpg"
            alt="user-center"
            class="avatar"
        /></template>
        <el-menu-item index="logout">{{ t('login.logout') }}</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="login" v-if="userStatus != 1">
        {{ t('login.loginTab') }}/{{ t('login.signTab') }}
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/layout/commonHeader.scss';
</style>
<style>
.header-common .el-menu .el-sub-menu__title {
  font-size: 16px;
}
</style>
