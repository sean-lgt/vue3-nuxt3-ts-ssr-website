<script setup lang="ts">
import { useRouter } from 'vue-router'
import useFormProperties from '@/composables/login/useFormProperties'
import useFormOperates from '@/composables/login/useFormOperates'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()
const { ruleForm, loginText, ruleFormRef, activeName, rules } =
  useFormProperties(t)
const { userSign, userLogin } = useFormOperates(router, ruleForm)

const handleTabClick = (e: any) => {
  console.log('🚀【切换tab】', e)
  const { name } = e.props
  loginText.value = t(`login['${name}Btn']`)
}

// 提交表单
const submitForm = () => {
  ruleFormRef.value.validate((valid: any) => {
    if (valid) {
      console.log('🚀【表单校验成功可以进行提交】')
      if (activeName.value === 'sign') {
        userSign(ruleForm)
      } else if (activeName.value === 'login') {
        userLogin(ruleForm)
      }
    }
  })
}
</script>
<template>
  <div class="login-container">
    <div class="left-part"></div>
    <!-- 表单组件 -->
    <div class="right-part">
      <div class="login-panel">
        <!-- tabs -->
        <el-tabs v-model="activeName" @tab-click="handleTabClick">
          <el-tab-pane :label="t('login.loginTab')" name="login"></el-tab-pane>
          <el-tab-pane :label="t('login.signTab')" name="sign"></el-tab-pane>
        </el-tabs>
        <!-- 表单组件 -->
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
          <el-form-item prop="mobile">
            <el-input
              :placeholder="t('login.placeMobile')"
              v-model="ruleForm.mobile"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :placeholder="t('login.placePass')"
              v-model="ruleForm.password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login-btn" type="primary" @click="submitForm">{{
              loginText
            }}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/login/index.scss';
</style>
