const { I } = inject();

export = {
  cityInputSelector: '#city',
  weatherForecastBtnSelector: '#weatherForecast',
  weatherHeaderSelectors: '.dateHeader',
  getForecast(city: string) {
    I.fillField(this.cityInputSelector, city);
    I.click(this.weatherForecastBtnSelector);
    I.seeElement(this.weatherHeaderSelectors);
    I.waitForVisible(this.cityInputSelector);
  },

  longitudeInputSelectors: '#longitude',
  latitudeInputSelectors: '#latitude',
  currentWeatherBtnSelector: '#currentWeather',
  getCurrentWeather(longitude: string, latitude: string) {
    I.fillField(this.cityInputSelector, '');
    I.fillField(this.longitudeInputSelectors, longitude);
    I.fillField(this.latitudeInputSelectors, latitude);
    I.click(this.weatherForecastBtnSelector);
    I.seeElement(this.weatherHeaderSelectors);
    I.waitForVisible(this.cityInputSelector);
  },

};
