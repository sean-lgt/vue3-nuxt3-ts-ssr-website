<script setup lang="ts">
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
// 引入组件
import Pagination from '@/components/common/Pagination.vue'
import HomeTabs from './HomeTabs.vue'
import { IRoomlistParams } from '@/api/interface'

const store = useStore()
const router = useRouter()
// 监听子组件页码改变
const changePage = (pageNo: number) => {
  console.log('🚀【父组件-pageNo】', pageNo)
  store.dispatch('fetchRoomList', { pageNo } as IRoomlistParams)
}
// 点击查看详情
const clickDetail = (detailItem: any) => {
  console.log('🚀【点击跳转详情】', detailItem)
  store.commit('setRoomId', detailItem.id)
  router.push({ path: `/roomDetail/${detailItem.id}` })
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
        v-for="item in store.state.roomList"
        :key="item.id"
        @click="clickDetail(item)"
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
