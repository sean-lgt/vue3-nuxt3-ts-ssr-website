<script setup lang="ts">
import { reactive, computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import { saveOrderApi } from '@/api/order'

const store = useStore()
const route = useRoute()

const roomDetail: any = computed(() => store.state.roomDetail)

const orderForm = reactive({
  personNumber: 1
})
const orderFormRef = ref()
// 提交表单
const submitForm = () => {
  console.log('🚀【点击提交表单】')
  handleSaveOrder()
}
const handleSaveOrder = () => {
  const { id: orderId } = route.params
  const { title, price, imgs } = roomDetail.value
  const { personNumber } = orderForm
  const params = {
    orderId,
    title,
    price,
    personNumber,
    pictureUrl: imgs[0]
  }
  saveOrderApi(params).then((res) => {
    // console.log('🚀【保存订单】', res)
    const { success } = res
    if (success) {
      console.log('🚀【预定成功】', res)
    } else {
      console.log('🚀【预定失败】')
    }
  })
}
</script>
<template>
  <div v-if="roomDetail && roomDetail.info && roomDetail.owner">
    <!-- 照片墙 -->
    <el-carousel
      v-if="roomDetail.imgs && roomDetail.imgs.length > 0"
      trigger="click"
      height="380px"
      :interval="3000"
      indicator-position="none"
      type="card"
      class="imgs-wall"
    >
      <el-carousel-item v-for="(item, index) in roomDetail.imgs" :key="index">
        <img :src="item" />
      </el-carousel-item>
    </el-carousel>
    <!-- 房屋详细信息 -->
    <div class="main-wapper">
      <div class="room-detail">
        <div class="detail-part">
          <h2>{{ roomDetail.title }}</h2>
          <!-- 房屋信息 -->
          <div class="info">
            <span class="room">{{ roomDetail.info.room }}间卧室</span>
            <span class="bed">{{ roomDetail.info.bed }}张床</span>
            <span class="toilet">{{ roomDetail.info.toilet }}间卫生间 </span>
            <span class="live-number">
              可住{{ roomDetail.info.liveNumber }}人
            </span>
          </div>
          <div class="tags">
            <el-tag>{{ roomDetail.info.remarks }} 评论</el-tag>
            <el-tag type="danger" v-if="roomDetail.info.metro">靠近地铁</el-tag>
            <el-tag type="warning" v-if="roomDetail.info.parking">
              免费停车
            </el-tag>
            <el-tag type="success" v-if="roomDetail.info.luggage">
              可存放行李
            </el-tag>
          </div>
          <hr />
          <!-- 房东信息 -->
          <div class="owner-detail">
            <img :src="roomDetail.owner.avatar" alt="" />
            <div class="info">
              <p>房东：{{ roomDetail.owner.name }}</p>
              <p>
                <span v-if="roomDetail.owner.certify">已验证身份</span>
                <span v-if="roomDetail.info.goodOwner">优质房东</span>
              </p>
            </div>
          </div>
          <!-- 房屋基本介绍 -->
          <div class="introduce">{{ roomDetail.owner.introduce }}</div>
        </div>
        <div class="form-part">
          <p class="price">
            <span>￥{{ roomDetail.price }}</span>
            / 晚
          </p>
          <el-form
            ref="orderFormRef"
            :model="orderForm"
            label-position="top"
            class="order-ruleForm"
          >
            <el-form-item prop="personNumber" label="人数">
              <!-- <el-select v-model="orderForm.personNumber">
                <el-option
                  v-for="item in 3"
                  :value="item"
                  :key="item"
                  :label="item"
                />
              </el-select> -->
              <select v-model="orderForm.personNumber">
                <option v-for="item in 3" :value="item" :key="item">
                  {{ item }}
                </option>
              </select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm">预定</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
