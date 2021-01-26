export interface Location {
  city: string,
  lat: number,
  lon: number,
}

export interface Weather {
  current: object,
  forcast: object,
}

export interface RootState {
  apiKeys: any,
  location: Location,
  weather: Weather,
}

export default RootState;
