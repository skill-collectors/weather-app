import { HourlyForecast, OneCallWeather } from '@/store/types';
import convert from '@/utils/ConversionUtils';
import { format, differenceInHours } from 'date-fns';

export interface ComingUpNotification {
  type: string,
  iconUrl: string,
  text: string,
}

function getUpcomingRainNotification(weather: OneCallWeather): ComingUpNotification | undefined {
  function isRainy(forecast: HourlyForecast) {
    return forecast.weather[0].main === 'Rain';
  }
  const maybeRainy = weather.hourly
    .filter((forecast) => differenceInHours(new Date(), forecast.dt) < 12)
    .find((forecast) => isRainy(forecast));
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

function pushIfPresent(
  arr: ComingUpNotification[], notification: ComingUpNotification | undefined,
) {
  if (notification !== undefined) {
    arr.push(notification);
  }
}

export default function
determineComingUpNotifications(weather: OneCallWeather): ComingUpNotification[] {
  const results: ComingUpNotification[] = [];

  pushIfPresent(results, getUpcomingRainNotification(weather));
  pushIfPresent(results, getSnowTomorrowNotification(weather));

  return results;
}
