<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  // setup() {},
  asyncData({ store, route }: any) {
    console.log('🚀【store数据】', store)
    console.log('🚀【route数据】', route)
    return store.dispatch('fetchRoomList')
  }
})
</script>

<template>
  <div class="home-page">
    <!-- banner -->
    <div class="banner"></div>
    <!-- 房屋列表 -->
    <div class="main-wrapper">
      <h2 class="title">主标题</h2>
      <p class="sub-title">副标题</p>
      <div class="home-list">
        <div class="item" v-for="i in 6" :key="i">
          <img src="../../assets/images/login/bg.png" alt="" />
          <p class="titke">房屋标题</p>
          <p class="price">134</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/home/index.scss';
</style>
