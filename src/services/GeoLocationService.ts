import store from '@/store/store';
import openWeather from '@/services/openWeatherMap';
import { SET_CITY, SET_LAT, SET_LON } from '../store/mutations';

export default class GeoLocationService {
  static errorMessge: string = 'Unable to retrieve your location';

  private output: object = {};

  static getCurrentPosition(): Promise<any> {
    // Possible TODO Create object for coords instead of using 'any'
    // function response(coords: Coordinates) {
    //   store.commit(SET_LON, coords.longitude);
    //   store.commit(SET_LAT, coords.latitude);
    // }

    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser'));
      }
      navigator.geolocation.getCurrentPosition(
        (position: { coords: { longitude: any; latitude: any; }; }) => resolve(position.coords),
        () => reject(new Error(this.errorMessge)),
      );
    });
  }

  // public async getCurrentCity(latitude : number, longitude : number): Promise<string> {
  //   this.output = await openWeather.getCurrentForCoordinate(latitude, longitude);

  //   return '';
  // }
}
