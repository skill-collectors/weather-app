import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { INIT, SET_API_KEY } from './mutations';
import OPEN_WEATHER from './apiNames';
import RootState from './types';

Vue.use(Vuex);

const storeOptions: StoreOptions<RootState> = {
  state: {
    apiKeys: {
      [OPEN_WEATHER]: '',
    },
    location: {
      city: '',
      lat: 0,
      lon: 0,
    },
    weather: {
      current: {},
      forcast: {},
    },
  },
  mutations: {
    [INIT](state: RootState) {
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
};

const store = new Vuex.Store<RootState>(storeOptions);

store.subscribe((mutation: any, state: RootState) => {
  localStorage.setItem('store', JSON.stringify(state));
});

export default store;
