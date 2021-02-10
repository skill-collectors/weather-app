declare function getForecastForCity(city: string): Promise<object>;
declare function getForecastForCoordinate(lat: number, lon: number): Promise<object>;
declare function getCurrentForCity(city: string): Promise<object>;
declare function getCurrentForCoordinate(lat: number, lon: number): Promise<object>;

// TODO avoid using the 'any' type
declare function getOneCallWeather(lat: number, lon: number): Promise<any>;
declare function searchCoordsByCity(query: string): Promise<any>;

export interface OpenWeatherService {
  getForecastForCity,
  getForecastForCoordinate,
  getCurrentForCity,
  getCurrentForCoordinate,
  getOneCallWeather,
}
export default OpenWeatherService;
