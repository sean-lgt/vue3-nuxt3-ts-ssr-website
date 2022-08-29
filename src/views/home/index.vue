<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'

export default defineComponent({
  setup() {
    const store = useStore()

    return {
      store
    }
  },
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
        <div
          class="item"
          v-for="(item, index) in store.state.roomList"
          :key="index"
        >
          <img :src="item.pictureUrl" :alt="item.title" />
          <p class="titke">{{ item.title }}</p>
          <p class="price">￥{{ item.price }}元</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/home/index.scss';
</style>
