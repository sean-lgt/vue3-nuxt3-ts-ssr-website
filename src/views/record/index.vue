<script setup lang="ts">
import { getCurrentInstance, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getRecordApi } from '@/api/record'
import { useStore } from '@/store'

const { proxy }: any = getCurrentInstance()
const store = useStore()
const router = useRouter()

const recordData = ref([])
const loading = ref(true)

// 查询历史足迹
const fetchRecordList = () => {
  getRecordApi().then((res: any) => {
    const { success, message, result } = res
    loading.value = false
    if (success) {
      console.log('历史足迹数据', res)
      recordData.value = result
    } else {
      proxy.$message.error(message)
    }
  })
}

// 跳转到详情页
const toDetail = (item: any) => {
  const { recordId: id } = item
  router.push({ path: `/roomDetail/${id}` })
  store.commit('setRoomId', id)
}

onMounted(() => {
  if (store.state.userStatus) {
    console.log('🚀【sdfafasdfasfsaf】')
    fetchRecordList()
  } else {
    const { pathname } = window.location
    router.replace({
      path: '/login',
      query: {
        redirect: pathname
      }
    })
  }
})
</script>
<template>
  <div class="record-page">
    <div class="main-wrapper">
      <el-skeleton :loading="loading" animated>
        <template #template>
          <div class="column-style">
            <div class="item" v-for="i in 9" :key="i">
              <el-skeleton-item
                variant="image"
                style="width: 315px; height: 240px; border-radius: 4px"
              ></el-skeleton-item>
              <el-skeleton-item
                variant="p"
                style="width: 100%; margin-top: 15px"
              ></el-skeleton-item>
              <el-skeleton-item
                variant="p"
                style="width: 30%"
              ></el-skeleton-item>
            </div>
          </div>
        </template>
        <template #default>
          <div class="column-style" v-if="recordData.length > 0">
            <div
              class="item"
              v-for="(item, index) in recordData"
              :key="index"
              @click="toDetail(item)"
            >
              <el-image :src="item.pictureUrl" :alt="item.title"></el-image>
              <p class="title">{{ item.title }}</p>
              <p class="price">￥{{ item.price }}</p>
            </div>
          </div>
          <el-empty v-else description="暂无浏览记录"></el-empty>
        </template>
      </el-skeleton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.record-page {
  .main-wrapper {
    @include main-wrapper(30px);
    .column-style {
      // 描述元素的列数,排列方式为垂直  S型走向
      column-count: 3;
      .item {
        width: 315px;
        overflow: hidden;
        margin-bottom: 25px;
        cursor: pointer;
        text-align: left;
        // 重点：实现瀑布流
        display: inline-block;
        img {
          width: 315px;
          height: auto;
          border-radius: 4px;
        }
        .title {
          width: 315px;
          font-size: 18px;
          margin: 15px 0px;
          font-weight: bold;
        }
        .price {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
