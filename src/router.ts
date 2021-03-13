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
    {
      path: '/openWeatherAPI',
      name: 'openWeatherAPI',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "openWeatherAPI-page" */ './views/OpenWeatherAPIPage.vue'),
    },
  ],
});
