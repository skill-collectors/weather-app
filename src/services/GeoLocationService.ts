import store from '@/store/store';
import openWeather from '@/services/openWeatherService';
import { GeolocationCoordinates } from '@/store/types';
import { SET_CITY, SET_LAT, SET_LON } from '../store/mutations';

export default {

  async getCurrentPosition(): Promise<GeolocationCoordinates> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser'));
      }
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position.coords),
        () => reject(new Error('Unable to retrieve your location')),
      );
    });
  },
};
