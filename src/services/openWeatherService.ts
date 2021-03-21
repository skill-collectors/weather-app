import countapi from 'countapi-js';
import store from '@/store/store';
import OPEN_WEATHER from '@/store/apiNames';
import { SET_CALL_COUNT } from '@/store/mutations';

const BASE_URL: string = 'https://api.openweathermap.org/data/2.5/';

export interface GeoDirectResponse {
  name: string,
  country: string,
  state: string,
  lat: number,
  lon: number,
}

export default {

  async searchCoordsByCity(query: string): Promise<GeoDirectResponse[]> {
    const url = `https://api.openweathermap.org/geo/1.0/direct?&q=${query}&limit=5&appId=${store.state.apiKeys[OPEN_WEATHER]!}`;
    const response = await fetch(url);
    // TODO add call to count API, but should we track different endpoint calls separately?
    return await response.json() as GeoDirectResponse[];
  },

  async searchCityByCoords(lat: number, lon: number): Promise<GeoDirectResponse[]> {
    const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat.toString()}&lon=${lon.toString()}&appId=${store.state.apiKeys[OPEN_WEATHER]!}`;
    const response = await fetch(url);
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
    await countapi.hit('WeatherApp', 'one-weather')
      .then((result: { value: number; }) => {
        store.commit(SET_CALL_COUNT, { callCount: result.value });
      });

    return output;
  },
};
