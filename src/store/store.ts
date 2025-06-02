import openWeather from '@/services/openWeatherService'
import convert from '@/utils/ConversionUtils'
import type { GeoDirectResponse, OneCallWeather, UserMessage } from './types'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'

export const useStore = defineStore('store', () => {
  const apiKey = useLocalStorage('apiKey', '')
  const location: Ref<GeoDirectResponse> = useLocalStorage('location', {
    name: '',
    country: '',
    state: '',
    lat: 0,
    lon: 0
  })
  const recentLocations: Ref<GeoDirectResponse[]> = useLocalStorage('recentLocations', [])
  const weather: Ref<OneCallWeather> = useLocalStorage('weather', {
    current: {
      temp: 0,
      feels_like: 0,
      weather: [
        {
          description: '',
          icon: '',
          id: 0,
          main: ''
        }
      ]
    },
    minutely: [{ dt: 0, precipitation: 0 }],
    hourly: [
      {
        dt: 0,
        temp: 0,
        feels_like: 0,
        weather: [
          {
            description: '',
            icon: '',
            id: 0,
            main: ''
          }
        ]
      }
    ],
    daily: [
      {
        dt: 0,
        dew_point: 0,
        humidity: 0,
        wind_speed: 0,
        wind_deg: 0,
        uvi: 0,
        sunset: 0,
        sunrise: 0,
        summary: '',
        temp: {
          day: 0,
          eve: 0,
          morn: 0,
          night: 0,
          min: 0,
          max: 0
        },
        feels_like: {
          day: 0,
          eve: 0,
          morn: 0,
          night: 0
        },
        weather: [
          {
            description: '',
            icon: '',
            id: 0,
            main: ''
          }
        ]
      }
    ]
  })

  const messages: Ref<UserMessage[]> = ref([])
  function addMessage(text: string) {
    messages.value = [{ text }, ...messages.value].slice(0, 100)
  }

  function setLocation(newLocation: GeoDirectResponse) {
    recentLocations.value.push(newLocation)
    // trim oldest entries
    while (recentLocations.value.length > 10) {
      recentLocations.value.shift()
    }
    location.value = newLocation
  }

  function deleteRecentLocation(locationToRemove: GeoDirectResponse) {
    const index = recentLocations.value.findIndex(
      (recent) => recent.lat === locationToRemove.lat && recent.lon === locationToRemove.lon
    )
    if (index !== -1) {
      recentLocations.value.splice(index, 1)
    }
  }

  async function updateWeather() {
    if (hasLocation.value) {
      const { lat, lon } = location.value
      const newWeather = await openWeather.getOneCallWeather(lat, lon, apiKey.value)
      weather.value = newWeather
    }
  }

  function updateLocation(location: GeoDirectResponse) {
    deleteRecentLocation(location)
    setLocation(location)
    updateWeather()
  }

  const locationDisplayName = computed(() => {
    if (hasLocation.value) {
      return convert.geoToString(location.value)
    }
    return ''
  })

  const hasApiKey = computed(() => {
    // Consider all 'falsy' values: '', null, or undefined
    return Boolean(apiKey.value)
  })

  const hasLocation = computed(() => {
    const { name, lat, lon } = location.value
    // Consider all 'falsy' values: 0, '', null, undefined
    return Boolean(lat) && Boolean(lon) && Boolean(name)
  })

  const hasWeather = computed(() => {
    return weather.value.current.weather[0].description !== ''
  })

  return {
    apiKey,
    location,
    recentLocations,
    weather,
    messages,
    addMessage,
    updateWeather,
    updateLocation,
    deleteRecentLocation,
    hasWeather,
    hasApiKey,
    hasLocation,
    locationDisplayName
  }
})
