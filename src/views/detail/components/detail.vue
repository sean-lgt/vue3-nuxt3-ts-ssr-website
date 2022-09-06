<script setup lang="ts">
import {
  reactive,
  computed,
  watch,
  ref,
  onMounted,
  getCurrentInstance
} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useStore } from '@/store'
import { saveOrderApi } from '@/api/order'
import { saveRecordApi } from '@/api/record'
import useToast from '@/composables/common/useToast'

const store = useStore()
const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const { proxy }: any = getCurrentInstance()

const roomDetail: any = computed(() => store.state.roomDetail)
// 监听store中数据逇变化，动态设置页面标题 title keywords description
watch(
  () => store.state.roomDetail,
  (val: any) => {
    if (val) {
      document.title = `爱此迎-${val.title}`
      // 设置页面 keywords 描述
      const keywordsMeta = document.querySelector('meta[name="keywords"]')
      keywordsMeta &&
        keywordsMeta.setAttribute('content', `${val.owner.introduce}`)
      // 设置页面 description
      const descriptionMeta = document.querySelector('meta[name="description"]')
      descriptionMeta?.setAttribute('content', `${val.owner.introduce}`)
    }
  }
)

const orderForm = reactive({
  personNumber: 1
})
const orderFormRef = ref()
const { visibleToast, showToast } = useToast()
// 提交表单
const submitForm = () => {
  console.log('🚀【pathname】', route)
  console.log('🚀【点击提交表单】')
  if (store.state.userStatus === 1) {
    handleSaveOrder()
  } else {
    // 未登录状态 需要跳转到登录页
    // const pathname = route.fullPath
    const { pathname } = window.location
    router.replace({
      path: '/login',
      query: {
        redirect: pathname
      }
    })
  }
}
// 立即预定
const handleSaveOrder = () => {
  const { id: orderId } = route.params
  const { title, price, imgs } = roomDetail.value
  // const { title, price, imgs }: any = roomDetail
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
    const { success, message } = res
    if (success) {
      console.log('🚀【预定成功】', res)
      showToast(2000)
    } else {
      console.log('🚀【预定失败】')
      proxy.$message.error(message)
    }
  })
}

// 保存历史记录
const handleSaveRecord = () => {
  const { id: recordId } = route.params
  const { title, price, imgs } = roomDetail.value
  // const { title, price, imgs }: any = roomDetail
  const { personNumber } = orderForm
  const params = {
    recordId,
    title,
    price,
    personNumber,
    pictureUrl: imgs[0]
  }
  saveRecordApi(params).then((res) => {
    // console.log('🚀【保存订单】', res)
    const { success } = res
    if (success) {
      console.log('🚀【加入足迹成功】', res)
    } else {
      console.log('🚀【加入足迹失败】')
    }
  })
}

onMounted(() => {
  setTimeout(() => {
    handleSaveRecord() // 停留超过2s
  }, 2000)
})
// })
</script>
<template>
  <!-- Toast 组件 -->
  <Teleport to="#app" v-if="visibleToast">
    <div class="order-success-wrapper">
      <el-alert
        :title="t('detail.reservated')"
        type="success"
        :closable="false"
        center
        show-icon
      ></el-alert>
    </div>
  </Teleport>
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
            <span class="room"
              >{{ roomDetail.info.room }} {{ t('detail.rooms') }}</span
            >
            <span class="bed"
              >{{ roomDetail.info.bed }} {{ t('detail.beds') }}</span
            >
            <span class="toilet"
              >{{ roomDetail.info.toilet }} {{ t('detail.bathrooms') }}
            </span>
            <span class="live-number">
              可住{{ roomDetail.info.liveNumber }}
              {{ t('detail.personNumber') }}
            </span>
          </div>
          <div class="tags">
            <el-tag
              >{{ roomDetail.info.remarks }} {{ t('detail.remarks') }}</el-tag
            >
            <el-tag type="danger" v-if="roomDetail.info.metro">{{
              t('detail.nearSubway')
            }}</el-tag>
            <el-tag type="warning" v-if="roomDetail.info.parking">
              {{ t('detail.freeParking') }}
            </el-tag>
            <el-tag type="success" v-if="roomDetail.info.luggage">
              {{ t('detail.luggage') }}
            </el-tag>
          </div>
          <hr />
          <!-- 房东信息 -->
          <div class="owner-detail">
            <img :src="roomDetail.owner.avatar" alt="" />
            <div class="info">
              <p>{{ t('detail.landlord') }}：{{ roomDetail.owner.name }}</p>
              <p>
                <span v-if="roomDetail.owner.certify">{{
                  t('detail.authenticated')
                }}</span>
                <span v-if="roomDetail.info.goodOwner">{{
                  t('detail.greatlandlord')
                }}</span>
              </p>
            </div>
          </div>
          <!-- 房屋基本介绍 -->
          <div class="introduce">{{ roomDetail.owner.introduce }}</div>
        </div>
        <div class="form-part">
          <p class="price">
            <span>￥{{ roomDetail.price }}</span>
            / {{ t('detail.night') }}
          </p>
          <el-form
            ref="orderFormRef"
            :model="orderForm"
            label-position="top"
            class="order-ruleForm"
          >
            <el-form-item prop="personNumber" :label="t('detail.personNumber')">
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
              <el-button type="primary" @click="submitForm">{{
                t('detail.order')
              }}</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
