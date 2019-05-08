import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Search from './views/Search.vue'
import EventList from '@/views/EventList.vue'
import Processes from '@/views/Processes.vue'
import Login from '@/views/Login.vue'
import Dashboard from '@/views/Dashboard.vue'
import store from './store';

Vue.use(Router)
function requireLogin(to, from, next) {
  if (!store.state.logged) {
    next({path: '/login', query: { redirect: to.fullPath }})
  } else {
    next()
  }
}
export default new Router({
  routes: [    
    {
      path: '/home',
      component: Home,
      beforeEnter: requireLogin,
      children: [
        {
          path: '',
          component: Dashboard
        },
        {
          path: '/search',
          name: 'search',
          component: Search
        },
        {
          path: '/events',
          name: 'events',
          component: EventList
        },
        {
          path: '/home/processes',
          component: Processes
        },
        {
          path: '/about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }    
  ]
})