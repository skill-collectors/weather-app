<template>
  <v-container fluid class="d-flex flex-column justify-content-end h-100">
    <v-list-group>
      <v-list-group-item class="d-flex align-items-center" @click="handleGeoSearch" button>
        <span>
          <v-icon icon="gear"></v-icon>
          Your current location
        </span>
      </v-list-group-item>
      <v-list-group-item
        class="d-flex justify-content-between align-items-center"
        button
        @click="setLocation(location)"
        v-for="location in recentLocations"
        :key="location.key"
      >
        <span>
          <v-icon icon="geo"></v-icon>
          {{ location.displayName }}
        </span>
        <v-icon icon="trash" @click.stop="deleteRecentLocation(location)"></v-icon>
      </v-list-group-item>
    </v-list-group>
    <div class="d-flex align-items-center mt-2">
      <v-btn @click="handleTextSearch" class="search-button">
        <v-icon icon="search"></v-icon>
      </v-btn>
      <search-suggest
        ref="search"
        class="flex-grow-1"
        :value="query"
        @input="handleQueryInput"
        @select="handleSuggestionSelect"
        :list="searchResultNames"
      ></search-suggest>
      <v-btn @click="handleClearQuery" class="clear-button"> x </v-btn>
      <a @click="handleDone" class="flex-shrink-1 ml-2"> Done </a>
    </div>
  </v-container>
</template>
<script lang="ts" setup>
import convert from '@/utils/ConversionUtils'
import openWeather from '@/services/openWeatherService'
import locationService from '@/services/GeoLocationService'
import type { GeoDirectResponse, GeolocationCoordinates } from '@/store/types'
import HttpError from '@/services/HttpError'
import { computed, ref, useTemplateRef } from 'vue'
import type {Ref} from 'vue'
import { useStore } from '@/store/store'
import { useRouter } from 'vue-router'
import SearchSuggest from '@/components/SearchSuggest.vue'

const store = useStore()
const router = useRouter()

type SearchSuggestType = InstanceType<typeof SearchSuggest>

const searchRef = useTemplateRef<SearchSuggestType>('search')

const query: Ref<string> = ref(store.locationDisplayName)
const searchResults: Ref<GeoDirectResponse[]> = ref([])
const searchTimeout: Ref<number|undefined> = ref()

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
    // TODO toast
    //this.$bvToast.toast('You need to set a location to continue.', ToastOptions.errorToast)
  }
}

function deleteRecentLocation(location: GeoDirectResponse) {
  store.deleteRecentLocation(location)
}

function handleQueryInput(newQuery: string) {
  query.value = newQuery
  // debounce the input and only perform a search every 1 seconds
  window.clearTimeout(searchTimeout.value)
  searchTimeout.value = window.setTimeout(search, 1_000)
}

async function handleSuggestionSelect(selectedValue: string) {
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

function handleTextSearch() {
  search()
}

function handleClearQuery() {
  query.value = ''
  searchResults.value = [];
  (searchRef.value?.$refs.input as HTMLInputElement).focus()
}

const searchResultNames = computed(() => {
  return searchResults.value.map(convert.geoToString)
})

async function handleGeoSearch() {
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
    if(err instanceof Error) {
      showError(`could not retrieve your location: ${err.message}`)
    }
  }
}

async function search() {
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
    } else if(err instanceof Error) {
      showError(`could not determine a city for your location: ${err.message}`)
    }
  }
}

function showError(message: string) {
  console.log(message)
  // TODO toast
  //this.$bvToast.toast(`I'm sorry, we ${message}`, ToastOptions.errorToast)
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
