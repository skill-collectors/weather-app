import store from '@/store/store';
import openWeather from '@/services/openWeatherService';
import { GeolocationCoordinates } from '@/store/types';
import { SET_CITY, SET_LAT, SET_LON } from '../store/mutations';

export default class GeoLocationService {
  static errorMessge: string = 'Unable to retrieve your location';

  private output: object = {};

  static getCurrentPosition(): Promise<GeolocationCoordinates> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser'));
      }
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position.coords),
        () => reject(new Error(this.errorMessge)),
      );
    });
  }
}
