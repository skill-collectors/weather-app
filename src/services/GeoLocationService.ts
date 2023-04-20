import store from '@/store/store'
import openWeather from '@/services/openWeatherService'
import { GeolocationCoordinates } from '@/store/types'

export default {
  async getCurrentPosition(): Promise<GeolocationCoordinates> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser'))
      }
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position.coords),
        (err) => {
          switch (err.code) {
            case 1:
              reject(new Error('Permission was not granted to retrieve your location.'))
              break
            case 2:
              reject(
                new Error('Your position is unavailable. Your device may not support geolocation.')
              )
              break
            case 3:
              reject(
                new Error(
                  "A timeout occured waiting for your location information. Perhaps your device can't get a GPS fix"
                )
              )
              break
            default:
              reject(new Error('Unable to retrieve your location.'))
              break
          }
        }
      )
    })
  }
}
