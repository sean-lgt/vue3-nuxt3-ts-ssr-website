/**
 * code '000000'表示操作成功
 * code '000001'表示数据已存在
 * code '000002'表示密码不正确
 * code '000003'表示手机号不正确
 * code '000004'表示其他异常
 * code '000005'表示登录过期
 *
 */

import { ElLoading } from 'element-plus'
import { IResultOr } from '../interface'
import airbnb from '@/db'

const storeName = Object.keys(airbnb.orderObjectStore)[0]

// Mock接口 立即预定
export async function saveOrderApi(params: any) {
  const userId = localStorage.getItem('userId')
  const loading = ElLoading.service({
    lock: true,
    background: 'rgba(0, 0, 0, 0.1)'
  })

  // 是否存在相同订单Id
  const hasOrderId = await new Promise((resolve) => {
    airbnb.airbnbDB.getList(storeName).then((res: any) => {
      setTimeout(() => {
        loading.close()
      }, 200)
      res &&
        res.filter((item: any) => {
          if (item.orderId === params.orderId && item.userId === userId) {
            // 存在相同订单Id
            resolve(true)
          }
          return item
        })
      resolve(false)
    })
  })
  let result: IResultOr
  // 存在相同的订单
  if (hasOrderId) {
    result = await new Promise((resolve) => {
      resolve({
        code: '000001',
        success: false,
        message: '数据已存在',
        result: null
      })
    })
  } else {
    Object.assign(params, { userId })
    result = await new Promise((resolve) => {
      airbnb.airbnbDB.updateItem(storeName, params).then(() => {
        setTimeout(() => {
          loading.close()
        }, 200)
        resolve({
          code: '000000',
          success: true,
          message: '操作成功',
          result: null
        })
      })
    })
  }
  return result
}

// Mock接口：订单列表
export async function getOrderApi() {
  const userId = localStorage.getItem('userId')

  const loading = ElLoading.service({
    lock: true,
    background: 'rgba(0, 0, 0, 0.1)'
  })
  const result: IResultOr = await new Promise((resolve) => {
    airbnb.airbnbDB.getList(storeName).then((res: any) => {
      setTimeout(() => {
        loading.close()
      }, 200)
      res = res.filter((item: any) => {
        return item.userId === userId
      })
      setTimeout(() => {
        // 有意延迟200毫秒，感受异步组件的效果
        resolve({
          code: '000000',
          success: true,
          message: '操作成功',
          result: res || null
        })
      }, 200)
    })
  })
  return result
}
