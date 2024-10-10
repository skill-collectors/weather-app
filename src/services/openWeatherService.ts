import type { GeoDirectResponse, OneCallWeather } from '@/store/types'
import HttpError from './HttpError'

const BASE_URL = 'https://api.openweathermap.org'
const GEO_URL = `${BASE_URL}/geo/1.0`
const DATA_URL = `${BASE_URL}/data/3.0`

export default {
  async searchCoordsByCity(query: string, apiKey: string): Promise<GeoDirectResponse[]> {
    const url = `${GEO_URL}/direct?&q=${query}&limit=5&appId=${apiKey}`
    const response = await fetch(url)
    if (!response.ok) {
      throw new HttpError(response.status, await response.text())
    }
    return (await response.json()) as GeoDirectResponse[]
  },

  async searchCityByCoords(lat: number, lon: number, apiKey: string): Promise<GeoDirectResponse[]> {
    const url = `${GEO_URL}/reverse?lat=${lat.toString()}&lon=${lon.toString()}&appId=${apiKey}`
    const response = await fetch(url)
    if (!response.ok) {
      throw new HttpError(response.status, await response.text())
    }
    return (await response.json()) as GeoDirectResponse[]
  },

  /**
   * Use OpenWeatherMap OneCall Endpoint to get current weather, minute forecast for 1 hour,
   *   hourly forecast for 48 hours, and daily forecast for 7 days.
   */
  async getOneCallWeather(lat: number, lon: number, apiKey: string): Promise<OneCallWeather> {
    const units = 'imperial'
    const url = `${DATA_URL}/onecall?lat=${lat.toString()}&lon=${lon.toString()}&units=${units}&appid=${apiKey}`
    const response = await fetch(url)
    if (!response.ok) {
      throw new HttpError(response.status, await response.text())
    }
    return response.json()
  }
}

