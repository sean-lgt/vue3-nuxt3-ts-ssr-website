import { createStore } from 'vuex'

export const store = createStore({
  state: {
    count: 1
  },
  mutations: {
    setCount(state, payload) {
      state.count += payload
      return state.count
    }
  },
  actions: {
    fetchCount({ commit, state }, payload) {
      setTimeout(() => {
        commit('setCount', payload)
      }, 3000)
    }
  }
})
