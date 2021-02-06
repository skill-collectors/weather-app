/* eslint-disable class-methods-use-this */
import store from '@/store/store';
import { SET_CITY, SET_LAT, SET_LON } from '../store/mutations';

export default class GeoLocationService {
  public async getCurrentPosition(): Promise<object> {
    // const resolve = (position: { coords: { longitude: any; latitude: any; }; }): void => {
    //   store.commit(SET_LON, position.coords.longitude);
    //   store.commit(SET_LAT, position.coords.latitude);
    // };

    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser'));
      }
      navigator.geolocation.getCurrentPosition(() => resolve(position.coords), () => reject(new Error('Unable to retrieve your location')));
    });
  }
}
