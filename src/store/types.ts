/* eslint-disable camelcase */
// Underscores match the format of the OpenWeather API
export interface Location {
  city: string,
  lat: number,
  lon: number,
}

export interface Weather {
  description: string,
  icon: string,
}

export interface CurrentWeather {
  temp: number,
  feels_like: number,
  weather: Weather[],
}

export interface MinutelyForcast {
  dt: number,
  precipitation: number,
}

export interface HourlyForcast {
  dt: number,
  temp: number,
  feels_like: number,
  weather: Weather[],
}

export interface DailyFeelsLike {
  day: number,
  eve: number,
  morn: number,
  night: number,
}
export interface DailyTemp {
  day: number,
  eve: number,
  morn: number,
  night: number,
  min: number,
  max: number,
}

export interface DailyForcast {
  dt: number,
  temp: DailyTemp,
  feels_like: DailyFeelsLike,
  weather: Weather[],
}

export interface OneCallWeather {
  current: CurrentWeather,
  minutely: MinutelyForcast[],
  hourly: HourlyForcast[],
  daily: DailyForcast[],
}

export interface Stats {
  callCount: number,
}

export interface RootState {
  apiKeys: any,
  location: Location,
  weather: OneCallWeather,
  stats: Stats,
}

export default RootState;
