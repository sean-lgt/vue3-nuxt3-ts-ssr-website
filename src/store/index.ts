import { createStore } from 'vuex'
import { saveLanguageApi } from '../api/layout'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { stat } from 'fs'
export const store = createStore({
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
