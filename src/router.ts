import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home/Home.vue'
import Locations from './views/Locations.vue'
import Settings from './views/Settings/Settings.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/locations',
      name: 'locations',
      component: Locations
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    }
  ]
})
