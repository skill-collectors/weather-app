const { I } = inject();

export = {
  cityInputSelector: '#city',
  weatherForecastBtnSelector: '#weatherForecast',
  forecastHeaderSelectors: '.dateHeader',
  getForecast(city: string) {
    I.fillField(this.cityInputSelector, city);
    I.click(this.weatherForecastBtnSelector);
    I.seeElement(this.forecastHeaderSelectors);
    I.waitForVisible(this.cityInputSelector);
  },
};
