const countapi = require('countapi-js');

export default class OpenWeatherMap {
    static baseUrl: string = 'https://api.openweathermap.org/data/2.5/';

    static output: any = '';

    static callCount: number = 0;

    static getCallCount(): number {
      return this.callCount;
    }

    static getForecastForCity(city: string): any {
      const url = this.baseUrl.concat('forecast?q=').concat(city)
        .concat('&units=imperial')
        .concat('&appid=')
        .concat(process.env.VUE_APP_API_ACCESS_KEY);
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.output = data;
        }).catch((error) => {
          this.output = error;
          console.log(JSON.stringify(error));
        });
      countapi.hit(process.env.VUE_APP_COUNTER_NAME, 'current-weather')
        .then((result: { value: number; }) => { this.callCount = result.value; });

      return this.output;
    }

    static getForecastForCoordinate(lat: string, lon: string): any {
      const url = this.baseUrl.concat('forecast?lat=').concat(lat)
        .concat('lon=').concat(lon)
        .concat('&appid=')
        .concat(process.env.VUE_APP_API_ACCESS_KEY);
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.output = data;
        }).catch((error) => {
          this.output = error;
          console.log(JSON.stringify(error));
        });
      countapi.hit(process.env.VUE_APP_COUNTER_NAME, 'current-weather')
        .then((result: { value: number; }) => { this.callCount = result.value; });

      return this.output;
    }
}
