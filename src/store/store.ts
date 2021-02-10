import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import {
  INIT, SET_CITY, SET_LAT, SET_LON, SET_API_KEY, SET_CALL_COUNT,
} from '@/store/mutations';

import OPEN_WEATHER from './apiNames';
import { RootState } from './types';

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
    stats: {
      callCount: 0,
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
    [SET_API_KEY](state: RootState, { apiName, newKey }: { apiName: string, newKey: string }) {
      const defaultedApiName = apiName || OPEN_WEATHER;
      state.apiKeys[apiName] = newKey;
    },
    [SET_CITY](state: RootState, { city }: { city: string }) {
      state.location.city = city;
    },
    [SET_LAT](state: RootState, { lat }: { lat: number }) {
      state.location.lat = lat;
    },
    [SET_LON](state: RootState, { lon }: { lon: number }) {
      state.location.lon = lon;
    },
    [SET_CALL_COUNT](state: RootState, { callCount }: { callCount: number }) {
      state.stats.callCount = callCount;
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
