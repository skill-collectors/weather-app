<template>
  <v-container fluid class="d-flex flex-column justify-content-end h-100">
    <v-list lines="three">
      <v-list-item
        prepend-icon="mdi-crosshairs"
        key="CURRENT_LOCATION"
        class="d-flex align-items-center"
        @click="handleGeoSearch"
      >
        Your current location
      </v-list-item>
      <v-list-item
        prepend-icon="mdi-map-check-outline"
        class="d-flex justify-content-between align-items-center"
        @click="setLocation(location)"
        v-for="location in recentLocations"
        :key="location.key"
      >
        {{ location.displayName }}
        <slot name="append">
          <v-icon
            icon="mdi-trash-can-outline"
            @click.stop="deleteRecentLocation(location)"
          ></v-icon>
        </slot>
      </v-list-item>
    </v-list>
    <div class="d-flex align-items-center mt-2">
      <v-autocomplete
        class="mx-2"
        :search="query"
        @update:search="query = $event"
        :items="searchResultNames"
        @update:model-value="handleSuggestionSelect($event)"
        prepend-icon="mdi-magnify"
        @click:prepend="doSearch"
        append-icon="mdi-close"
        @click:append="handleClearQuery"
      ></v-autocomplete>
      <v-btn @click="handleDone" class="mt-2">Done</v-btn>
    </div>
  </v-container>
</template>
<script lang="ts" setup>
import convert from '@/utils/ConversionUtils'
import openWeather from '@/services/openWeatherService'
import locationService from '@/services/GeoLocationService'
import type { GeoDirectResponse, GeolocationCoordinates } from '@/store/types'
import HttpError from '@/services/HttpError'
import { computed, ref } from 'vue'
import type { Ref } from 'vue'
import { useStore } from '@/store/store'
import { useRouter } from 'vue-router'
import { watchDebounced } from '@vueuse/core'

const store = useStore()
const router = useRouter()

const query: Ref<string> = ref('')
const searchResults: Ref<GeoDirectResponse[]> = ref([])

const recentLocations = computed(() => {
  return store.recentLocations.map((location) => ({
    ...location,
    key: `${location.lat},${location.lon}`,
    displayName: convert.geoToString(location)
  }))
})

async function setLocation(location: GeoDirectResponse) {
  await store.updateLocation(location)
  if (store.hasLocation) {
    query.value = store.locationDisplayName
    router.push('/')
  }
}

function handleDone() {
  if (store.hasLocation) {
    router.push('/')
  } else {
    store.addMessage('You need to set a location to continue.')
  }
}

function deleteRecentLocation(location: GeoDirectResponse) {
  store.deleteRecentLocation(location)
}

async function handleSuggestionSelect(selectedValue: string | null) {
  if (selectedValue === null) {
    return
  }
  const selected = searchResults.value.find(
    (result) => selectedValue === convert.geoToString(result)
  )
  if (selected === undefined) {
    showError("couldn't find the value you selected.")
  } else {
    await setLocation(selected)
  }
  searchResults.value = []
}

function handleClearQuery() {
  query.value = ''
  searchResults.value = []
  // TODO focus on input
}

const searchResultNames = computed(() => {
  const set = new Set()
  const dups = []
  for (const result of searchResults.value) {
    const display = convert.geoToString(result)
    if (set.has(display)) {
      console.log(`${display} is a duplicate!`)
      dups.push(display)
    } else {
      set.add(display)
    }
  }

  const displayValues = []
  for (const result of searchResults.value) {
    let displayValue = convert.geoToString(result)
    if (dups.includes(displayValue)) {
      displayValue = convert.geoToString(result, true)
    }
    displayValues.push(displayValue)
  }
  return displayValues
})

async function handleGeoSearch() {
  console.log('handleGeoSearch')
  try {
    const coords: GeolocationCoordinates = await locationService.getCurrentPosition()
    try {
      const results: GeoDirectResponse[] = await openWeather.searchCityByCoords(
        coords.latitude,
        coords.longitude,
        store.apiKey
      )
      await setLocation(results[0])
    } catch (err) {
      if (err instanceof HttpError && err.httpStatusCode === 401) {
        router.push('/settings')
      } else if (err instanceof Error) {
        showError(`could not determine your city from your location. ${err.message}`)
      }
    }
  } catch (err) {
    if (err instanceof Error) {
      showError(`could not retrieve your location: ${err.message}`)
    }
  }
}

watchDebounced(query, doSearch, { debounce: 1_000 })

async function doSearch() {
  console.log(`doSearch: ${query.value}`)
  if (query.value === '') {
    return
  }
  try {
    const results: GeoDirectResponse[] = await openWeather.searchCoordsByCity(
      query.value,
      store.apiKey
    )
    if (results.length === 0) {
      showError('could not find any cities for your location.')
    } else {
      searchResults.value = results
    }
  } catch (err) {
    if (err instanceof HttpError && err.httpStatusCode === 401) {
      router.push('/settings')
    } else if (err instanceof Error) {
      showError(`could not determine a city for your location: ${err.message}`)
    }
  }
}

function showError(message: string) {
  console.log(message)
  store.addMessage(`I'm sorry, we ${message}`)
}
</script>
<style scoped>
.navbar-dark {
  color: var(--light);
}
.search-button {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.clear-button {
  font-weight: bold;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
