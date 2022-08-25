<script setup lang="ts">
import { reactive, ref, getCurrentInstance } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { userSignApi, userLoginApi } from '../../api/login'
import { IResultOr } from '../../api/interface'
interface IRuleFrom {
  mobile: string
  password: string
}
// fix: Property 'proxy' does not exist on type 'ComponentInternalInstance | null'
// 1、在页面或组件中，CurrentInstance一定存在，因此可以使用!强制标记存在
// 2、使用as强转 getCurrentInstance() as ComponentInternalInstance
const { proxy } = getCurrentInstance()!
const router = useRouter()
const { t } = useI18n()
const activeName = ref('login')
const loginText = ref(t('login.loginBtn'))
const ruleFormRef = ref()

const ruleForm: IRuleFrom = reactive({
  mobile: '',
  password: ''
})

const rules = reactive({
  mobile: [
    {
      required: true,
      min: 11,
      max: 11,
      message: t('login.placeMobile'),
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: t('login.placePass'),
      trigger: 'blur'
    }
  ]
})

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
        handleUserSign(ruleForm)
      } else if (activeName.value === 'login') {
        handleUserLogin(ruleForm)
      }
    }
  })
}

// 注册接口
const handleUserSign = (params: any) => {
  userSignApi(params).then((res: IResultOr) => {
    const { success, message } = res
    if (success) {
      // 成功
      console.log('🚀【注册成功】')
      proxy?.$message.success(message)
    } else {
      proxy?.$message.error(message)
    }
  })
}

// 登录接口
const handleUserLogin = (params: IRuleFrom) => {
  userLoginApi(params).then((res: IResultOr) => {
    const { success, message, result } = res
    const { status } = result
    if (success) {
      // 成功
      console.log('🚀【登录成功】')
      // proxy?.$message.success(message)
      // 存储登录态
      window.localStorage.setItem('userStatus', status)
      router.push({ path: '/home' })
    } else {
      proxy?.$message.error(message)
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
