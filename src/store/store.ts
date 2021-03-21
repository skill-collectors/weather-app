import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import {
  INIT, SET_LOCATION, SET_API_KEY, SET_CALL_COUNT, SET_WEATHER,
} from '@/store/mutations';
import openWeather from '@/services/openWeatherService';
import convert from '@/utils/ConversionUtils';
import { RootState, OneCallWeather, GeoDirectResponse } from './types';

Vue.use(Vuex);

const storeOptions: StoreOptions<RootState> = {
  state: {
    apiKey: '',
    location: {
      name: '',
      country: '',
      state: '',
      lat: 0,
      lon: 0,
    },
    weather: {
      current: {
        temp: 0,
        feels_like: 0,
        weather: [{ description: '', icon: '' }],
      },
      minutely: [{ dt: 0, precipitation: 0 }],
      hourly: [{
        dt: 0, temp: 0, feels_like: 0, weather: [{ description: '', icon: '' }],
      }],
      daily: [{
        dt: 0,
        temp: {
          day: 0, eve: 0, morn: 0, night: 0, min: 0, max: 0,
        },
        feels_like: {
          day: 0, eve: 0, morn: 0, night: 0,
        },
        weather: [{ description: '', icon: '' }],
      }],
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
    [SET_API_KEY](state: RootState, newKey: string) {
      state.apiKey = newKey;
    },
    [SET_LOCATION](state: RootState, location: GeoDirectResponse) {
      state.location = location;
    },
    [SET_WEATHER](state: RootState, weather: OneCallWeather) {
      state.weather = weather;
    },
    [SET_CALL_COUNT](state: RootState, { callCount }: { callCount: number }) {
      state.stats.callCount = callCount;
    },
  },
  actions: {
    async updateWeather(context) {
      if (context.getters.hasLocation) {
        const { lat, lon } = context.state.location;
        const { apiKey } = context.state;
        const weather = await openWeather.getOneCallWeather(lat, lon, apiKey);
        context.commit(SET_WEATHER, weather);
      }
    },
    async setLocation(context, location: GeoDirectResponse) {
      context.commit(SET_LOCATION, location);
      context.dispatch('updateWeather');
    },
  },
  getters: {
    locationDisplayName(state) {
      return convert.geoToString(state.location);
    },
    hasLocation(state) {
      const { name, lat, lon } = state.location;
      return lat !== 0 && lon !== 0 && name !== '';
    },
    hasWeather(state) {
      // There may be a better way to detect this, but this is good enough for now
      return state.weather.current.weather[0].description !== '';
    },
  },
};

const store = new Vuex.Store<RootState>(storeOptions);

store.subscribe((mutation: any, state: RootState) => {
  localStorage.setItem('store', JSON.stringify(state));
});

export default store;
