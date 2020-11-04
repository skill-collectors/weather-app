Feature('Example Tests');

// NOTE: You'll need to serve the app prior to executing!
Scenario('Get Weather Forecast - Basic Example', async ({ I }) => {
  I.amOnPage('http://localhost:8080/#');
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
