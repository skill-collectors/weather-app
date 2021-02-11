import countapi from 'countapi-js';
import store from '@/store/store';
import OPEN_WEATHER from '@/store/apiNames';
import { SET_CALL_COUNT } from '@/store/mutations';

const BASE_URL: string = 'https://api.openweathermap.org/data/2.5/';

export interface GeoDirectResponse {
  name: string,
  lat: number,
  lon: number,
}

export default {

  /**
  * Returns the weather forecast for the next 5 days in 3 hour steps
  *  for the city specificed
  */
  async getForecastForCity(city: string): Promise<object> {
    let output: object;
    const url = BASE_URL.concat('forecast?q=').concat(city)
      .concat('&units=imperial')
      .concat('&appid=')
      .concat(store.state.apiKeys[OPEN_WEATHER]);
    try {
      const response = await fetch(url);
      output = await response.json();
    } catch (error) {
      output = error;
    }

    return output;
  },

  /**
  * Returns the weather forecast for the next 5 days in 3 hour steps
  *  for the longitude and latitude specified
  */
  async getForecastForCoordinate(lat: number, lon: number): Promise<object> {
    let output: object;
    const url = BASE_URL.concat('forecast?lat=').concat(lat.toString())
      .concat('&lon=').concat(lon.toString())
      .concat('&units=imperial')
      .concat('&appid=')
      .concat(store.state.apiKeys[OPEN_WEATHER]!);
    try {
      const response = await fetch(url);
      output = await response.json();
    } catch (error) {
      output = error;
    }

    return output;
  },

  /**
  * Returns current weather data for the city specificed
  */
  async getCurrentForCity(city: string): Promise<object> {
    let output: object;
    const url = BASE_URL.concat('weather?q=').concat(city)
      .concat('&units=imperial')
      .concat('&appid=')
      .concat(store.state.apiKeys[OPEN_WEATHER]!);
    try {
      const response = await fetch(url);
      output = await response.json();
    } catch (error) {
      output = error;
    }

    return output;
  },

  /**
  * Returns current weather data for the longitude and latitude specified
  */
  async getCurrentForCoordinate(lat: number, lon: number): Promise<object> {
    let output: object;
    const url = BASE_URL.concat('weather?lat=').concat(lat.toString())
      .concat('&lon=').concat(lon.toString())
      .concat('&units=imperial')
      .concat('&appid=')
      .concat(store.state.apiKeys[OPEN_WEATHER]!);
    try {
      const response = await fetch(url);
      output = await response.json();
    } catch (error) {
      output = error;
    }

    return output;
  },

  dtToDate(dt: number): Date {
    return new Date(dt * 1000);
  },

  iconToUrl(icon: string): string {
    return `http://openweathermap.org/img/wn/${icon}.png`;
  },

  async searchCoordsByCity(query: string): Promise<GeoDirectResponse[]> {
    const url = `http://api.openweathermap.org/geo/1.0/direct?&q=${query}&appId=${store.state.apiKeys[OPEN_WEATHER]!}`;
    const response = await fetch(url);
    // TODO add call to count API, but should we track different endpoint calls separately?
    return await response.json() as GeoDirectResponse[];
  },

  /**
  * Use OpenWeatherMap OneCall Endpoint to get current weather, minute forecast for 1 hour,
  *   hourly forecast for 48 hours, and daily forecast for 7 days.
  */
  async getOneCallWeather(lat: number, lon: number): Promise<any> {
    let output: object;
    const url = BASE_URL.concat('onecall?lat=').concat(lat.toString())
      .concat('&lon=').concat(lon.toString())
      .concat('&units=imperial')
      .concat('&appid=')
      .concat(store.state.apiKeys[OPEN_WEATHER]!);
    try {
      const response = await fetch(url);
      output = await response.json();
    } catch (error) {
      output = error;
    }
    await countapi.hit(process.env.VUE_APP_COUNTER_NAME ?? 'WeatherApp', 'one-weather')
      .then((result: { value: number; }) => {
        store.commit(SET_CALL_COUNT, { callCount: result.value });
      });

    return output;
  },
};