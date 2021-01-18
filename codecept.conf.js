require('ts-node/register');
const { setHeadlessWhen } = require('@codeceptjs/configure');

// turn on headless mode when running with HEADLESS=true environment variable
// HEADLESS=true npx codecept run
setHeadlessWhen(process.env.HEADLESS);

exports.config = {
  tests: './tests/**/*.test.ts',
  output: './output',
  helpers: {
    Playwright: {
      url: 'https://skill-collectors.github.io/weather-app/#/',
      show: true,
      restart: false,
      waitForNavigation: 'networkidle0',
      waitForAction: 500,
    },
    // CustomHelper: {
    //   require: './tests/e2e/helpers/CustomHelper.ts',
    // },
  },
  include: {
    openWeatherSamplePage: './tests/e2e/pages/openWeatherSamplePage.ts',
    homePage: './tests/e2e/pages/homePage.ts',
  },
  name: 'weather-app-e2e',
  plugins: {
    retryFailedStep: {
      enabled: true,
    },
    screenshotOnFail: {
      enabled: true,
    },
    wdio: {
      enabled: false,
      services: ['selenium-standalone'],
    },
  },
};
