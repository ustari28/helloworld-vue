import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource'
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
Vue.config.productionTip = false
new Vue({
  name: 'main',
  router,
  render: h => h(App)
}).$mount('#app')
