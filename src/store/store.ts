import Vue from 'vue';
import Vuex from 'vuex';
import { INIT, SET_API_KEY } from './mutations';
import OPEN_WEATHER from './apiNames';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    apiKeys: {
      [OPEN_WEATHER]: '',
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
    [INIT](state) {
      const localStore = localStorage.getItem('store');
      if (localStore) {
        this.replaceState({
          ...state,
          ...JSON.parse(localStore),
        });
      }
    },
    [SET_API_KEY](state: any, { apiName, newKey }: { apiName: string, newKey: string }) {
      const defaultedApiName = apiName || OPEN_WEATHER;
      state.apiKeys[apiName] = newKey;
    },
  },
  actions: {

  },
});

store.subscribe((mutation, state) => {
  localStorage.setItem('store', JSON.stringify(state));
});

export default store;
