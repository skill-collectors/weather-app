import { HourlyForecast, OneCallWeather } from '@/store/types';
import convert from '@/utils/ConversionUtils';
import { format, differenceInHours, getHours } from 'date-fns';

export interface ComingUpNotification {
  type: string,
  iconUrl: string,
  text: string,
}

function getUpcomingRainNotification(weather: OneCallWeather): ComingUpNotification | undefined {
  const maybeRainy = weather.hourly
    .filter((forecast) => differenceInHours(convert.dtToDate(forecast.dt), new Date()) < 12)
    .find((forecast) => forecast.weather[0].main === 'Rain');
  if (maybeRainy !== undefined) {
    return {
      type: 'RAIN',
      iconUrl: convert.iconToUrl(maybeRainy.weather[0].icon),
      text: `${maybeRainy.weather[0].description} coming up at ${format(convert.dtToDate(maybeRainy.dt), 'ha')}`,
    };
  }
  return undefined;
}

function getSnowTonightNotification(weather: OneCallWeather): ComingUpNotification | undefined {
  const maybeSnowTonight = weather.hourly
    .filter((forecast) => differenceInHours(
      // Date.now() is easier to mock in unit tests than the no-arg Date constructor.
      convert.dtToDate(forecast.dt), new Date(Date.now()),
    ) < 24)
    .filter((forecast) => getHours(forecast.dt) > 20 || getHours(forecast.dt) < 8)
    .find((forecast) => forecast.weather[0].main === 'Snow');
  if (maybeSnowTonight !== undefined) {
    return {
      type: 'SNOW',
      iconUrl: convert.iconToUrl(maybeSnowTonight.weather[0].icon),
      text: 'Snow tonight',
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
  pushIfPresent(results, getSnowTonightNotification(weather));

  return results;
}
