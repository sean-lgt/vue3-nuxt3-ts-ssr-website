import { InjectionKey } from 'vue'
import { createStore, Store, useStore as originUseStore } from 'vuex'
import { saveLanguageApi } from '../api/layout'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

// 为 store state 声明类型
export interface IAllStateTypes {
  count: number
  locale: any
  userStatus: number
}

// 定义 injection key
export const key: InjectionKey<Store<IAllStateTypes>> = Symbol('allStoreKey')

// 暴露一个使用key的useStore,可以直接导入使用，无需再传key
export const useStore = () => {
  return originUseStore(key)
}

export const store = createStore<IAllStateTypes>({
  state: {
    count: 1,
    locale: zhCn, // 当前语言
    userStatus: 0 // 登录态
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
    }
  }
})
