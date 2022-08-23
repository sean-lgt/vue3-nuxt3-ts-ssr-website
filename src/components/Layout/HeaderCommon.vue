<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
const activeIndex = ref('1')
// changeLang
const emit = defineEmits<{ (e: 'changeLang', language: any): void }>()
const handleSelect = (e: any) => {
  if (e === 'zh') {
    emit('changeLang', zhCn)
  } else if (e === 'en') {
    emit('changeLang', en)
  }
  console.log('🚀【点击el-menu】', e)
}
</script>
<template>
  <div class="header-common">
    <img src="../../assets/images/layout/logo.png" alt="airbnb" class="logo" />
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="orders">房屋订单中心</el-menu-item>
      <el-menu-item index="records">历史足迹</el-menu-item>
      <el-sub-menu index="language">
        <template #title>国际化切换</template>
        <el-menu-item index="zh">中文</el-menu-item>
        <el-menu-item index="en">英文</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="avatar">
        <img
          src="../../assets/images/layout/avatar.jpg"
          alt="user-center"
          class="avatar"
        />
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/layout/commonHeader.scss';
</style>
