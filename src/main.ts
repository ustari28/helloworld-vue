import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource'

Vue.use(VueResource)
var momenttz = require('moment-timezone')
Vue.filter('formatDate', function(d) {
  if (d) {
    return momenttz(d).format('YYYY-MM-DD HH:mm:ss')
  }
})

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
