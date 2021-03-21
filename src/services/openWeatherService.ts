import countapi from 'countapi-js';
import { GeoDirectResponse } from '@/store/types';
import { SET_CALL_COUNT } from '@/store/mutations';

const BASE_URL: string = 'https://api.openweathermap.org/data/2.5/';

export default {

  async searchCoordsByCity(query: string, apiKey: string): Promise<GeoDirectResponse[]> {
    const url = `https://api.openweathermap.org/geo/1.0/direct?&q=${query}&limit=5&appId=${apiKey}`;
    const response = await fetch(url);
    // TODO add call to count API, but should we track different endpoint calls separately?
    return await response.json() as GeoDirectResponse[];
  },

  async searchCityByCoords(lat: number, lon: number, apiKey: string): Promise<GeoDirectResponse[]> {
    const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat.toString()}&lon=${lon.toString()}&appId=${apiKey}`;
    const response = await fetch(url);
    return await response.json() as GeoDirectResponse[];
  },

  /**
  * Use OpenWeatherMap OneCall Endpoint to get current weather, minute forecast for 1 hour,
  *   hourly forecast for 48 hours, and daily forecast for 7 days.
  */
  async getOneCallWeather(lat: number, lon: number, apiKey: string): Promise<any> {
    const units = 'imperial';
    const url = `${BASE_URL}onecall?lat=${lat.toString()}&lon=${lon.toString()}&units=${units}&appid=${apiKey}`;
    const response = await fetch(url);
    return response.json();
  },
};
