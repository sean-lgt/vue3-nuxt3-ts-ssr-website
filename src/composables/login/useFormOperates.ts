import { getCurrentInstance } from 'vue'
import { Router, useRoute } from 'vue-router'
// import { useStore } from 'vuex'
// import { key as storeKey } from '@/store'
import { useStore } from '@/store'
import { IResultOr } from '@/api/interface'
import { userSignApi, userLoginApi } from '@/api/login'

interface IRuleForm {
  mobile: string
  password: string
}

interface IRsult {
  userSign: (params: IRuleForm) => void
  userLogin: (params: IRuleForm) => void
}

export default function useFormOperates(
  router: Router,
  params: IRuleForm
): IRsult {
  // fix: Property 'proxy' does not exist on type 'ComponentInternalInstance | null'
  // 1、在页面或组件中，CurrentInstance一定存在，因此可以使用!强制标记存在
  // 2、使用as强转 getCurrentInstance() as ComponentInternalInstance
  const { proxy }: any = getCurrentInstance()
  // const route = useRoute()
  const store = useStore()

  function userSign(): void {
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
  function userLogin(): void {
    userLoginApi(params).then((res: IResultOr) => {
      const { success, message, result } = res
      const { status } = result
      if (success) {
        // 成功
        console.log('🚀【登录成功】')
        // proxy?.$message.success(message)
        // 存储登录态
        // window.localStorage.setItem('userStatus', status)
        store.commit('setUserStatus', status)
        router.push({ path: '/home' })
      } else {
        proxy?.$message.error(message)
      }
    })
  }

  return {
    userSign,
    userLogin
  }
}
