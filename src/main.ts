import '@babel/polyfill';
import 'mutationobserver-shim';
import Vue from 'vue';
import './plugins/bootstrap-vue';
import { GeoDirectResponse, OneCallWeather } from '@/store/types';
import openWeatherService from '@/services/openWeatherService';
import App from './App.vue';
import router from './router';
import store from './store/store';
import { INIT } from './store/mutations';
import './registerServiceWorker';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
  async beforeCreate() {
    this.$store.commit(INIT);
    const { lat, lon } = this.$store.state.location;
    if (lat !== 0 && lon !== 0) { // This won't work for boats off the western coast of Africa :-)
      const weather: OneCallWeather = await openWeatherService
        .getOneCallWeather(lat, lon);
    }
  },
}).$mount('#app');
