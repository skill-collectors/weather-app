import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './views/Home/HomeView.vue'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/locations',
    component: () => import('./views/Locations/LocationsView.vue')
  },
  {
    path: '/settings',
    component: () => import('./views/Settings/SettingsView.vue')
  }
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})
