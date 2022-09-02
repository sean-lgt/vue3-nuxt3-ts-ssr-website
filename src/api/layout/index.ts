/**
 * code '000000'表示操作成功
 * code '000001'表示数据已存在
 * code '000002'表示密码不正确
 * code '000003'表示手机号不正确
 * code '000004'表示其他异常
 * code '000005'表示登录过期
 *
 */
// 引入loading组件
import { ElLoading } from 'element-plus'
// 引入interface规范返回结果的类型
import { IResultOr } from '../interface'
// 引入数据库对对象仓库
import airbnb from '../../db'

const storeName = Object.keys(airbnb.languageObjectStore)[0]
console.log('🚀【storeName】', storeName)
// Mock接口，保存当前语言包
export async function saveLanguageApi(lang: any) {
  const loading = ElLoading.service({
    lock: true,
    background: 'rgba(0,0,0,0.7)'
  })
  // await airbnb.airbnbDB.openStore(storeName, 'id') // TODO:需要先打开仓库
  // 先查询是否存在
  const resultOr: IResultOr = await airbnb.airbnbDB
    .getItem(storeName, 1)
    .then((res) => {
      return {
        code: '000000',
        message: '操作成功',
        result: res || null,
        success: true
      }
    })
  const { success } = resultOr
  let obj = {}
  if (success) {
    // 说明数据已存在，则更新数据
    obj = { name: lang, id: 1 }
  } else {
    // 说明数据不存在，则新增数据
    obj = { name: lang }
  }
  // 进行新增或者修改操作
  const result: IResultOr = await airbnb.airbnbDB
    .updateItem(storeName, obj)
    .then(() => {
      setTimeout(() => {
        loading.close()
      }, 500)
      return {
        code: '000000',
        message: '操作成功',
        result: null,
        success: true
      }
    })
  return result
}

// Mock接口 获取当前语言包
export async function getCurrentLanguageApi() {
  const loading = ElLoading.service({
    lock: true,
    background: 'rgba(0,0,0,0.1)'
  })
  // await airbnb.airbnbDB.openStore(storeName, 'id') // TODO:需要先打开仓库
  await airbnb.airbnbDB.openStore({ ...airbnb.languageObjectStore })
  const result: IResultOr = await airbnb.airbnbDB
    .getItem(storeName, 1)
    .then((res) => {
      setTimeout(() => {
        loading.close()
      }, 200)
      return {
        code: '000000',
        message: '操作成功',
        result: res || null,
        success: true
      }
    })
  return result
}
