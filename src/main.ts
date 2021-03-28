import '@babel/polyfill';
import 'mutationobserver-shim';
import Vue from 'vue';
import './plugins/bootstrap-vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import { INIT } from './store/mutations';
import { UPDATE_WEATHER } from './store/actions';
import './registerServiceWorker';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
  async beforeCreate() {
    this.$store.commit(INIT);
    this.$store.dispatch(UPDATE_WEATHER);
  },
}).$mount('#app');
