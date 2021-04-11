import { HourlyForecast, OneCallWeather } from '@/store/types';
import convert from '@/utils/ConversionUtils';
import { format } from 'date-fns';

export interface ComingUpNotification {
  type: string,
  iconUrl: string,
  text: string,
}

function getUpcomingRainNotification(weather: OneCallWeather): ComingUpNotification | undefined {
  function isRainy(forecast: HourlyForecast) {
    const typeCode = forecast.weather[0].icon.charAt(0);
    // See https://openweathermap.org/weather-conditions#How-to-get-icon-URL for icon codes
    return ['2', '3', '5'].includes(typeCode);
  }
  const maybeRainy = weather.hourly.find((forecast) => isRainy(forecast));
  if (maybeRainy !== undefined) {
    return {
      type: 'RAIN',
      iconUrl: convert.iconToUrl(maybeRainy.weather[0].icon),
      text: `${maybeRainy.weather[0].description} coming up at ${format(maybeRainy.dt, 'ha')}`,
    };
  }
  return undefined;
}

function getSnowTomorrowNotification(weather: OneCallWeather): ComingUpNotification | undefined {
  const tomorrowWeather = weather.daily[1].weather[0];
  if (tomorrowWeather.main === 'Snow') {
    return {
      type: 'SNOW',
      iconUrl: convert.iconToUrl(tomorrowWeather.icon),
      text: 'Snow tomorrow',
    };
  }
  return undefined;
}

export default function
determineComingUpNotifications(weather: OneCallWeather): ComingUpNotification[] {
  const results: ComingUpNotification[] = [];

  const upcomingRain = getUpcomingRainNotification(weather);
  if (upcomingRain != null) {
    results.push(upcomingRain);
  }

  const upcomingSnow = getSnowTomorrowNotification(weather);
  if (upcomingSnow !== undefined) {
    results.push(upcomingSnow);
  }

  return results;
}
