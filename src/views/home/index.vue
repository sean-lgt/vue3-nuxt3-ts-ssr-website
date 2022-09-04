<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'
import { useI18n } from 'vue-i18n'
import HomeList from './components/HomeList.vue'
import { IRoomlistParams } from '@/api/interface'

export default defineComponent({
  components: {
    HomeList
  },
  setup() {
    const store = useStore()
    const { t } = useI18n()
    return {
      store,
      t
    }
  },
  asyncData({ store, route }: any) {
    console.log('🚀【asyncData--store数据】', store)
    console.log('🚀【asyncData--route数据】', route)
    const { pageNo } = store.state
    return store.dispatch('fetchRoomList', { pageNo } as IRoomlistParams)
  }
})
</script>

<template>
  <div class="home-page">
    <!-- banner -->
    <div class="banner"></div>
    <!-- 房屋列表 -->
    <div class="main-wrapper">
      <h2 class="title">{{ t('home.h2Title') }}</h2>
      <p class="sub-title">{{ t('home.subTitle') }}</p>
      <!-- 首页列表 -->
      <HomeList></HomeList>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/home/index.scss';
</style>
