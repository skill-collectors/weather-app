import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Locations from './views/Locations.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/locations',
      name: 'locations',
      component: Locations,
    },
  ],
});
