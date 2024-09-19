import {createRouter, createWebHistory} from 'vue-router'
import Home from './views/Home/Home.vue'
import Locations from './views/Locations.vue'
import Settings from './views/Settings/Settings.vue'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/locations',
    component: Locations
  },
  {
    path: '/settings',
    component: Settings
  }
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
