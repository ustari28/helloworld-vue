import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource'
import VueI18n from 'vue-i18n'
import MyMessages from '@/lang/es.json'
import Vue2Storage from 'vue2-storage'
/** bootstrap */
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
/** font-awesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserTie, faCogs, faTasks } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/** Vuex */
import store from './store'

/**
 * Requesting modules.
 */
var momenttz = require('moment-timezone')
/**
 * Filter area.
 */
Vue.filter('formatDate', function(d) {
  if (d) {
    return momenttz(d).format('YYYY-MM-DD HH:mm:ss')
  }
})
/**
 * Load packages and properties.
 */
Vue.use(VueResource)
Vue.use(BootstrapVue)
Vue.use(VueI18n)
Vue.use(Vue2Storage)
library.add(faUserTie, faCogs, faTasks)
Vue.component('font-awesome-icon', FontAwesomeIcon)
var i18n = new VueI18n({
  locale: 'es',
  fallbackLocale: 'es',
  messages: MyMessages
})
/** Global configurations */
Vue.config.productionTip = false
Vue.prototype.$urlLogin = 'http://127.0.0.1:8090/api/security/v1/token'
Vue.prototype.$appId = 'vueappclientid'
/** Creating Vue instance */
const vueApp = new Vue({
  name: 'main',
  i18n,
  router,
  store,
  mounted () {
    console.log('mounted')
    var token = this.$storage.get('token', 'NO')
    console.log('token => ' + token)
    if (token != 'NO') { 
      console.log('updating token')     
      store.commit('renewToken', token)
    }
  },
  render: h => h(App)
})
vueApp.$mount('#app')
