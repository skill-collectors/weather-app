import countapi from 'countapi-js';
import store from '@/store/store';
import OPEN_WEATHER from '@/store/apiNames';

export default class OpenWeatherMap {
  private baseUrl: string = 'https://api.openweathermap.org/data/2.5/';

  private callCountForecast: number = 0;

  private callCountCurrent: number = 0;

  private callCountOneCall: number = 0;

  public getCallCountForecast() {
    return this.callCountForecast;
  }

  public getCallCountCurrent() {
    return this.callCountCurrent;
  }

  public getCallCountOneCall() {
    return this.callCountOneCall;
  }

  /**
  * Returns the weather forecast for the next 5 days in 3 hour steps
  *  for the city specificed
  */
  public async getForecastForCity(city: string): Promise<object> {
    let output: object;
    const url = this.baseUrl.concat('forecast?q=').concat(city)
      .concat('&units=imperial')
      .concat('&appid=')
      .concat(store.state.apiKeys[OPEN_WEATHER]);
    try {
      const response = await fetch(url);
      output = await response.json();
    } catch (error) {
      output = error;
    }
    await countapi.hit(process.env.VUE_APP_COUNTER_NAME ?? 'WeatherApp', 'forecast-weather')
      .then((result: { value: number; }) => { this.callCountForecast = result.value; });

    return output;
  }

  /**
  * Returns the weather forecast for the next 5 days in 3 hour steps
  *  for the longitude and latitude specified
  */
  public async getForecastForCoordinate(lat: string, lon: string): Promise<object> {
    let output: object;
    const url = this.baseUrl.concat('forecast?lat=').concat(lat)
      .concat('&lon=').concat(lon)
      .concat('&units=imperial')
      .concat('&appid=')
      .concat(store.state.apiKeys[OPEN_WEATHER]!);
    try {
      const response = await fetch(url);
      output = await response.json();
    } catch (error) {
      output = error;
    }
    await countapi.hit(process.env.VUE_APP_COUNTER_NAME ?? 'WeatherApp', 'forecast-weather')
      .then((result: { value: number; }) => { this.callCountForecast = result.value; });

    return output;
  }

  /**
  * Returns current weather data for the city specificed
  */
  public async getCurrentForCity(city: string): Promise<object> {
    let output: object;
    const url = this.baseUrl.concat('weather?q=').concat(city)
      .concat('&units=imperial')
      .concat('&appid=')
      .concat(store.state.apiKeys[OPEN_WEATHER]!);
    try {
      const response = await fetch(url);
      output = await response.json();
    } catch (error) {
      output = error;
    }
    await countapi.hit(process.env.VUE_APP_COUNTER_NAME ?? 'WeatherApp', 'current-weather')
      .then((result: { value: number; }) => { this.callCountCurrent = result.value; });

    return output;
  }

  /**
  * Returns current weather data for the longitude and latitude specified
  */
  public async getCurrentForCoordinate(lat: string, lon: string): Promise<object> {
    let output: object;
    const url = this.baseUrl.concat('weather?lat=').concat(lat)
      .concat('&lon=').concat(lon)
      .concat('&units=imperial')
      .concat('&appid=')
      .concat(store.state.apiKeys[OPEN_WEATHER]!);
    try {
      const response = await fetch(url);
      output = await response.json();
    } catch (error) {
      output = error;
    }
    await countapi.hit(process.env.VUE_APP_COUNTER_NAME ?? 'WeatherApp', 'current-weather')
      .then((result: { value: number; }) => { this.callCountCurrent = result.value; });

    return output;
  }

  /**
  * Use OpenWeatherMap OneCall Endpoint to get current weather, minute forecast for 1 hour,
  *   hourly forecast for 48 hours, and daily forecast for 7 days.
  */
  public async getOneCallWeather(lat: string, lon: string): Promise<object> {
    let output: object;
    const url = this.baseUrl.concat('onecall?lat=').concat(lat)
      .concat('&lon=').concat(lon)
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
      .then((result: { value: number; }) => { this.callCountCurrent = result.value; });

    return output;
  }
}
