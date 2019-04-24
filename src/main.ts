import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource'
/** bootstrap */
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
/** font-awesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserTie, faCogs } from '@fortawesome/free-solid-svg-icons'
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
library.add(faUserTie, faCogs)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false
new Vue({
  name: 'main',
  router,
  render: h => h(App)
}).$mount('#app')
