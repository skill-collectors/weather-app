import {createRouter, createWebHistory} from 'vue-router'
import Home from './views/Home/HomeView.vue'
import Locations from './views/Locations/LocationsView.vue'
import Settings from './views/Settings/SettingsView.vue'

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
