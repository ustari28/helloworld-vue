import Vue from 'vue'
import Vuex from 'vuex'
import Vue2Storage from 'vue2-storage'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
      logged: false,
      token: ''
    },
    mutations: {
      signin(state, credentials) {
        state.logged = credentials
      },
      renewToken(state, token) {
        state.token = token
        //Vue2Storage.set('token', token)
      }
    }
  })