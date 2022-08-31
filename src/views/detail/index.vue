<script setup lang="ts">
import { reactive } from 'vue'

const orderForm = reactive({
  personNumber: 1
})
// 提交表单
const submitForm = () => {
  console.log('🚀【点击提交表单】')
}
</script>
<template>
  <div>
    <!-- 照片墙 -->
    <el-carousel
      trigger="click"
      height="380px"
      :interval="3000"
      indicator-position="none"
      type="card"
      class="imgs-wall"
    >
      <el-carousel-item v-for="i in 3" :key="i">
        <img src="../../assets/images/home/banner.jpg" alt="" />
      </el-carousel-item>
    </el-carousel>
    <!-- 房屋详细信息 -->
    <div class="main-wapper">
      <div class="room-detail">
        <div class="detail-part">
          <h2>标题</h2>
          <!-- 房屋信息 -->
          <div class="info">
            <span class="room">几个房间</span>
            <span class="bed">多少张床</span>
            <span class="toilet">多少个卫生间</span>
            <span class="live-number">可住几人</span>
          </div>
          <div class="tags">
            <el-tag type="danger">是否近地铁</el-tag>
            <el-tag type="warning">是否免费停车</el-tag>
            <el-tag type="success">是否放置行李</el-tag>
          </div>
          <hr />
          <!-- 房东信息 -->
          <div class="owner-detail">
            <img src="../../assets/images/layout/avatar.jpg" alt="" />
            <div class="info">
              <p>房东：名字</p>
              <p>
                <span>是否认证</span>
                <span>是否优质房东</span>
              </p>
            </div>
          </div>
          <!-- 房屋基本介绍 -->
          <div class="introduce">房屋基本介绍</div>
        </div>
        <div class="form-part">
          <p class="price">
            <span>￥999</span>
            / 晚
          </p>
          <el-form
            ref="orderForm"
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

<style lang="scss">
@import '@/assets/scss/detail/index.scss';
</style>
