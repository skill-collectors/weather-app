declare function getForecastForCity(city: string): Promise<object>;
declare function getForecastForCoordinate(lat: number, lon: number): Promise<object>;
declare function getCurrentForCity(city: string): Promise<object>;
declare function getCurrentForCoordinate(lat: number, lon: number): Promise<object>;
declare function getOneCallWeather(lat: number, lon: number): Promise<object>;

export interface OpenWeatherService {
  getForecastForCity,
  getForecastForCoordinate,
  getCurrentForCity,
  getCurrentForCoordinate,
  getOneCallWeather,
}
export default OpenWeatherService;
