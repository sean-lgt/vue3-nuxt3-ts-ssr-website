<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
import { getOrderApi } from '@/api/order'

const store = useStore()
const router = useRouter()
let orderData = reactive<Array<any>>([]) // 订单列表数据

// 关闭遮罩和popover
const closeMask = () => {
  store.commit('setOrderVisible', false)
}

// 在异步组件中需要返回一个 promise 实例
const fetchOrderList = () => {
  return getOrderApi().then((res) => {
    const { result, success, message } = res
    console.log(result)
    if (success) {
      orderData = result
    } else {
      console.log('🚀【列表数据失败】', message)
    }
  })
}
// 判断是否已经登录
if (store.state.userStatus) {
  await fetchOrderList()
} else {
  closeMask() // 关闭遮罩
  const { pathname } = window.location
  router.replace({
    path: '/login',
    query: {
      redirect: pathname
    }
  })
}

// 点击跳转详情页
const toDetail = (item: any) => {
  console.log('🚀【sfdafsafdaga6164616418641646156】')
  const { orderId: id } = item
  router.push({ path: `/roomDetail/${id}` })
  store.commit('setRoomId', id)
  // closeMask() // 关闭遮罩
}
</script>

<template>
  <!-- vue3新特性 将 DOM 移出组件 -->
  <Teleport to="#app">
    <div class="full-screen-mask" @click="closeMask"></div>
  </Teleport>
  <div class="order-popover-wrapper">
    <ul v-if="orderData.length > 0">
      <li
        v-for="(item, index) in orderData"
        :key="index"
        @click="toDetail(item)"
      >
        <img :src="item.pictureUrl" />
        <div class="mess">
          <p class="title">{{ item.title }}</p>
          <p class="info">{{ item.price }}/晚 * {{ item.personNumber }}个人</p>
        </div>
      </li>
    </ul>
    <div v-else class="loading-block">暂无数据</div>
  </div>
</template>

<style scoped lang="scss">
.order-popover-wrapper ul::-webkit-scrollbar {
  width: 8px; /* 纵向滚动条*/
  height: 8px; /* 横向滚动条 */
  background-color: #fff;
}

/*定义滚动条轨道 内阴影*/
.order-popover-wrapper ul::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
  background-color: #f2f2f2;
  /* background-color: #ffffff; */
  cursor: pointer;
}

/*定义滑块 内阴影*/
.order-popover-wrapper ul::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
  background-color: #ccc;
  border-radius: 8px;
  cursor: pointer;
  background-color: rgba(144, 147, 153, 0.3);
  transition: background-color 0.3s;
}
.order-popover-wrapper ul::-webkit-scrollbar-thumb:hover {
  background-color: rgba(144, 147, 153, 0.5);
}

ul {
  @include placeholder-order;
}
li {
  @include flex-layout(row, space-between, center);
  border-bottom: 1px solid #eee;
  padding: 10px 0;
  &:last-child {
    border-bottom: none;
  }
  img {
    width: 65px;
    height: 45px;
    border-radius: 4px;
    margin-right: 5px;
    object-fit: cover;
  }
  .mess {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-left: 5px;
    width: 100px;
    overflow: hidden;
    p {
      line-height: 16px;
      font-weight: normal;
      margin: 5px 0;
      max-width: 100px;
    }
    .title {
      font-weight: bold;
      color: #333;
      font-size: 14px;
      display: inline-block;
      @include line-text-overflow;
    }
    .info {
      color: #666;
      font-size: 12px;
    }
  }
}
</style>
