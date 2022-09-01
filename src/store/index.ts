import { InjectionKey } from 'vue'
import { createStore, Store, useStore as originUseStore } from 'vuex'
import { saveLanguageApi } from '../api/layout'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { getRoomList } from '@/api/index'
import { getRoomDetail } from '@/api/detail'
import { IRoomlistParams, IRoomDetailParams } from '@/api/interface'

// 为 store state 声明类型
export interface IAllStateTypes {
  count: number
  locale: any
  userStatus: number
  roomList: Array<any>
  pageNo: number
  pageSize: number
  total: number
  cityCode: string
  roomDetail: object
  roomId: number | null
  orderVisible: boolean
}

// 定义 injection key
export const key: InjectionKey<Store<IAllStateTypes>> = Symbol('allStoreKey')

// 暴露一个使用key的useStore,可以直接导入使用，无需再传key
export const useStore = () => {
  return originUseStore(key)
}

// 创建实例
/**
 * @description: 创建store实例
 * @return {*}
 */
export const createSSRStore = () => {
  return createStore<IAllStateTypes>({
    state: {
      count: 1,
      locale: zhCn, // 当前语言
      userStatus: 0, // 登录态
      roomList: [], // 房屋列表
      pageNo: 1, // 页数
      pageSize: 6, // 每页个数
      total: 0, // 总数
      cityCode: 'hz', // 城市编码
      roomDetail: {}, // 房屋详情
      roomId: null,
      orderVisible: false
    },
    mutations: {
      setCount(state, payload) {
        state.count += payload
        return state.count
      },
      // 设置语言包
      setLanguage(state, payload) {
        state.locale = payload
        return state.locale
      },
      // 设置登录态
      setUserStatus(state, payload) {
        state.userStatus = payload
        return state.userStatus
      },
      // 设置房屋列表
      setRoomList(state, payload) {
        state.roomList = payload
        return state.roomList
      },
      setPageNo(state, payload) {
        state.pageNo = payload
        return state.pageNo
      },
      setTotal(state, payload) {
        state.total = payload
        return state.total
      },
      // 设置房屋详情数据
      setRoomDetail(state, payload) {
        state.roomDetail = payload
        return state.roomDetail
      },
      // 设置房屋id
      setRoomId(state, payload) {
        state.roomId = payload
        return state.roomId
      },
      // 设置订单列表是否显示
      setOrderVisible(state, payload) {
        state.orderVisible = payload
        return state.orderVisible
      }
    },
    actions: {
      fetchCount({ commit, state }, payload) {
        setTimeout(() => {
          commit('setCount', payload)
        }, 3000)
      },
      // 保存当前语言包
      saveLanguage({ commit, state }, language: any) {
        saveLanguageApi(language).then((res) => {
          const { success } = res
          if (success) {
            commit('setLanguage', language)
            console.log('🚀【保存当前语言包成功】', state.locale)
          }
        })
      },
      // 获取房屋列表
      fetchRoomList({ commit, state }, payload: IRoomlistParams) {
        const { pageNo, cityCode = state.cityCode } = payload
        commit('setPageNo', pageNo) // 更改页码
        const queryParams = {
          pageNo,
          pageSize: state.pageSize,
          cityCode
        }
        return new Promise((resolve) => {
          getRoomList(queryParams).then((res) => {
            const { success, result } = res
            const orders = result.orders
            const total = result.total
            if (success) {
              console.log('🚀【拿到数据】', orders)
              commit('setRoomList', orders.data)
              commit('setTotal', total)
              resolve(true)
            }
          })
        })
      },
      // 房屋详情接口
      fetchRoomDetail({ commit, state }, payload: IRoomDetailParams) {
        return new Promise((resolve) => {
          getRoomDetail(payload).then((res) => {
            const { success, result } = res
            if (success) {
              console.log('详情页数据保存到Vuex中', result)
              commit('setRoomDetail', result)
              resolve(true)
            }
          })
        })
      }
    }
  })
}

export const store = createStore<IAllStateTypes>({
  state: {
    count: 1,
    locale: zhCn, // 当前语言
    userStatus: 0, // 登录态
    roomList: [] // 房屋列表
  },
  mutations: {
    setCount(state, payload) {
      state.count += payload
      return state.count
    },
    // 设置语言包
    setLanguage(state, payload) {
      state.locale = payload
      return state.locale
    },
    // 设置登录态
    setUserStatus(state, payload) {
      state.userStatus = payload
      return state.userStatus
    },
    // 设置房屋列表
    setRoomList(state, payload) {
      state.roomList = payload
      return state.roomList
    }
  },
  actions: {
    fetchCount({ commit, state }, payload) {
      setTimeout(() => {
        commit('setCount', payload)
      }, 3000)
    },
    // 保存当前语言包
    saveLanguage({ commit, state }, language: any) {
      saveLanguageApi(language).then((res) => {
        const { success } = res
        if (success) {
          commit('setLanguage', language)
          console.log('🚀【保存当前语言包成功】', state.locale)
        }
      })
    },
    // 获取房屋列表
    fetchRoomList({ commit }) {
      getRoomList().then((res: any) => {
        const { success, result } = res
        const orders = result.orders
        if (success) {
          console.log('🚀【拿到数据】', orders)
          commit('setRoomList', orders)
        }
      })
    }
  }
})
