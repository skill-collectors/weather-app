import determineComingUpNotifications from '@/services/ComingUpService';
import { OneCallWeather } from '@/store/types';
import { describe, beforeEach, it, expect, vi } from 'vitest'

describe('ComingUpService', () => {
  let weather: OneCallWeather;

  beforeEach(() => {
    weather = {
      current: {
        temp: 0,
        feels_like: 0,
        weather: [{
          description: 'sunny', icon: '03n', id: 800, main: 'Clear',
        }],
      },
      minutely: [{ dt: 0, precipitation: 0 }],
      hourly: [{
        dt: 0,
        temp: 0,
        feels_like: 0,
        weather: [{
          description: '', icon: '', id: 0, main: '',
        }],
      }],
      daily: [{
        dt: 0,
        temp: {
          day: 0, eve: 0, morn: 0, night: 0, min: 0, max: 0,
        },
        feels_like: {
          day: 0, eve: 0, morn: 0, night: 0,
        },
        weather: [{
          description: '', icon: '', id: 0, main: '',
        }],
      }],
    };
  });

  it('finds nothing when the weather is clear', () => {
    // Given
    weather.hourly = [{
      dt: new Date().getTime(),
      temp: 72,
      feels_like: 71,
      weather: [{
        description: 'clear sky', icon: '01d', id: 0, main: 'clear sky',
      }],
    }];

    // When
    const result = determineComingUpNotifications(weather);

    // Then
    expect(result).toHaveLength(0);
  });

  it('finds rain in the next hour', () => {
    // Given
    const oneHourFromNowDt = (Date.now() / 1000) + 3_600;

    weather.hourly = [{
      dt: oneHourFromNowDt,
      temp: 72,
      feels_like: 71,
      weather: [{
        description: 'rain', icon: '10d', id: 0, main: 'Rain',
      }],
    }];

    // When
    const result = determineComingUpNotifications(weather);

    // Then
    expect(result).toHaveLength(1);
  });

  it("does not find upcoming rain if it's already raining", () => {
    // Given
    const oneHourFromNowDt = (Date.now() / 1000) + 3_600;

    weather.current = {
      temp: 0,
      feels_like: 0,
      weather: [{
        description: 'light rain', icon: '10d', id: 0, main: 'Rain',
      }],
    };
    weather.hourly = [{
      dt: oneHourFromNowDt,
      temp: 72,
      feels_like: 71,
      weather: [{
        description: 'rain', icon: '10d', id: 0, main: 'Rain',
      }],
    }];

    // When
    const result = determineComingUpNotifications(weather);

    // Then
    expect(result.find((note) => note.type === 'RAIN')).toBeUndefined();
  });

  it("finds when rain will stop if it's already raining", () => {
    // Given
    const oneHourFromNowDt = (Date.now() / 1000) + 3_600;

    weather.current = {
      temp: 0,
      feels_like: 0,
      weather: [{
        description: 'light rain', icon: '10d', id: 0, main: 'Rain',
      }],
    };
    weather.hourly = [
      {
        dt: oneHourFromNowDt,
        temp: 72,
        feels_like: 71,
        weather: [{
          description: 'rain', icon: '10d', id: 0, main: 'Rain',
        }],
      },
      {
        dt: oneHourFromNowDt + 3_600,
        temp: 72,
        feels_like: 71,
        weather: [{
          description: 'clear', icon: '01d', id: 0, main: 'Clear',
        }],
      },
    ];

    // When
    const result = determineComingUpNotifications(weather);

    // Then
    expect(result.find((note) => note.type === 'STOP_RAIN')).not.toBeUndefined();
  });

  it('finds snow overnight', () => {
    // Given
    vi
      .spyOn(global.Date, 'now')
      .mockImplementationOnce(() => new Date('2020-02-21T19:01:58.135Z').valueOf());

    weather.hourly = [{
      dt: new Date('2020-02-22T06:00:00.00Z').getTime() / 1000,
      temp: 72,
      feels_like: 71,
      weather: [{
        description: 'snow', icon: '13n', id: 0, main: 'Snow',
      }],
    }];

    // When
    const result = determineComingUpNotifications(weather);

    // Then
    expect(result).toHaveLength(1);
  });
});
