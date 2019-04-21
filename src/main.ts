import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource'

var momenttz = require('moment-timezone')
var VueSocketIO = require('vue-socket.io')
//var VueStomp = require('vue-stomp')
Vue.filter('formatDate', function(d) {
  if (d) {
    return momenttz(d).format('YYYY-MM-DD HH:mm:ss')
  }
})
//Vue.use(VueStomp, 'http://localhost:8090/gs-guide-websocket')
Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:8090',
  options: {path: '/sockejs'}
}))
//Vue.use()
Vue.use(VueResource)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
