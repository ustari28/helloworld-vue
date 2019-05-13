import Vue from 'vue'
import Vuex from 'vuex'

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
        window.localStorage.setItem('token', token)
      }
    }
  })