<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
import { key as storeKey } from '@/store'
// import IndexedDB from '../../utils/indexedDB'
// import { getElephant } from '../../api/index'
const router = useRouter()
const route = useRoute()
console.log('🚀【route】', route.params)
console.log('🚀【i18n】', useI18n)
const { t } = useI18n()
// 数据库indexedDB
// const airbnbDB = new IndexedDB('airbnb')
// 打开数据库
// airbnbDB.openStore('room', 'id')
// airbnbDB.openStore('elephant', 'id', ['nose', 'ear'])
// // 增加/修改
// const addDB = () => {
//   airbnbDB.updateItem('elephant', {
//     nose: '3333m',
//     ear: '比较大'
//   })
// }
// const updateDB = () => {
//   airbnbDB.updateItem('elephant', {
//     nose: '3333m',
//     ear: '比较大',
//     id: 3
//   })
// }
// const deleteDB = () => {
//   airbnbDB.deleteItem('elephant', 4)
// }
// const getAllList = () => {
//   airbnbDB.getList('elephant')
// }
// const getItem = () => {
//   airbnbDB.getItem('elephant', 3)
// }

// 自建mock接口
// const fetchAllList = async () => {
//   const result = await getElephant()
//   console.log('🚀【mock请求获取到的数据】', result)
// }
// fetchAllList()
const store = useStore(storeKey)
const handleSetMutation = () => {
  store.commit('setCount', 2)
  console.log('此时count值', store.state.count)
}
const handleSetAction = () => {
  store.dispatch('fetchCount', 10)
}
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
