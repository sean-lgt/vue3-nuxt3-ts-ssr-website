<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import IndexedDB from '../../utils/indexedDB'
import { getElephant } from '../../api/index'
const router = useRouter()
const route = useRoute()
console.log('🚀【route】', route.params)
console.log('🚀【i18n】', useI18n)
const { t } = useI18n()
// 数据库indexedDB
const airbnbDB = new IndexedDB('airbnb')
// 打开数据库
// airbnbDB.openStore('room', 'id')
airbnbDB.openStore('elephant', 'id', ['nose', 'ear'])
// 增加/修改
const addDB = () => {
  airbnbDB.updateItem('elephant', {
    nose: '3333m',
    ear: '比较大'
  })
}
const updateDB = () => {
  airbnbDB.updateItem('elephant', {
    nose: '3333m',
    ear: '比较大',
    id: 3
  })
}
const deleteDB = () => {
  airbnbDB.deleteItem('elephant', 4)
}
const getAllList = () => {
  airbnbDB.getList('elephant')
}
const getItem = () => {
  airbnbDB.getItem('elephant', 3)
}

// 自建mock接口
const fetchAllList = async () => {
  const result = await getElephant()
  console.log('🚀【mock请求获取到的数据】', result)
}
fetchAllList()
</script>

<template>
  <div>
    {{ t('message.home') }}
    <el-button @click="addDB">增加数据</el-button>
    <el-button @click="updateDB">修改数据</el-button>
    <el-button @click="deleteDB">删除数据</el-button>
    <el-button @click="getAllList">查询所有数据</el-button>
    <el-button @click="getItem">查询某一条数据</el-button>
    <div class="text">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt placeat
      iure iusto, itaque dolor perferendis veniam, eaque cumque quae
      exercitationem in quis natus aliquam eos, consequatur sunt quos neque
      dolore?
    </div>
    <button @click="() => router.push({ path: '/mine', query: { id: 1 } })">
      跳转到个人中心
    </button>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/home/index.scss';
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
