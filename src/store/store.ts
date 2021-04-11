import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import {
  INIT, SET_LOCATION, DELETE_RECENT_LOCATION, SET_API_KEY, SET_CALL_COUNT, SET_WEATHER,
} from '@/store/mutations';
import { UPDATE_WEATHER, UPDATE_LOCATION } from '@/store/actions';
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
    recentLocations: [],
    weather: {
      current: {
        temp: 0,
        feels_like: 0,
        weather: [{
          description: '', icon: '', id: 0, main: '',
        }],
      },
      minutely: [{ dt: 0, precipitation: 0 }],
      hourly: [{
        dt: 0,
        temp: 0,
        feels_like: 0,
        weather: [{
          description: '', icon: '', id: 0, main: '',
        }],
      }],
      daily: [{
        dt: 0,
        temp: {
          day: 0, eve: 0, morn: 0, night: 0, min: 0, max: 0,
        },
        feels_like: {
          day: 0, eve: 0, morn: 0, night: 0,
        },
        weather: [{
          description: '', icon: '', id: 0, main: '',
        }],
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
      state.recentLocations.push(location);
      // trim oldest entries
      while (state.recentLocations.length > 10) {
        state.recentLocations.shift();
      }
      state.location = location;
    },
    [DELETE_RECENT_LOCATION](state: RootState, locationToRemove: GeoDirectResponse) {
      const index = state.recentLocations
        .findIndex((recent) => recent.lat === locationToRemove.lat
          && recent.lon === locationToRemove.lon);
      if (index !== -1) {
        state.recentLocations.splice(index, 1);
      }
    },
    [SET_WEATHER](state: RootState, weather: OneCallWeather) {
      state.weather = weather;
    },
    [SET_CALL_COUNT](state: RootState, { callCount }: { callCount: number }) {
      state.stats.callCount = callCount;
    },
  },
  actions: {
    async [UPDATE_WEATHER](context) {
      if (context.getters.hasLocation) {
        const { lat, lon } = context.state.location;
        const { apiKey } = context.state;
        const weather = await openWeather.getOneCallWeather(lat, lon, apiKey);
        context.commit(SET_WEATHER, weather);
      }
    },
    async [UPDATE_LOCATION](context, location: GeoDirectResponse) {
      // delete any old entries if they are duplicates
      context.commit(DELETE_RECENT_LOCATION, location);
      context.commit(SET_LOCATION, location);
      context.dispatch(UPDATE_WEATHER);
    },
  },
  getters: {
    locationDisplayName(state, getters) {
      if (getters.hasLocation) {
        return convert.geoToString(state.location);
      }
      return '';
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
