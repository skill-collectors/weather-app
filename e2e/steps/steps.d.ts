type openWeatherSamplePage = typeof import('../pages/openWeatherSamplePage');
type homePage = typeof import('../pages/homePage');
type CodeceptJS = typeof import('codeceptjs');
declare namespace CodeceptJS {
  interface SupportObject {
    I: CodeceptJS.I, current: any,
    openWeatherSamplePage: openWeatherSamplePage,
    homePage: homePage
  }
  interface Methods extends Playwright {}
  interface I extends WithTranslation<Methods> {}
  namespace Translation {
    interface Actions {}
  }
}
