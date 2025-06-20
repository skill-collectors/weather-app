/* eslint-disable camelcase */
// Underscores match the format of the OpenWeather API
export interface GeoDirectResponse {
  name: string
  country: string
  state: string
  lat: number
  lon: number
}

export interface GeolocationCoordinates {
  latitude: number
  longitude: number
}

export interface Weather {
  description: string
  icon: string
  id: number
  main: string
}

export interface CurrentWeather {
  temp: number
  feels_like: number
  weather: Weather[]
}

export interface MinutelyForecast {
  dt: number
  precipitation: number
}

export interface HourlyForecast {
  dt: number
  temp: number
  feels_like: number
  weather: Weather[]
}

export interface DailyFeelsLike {
  day: number
  eve: number
  morn: number
  night: number
}
export interface DailyTemp {
  day: number
  eve: number
  morn: number
  night: number
  min: number
  max: number
}

export interface DailyForecast {
  dt: number
  temp: DailyTemp
  feels_like: DailyFeelsLike
  weather: Weather[]
  dew_point: number
  humidity: number
  wind_speed: number
  wind_deg: number
  uvi: number
  sunset: number
  sunrise: number
  summary: string
}

export interface OneCallWeather {
  current: CurrentWeather
  minutely: MinutelyForecast[]
  hourly: HourlyForecast[]
  daily: DailyForecast[]
}

export interface RootState {
  apiKey: string
  location: GeoDirectResponse
  recentLocations: GeoDirectResponse[]
  weather: OneCallWeather
}

export interface UserMessage {
  text: string
}
