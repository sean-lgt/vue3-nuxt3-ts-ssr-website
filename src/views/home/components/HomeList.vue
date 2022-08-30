<script setup lang="ts">
import { useStore } from '@/store'
// 引入组件
import Pagination from '@/components/common/Pagination.vue'
import HomeTabs from './HomeTabs.vue'
import { IRoomlistParams } from '@/api/interface'

const store = useStore()

// 监听子组件页码改变
const changePage = (pageNo: number) => {
  console.log('🚀【父组件-pageNo】', pageNo)
  store.dispatch('fetchRoomList', { pageNo } as IRoomlistParams)
}
</script>

<template>
  <!-- tab栏 -->
  <HomeTabs></HomeTabs>
  <!-- 列表数据 -->
  <div>
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
  <!-- 分页 -->
  <div class="page-wrapper">
    <Pagination @change-page="changePage"></Pagination>
  </div>
</template>

<style scoped>
.page-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>
