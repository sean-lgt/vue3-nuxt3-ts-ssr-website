// 引入vue
import { ref, reactive, Ref } from 'vue'
// 定义 interface
interface IRuleForm {
  mobile: string
  password: string
}
interface IRuleItem {
  required: boolean
  min?: number
  max?: number
  message: string
  trigger: string
}
interface IRules {
  mobile: IRuleItem[]
  password: IRuleItem[]
}
interface IResult {
  activeName: Ref<string>
  loginText: Ref<any>
  ruleFormRef: any
  ruleForm: IRuleForm
  rules: IRules
}

/**
 * @description: 登录表单相关属性及配置
 * @return {*}
 * @param {any} t 国际化语言 t 函数
 */
export default function useFormProperties(t: any): IResult {
  const activeName = ref('login')
  const loginText = ref(t('login.loginBtn'))
  const ruleFormRef = ref()
  const ruleForm = reactive({
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
  return {
    activeName,
    loginText,
    ruleFormRef,
    ruleForm,
    rules
  }
}
