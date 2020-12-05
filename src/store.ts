import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    apiKeys: {
      openWeather: '',
    },
    location: {
      city: '',
      lat: 0,
      log: 0,
    },
    weather: {
      current: {},
      forcase: {},
    },
  },
  mutations: {
    init(state) {
      const localStore = localStorage.getItem('store');
      if (localStore) {
        this.replaceState({
          ...state,
          ...JSON.parse(localStore),
        });
      }
    },
  },
  actions: {

  },
});

store.subscribe((mutation, state) => {
  localStorage.setItem('store', JSON.stringify(state));
});

export default store;
