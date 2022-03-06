import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      user: {},
      hasMetaMask: false
    }
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    get(state){
      return state.user;
    },
    setHasMetaMask(state) {
      state.hasMetaMask = true
    }
  }
})

export default store