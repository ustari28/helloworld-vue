import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource'
import VueI18n from 'vue-i18n'
import MyMessages from '@/lang/es.json'
/** bootstrap */
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
/** font-awesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserTie, faCogs, faTasks } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

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
library.add(faUserTie, faCogs, faTasks)
Vue.component('font-awesome-icon', FontAwesomeIcon)
var i18n = new VueI18n({
  locale: 'es',
  fallbackLocale: 'es',
  messages: MyMessages
})
Vue.config.productionTip = false
new Vue({
  name: 'main',
  i18n,
  router,
  render: h => h(App)
}).$mount('#app')
