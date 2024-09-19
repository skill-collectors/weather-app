import openWeather from '@/services/openWeatherService'
import convert from '@/utils/ConversionUtils'
import { RootState, GeoDirectResponse } from './types'
import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'


export const useStore = defineStore('store', () => {

  // TODO useLocalStorage

  const state: RootState = reactive({
    apiKey: '',
    location: {
      name: '',
      country: '',
      state: '',
      lat: 0,
      lon: 0
    },
    recentLocations: [],
    weather: {
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
    },
    stats: {
      callCount: 0
    }
  })

  // TODO use local storage

  function setApiKey(newKey: string){
    state.apiKey = newKey
  }

  function setLocation(location: GeoDirectResponse){
    state.recentLocations.push(location)
    // trim oldest entries
    while (state.recentLocations.length > 10) {
      state.recentLocations.shift()
    }
    state.location = location
  }

  function deleteRecentLocation(locationToRemove: GeoDirectResponse) {
    const index = state.recentLocations.findIndex(
      (recent) => recent.lat === locationToRemove.lat && recent.lon === locationToRemove.lon
    )
    if (index !== -1) {
      state.recentLocations.splice(index, 1)
    }
  }

  async function updateWeather() {
    if(hasLocation.value) {
      const { lat, lon } = state.location
      const weather = await openWeather.getOneCallWeather(lat, lon, state.apiKey)
      state.weather = weather
    }
  }

  function updateLocation(location: GeoDirectResponse) {
    deleteRecentLocation(location)
    setLocation(location)
    updateWeather()
  }

  const locationDisplayName = computed(() => {
    if(hasLocation.value) {
      return convert.geoToString(state.location)
    }
    return ''
  })

  const hasApiKey = computed(() => {
    // Consider all 'falsy' values: '', null, or undefined
    return Boolean(state.apiKey)
  })

  const hasLocation = computed(() => {
    const { name, lat, lon } = state.location
    // Consider all 'falsy' values: 0, '', null, undefined
    return Boolean(lat) && Boolean(lon) && Boolean(name)
  })

  const hasWeather = computed(() => {
    return state.weather.current.weather[0].description !== ''
  })


  return {state, setApiKey, updateWeather, updateLocation, deleteRecentLocation, hasWeather, hasApiKey, hasLocation, locationDisplayName}

})
