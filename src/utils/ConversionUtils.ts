import { GeoDirectResponse } from '@/store/types';

export default {
  dtToDate(dt: number): Date {
    return new Date(dt * 1000);
  },

  iconToUrl(icon: string): string {
    return `https://openweathermap.org/img/wn/${icon}.png`;
  },

  geoToString(geo: GeoDirectResponse) {
    let str = geo.name;
    if (geo.country !== undefined) {
      str += `, ${geo.country}`;
    }
    if (geo.state !== undefined) {
      str += `, ${geo.state}`;
    }
    return str;
  },
};
