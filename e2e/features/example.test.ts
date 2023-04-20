Feature('Example Tests');

Scenario('Get Weather Forecast - Basic Example', async ({ I }) => {
  I.amOnPage('https://skill-collectors.github.io/weather-app/#/');
  I.click('OpenWeather Sample');
  I.fillField('#city', 'Minneapolis');
  I.click('#weatherForecast');
  I.seeElement('.dateHeader');
});

Scenario('Get Weather Forecast - Page Objects', async ({ I, openWeatherSamplePage, homePage }) => {
  homePage.goToHome();
  I.click('OpenWeather Sample');
  openWeatherSamplePage.getForecast('Tulsa');
});

Scenario('Get Current Weather - Page Objects', async ({ I, openWeatherSamplePage, homePage }) => {
  homePage.goToHome();
  I.click('OpenWeather Sample');
  openWeatherSamplePage.getCurrentWeather('93', '45');
});
