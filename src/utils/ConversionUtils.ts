import type { GeoDirectResponse } from '@/store/types'

export default {
  dtToDate(dt: number): Date {
    return new Date(dt * 1000)
  },

  iconToUrl(icon: string, variant: string = ''): string {
    return `https://openweathermap.org/img/wn/${icon}${variant}.png`
  },

  geoToString(geo: GeoDirectResponse, withCoords: boolean = false) {
    if (geo === undefined) {
      return ''
    }
    let str = geo.name
    if (geo.country !== undefined) {
      str += `, ${geo.country}`
    }
    if (geo.state !== undefined) {
      str += `, ${geo.state}`
    }
    if (withCoords && geo.lat !== undefined && geo.lon !== undefined) {
      str += ` (${geo.lat}, ${geo.lon})`
    }
    return str
  }
}
