export interface Location {
  city: string,
  lat: number,
  lon: number,
}

export interface Weather {
  current: object,
  forcast: object,
}

export interface Stats {
  callCount: number,
}

export interface RootState {
  apiKeys: any,
  location: Location,
  weather: Weather,
  stats: Stats,
}

export default RootState;
