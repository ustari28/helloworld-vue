import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
      logged: {
        type: Boolean,
        default: false
      }
    },
    mutations: {
      signin(state, credentials) {
        state.logged = credentials
      },

    }
  })