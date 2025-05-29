<template>
  <v-row class="hero-row">
    <v-col>
      <current-temperature
        :currentTemperature="store.weather.current.temp"
        :currentFeelsLike="store.weather.current.feels_like"
      ></current-temperature>
    </v-col>
    <v-col>
      <img
        @click="handleHeroIconClick"
        v-if="store.hasWeather"
        :src="iconToUrl(store.weather.current.weather[0].icon, '@2x')"
      />
    </v-col>
  </v-row>
  <v-row v-if="comingUpNotifications.length > 0" class="coming-up-row">
    <v-col>
      <coming-up-list :notifications="comingUpNotifications"></coming-up-list>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <hourly-forecast class="forecast-list"></hourly-forecast>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import CurrentTemperature from '@/components/CurrentTemperature.vue'
import DailyForecast from '@/components/DailyForecast.vue'
import ComingUpList from '@/components/ComingUpList.vue'
import HourlyForecast from '@/components/HourlyForecast.vue'
import determineComingUpNotifications from '@/services/ComingUpService'
import type { ComingUpNotification } from '@/services/ComingUpService'
import convert from '@/utils/ConversionUtils'
import HttpError from '@/services/HttpError'
import { differenceInMilliseconds } from 'date-fns'
import { useRouter } from 'vue-router'
import { onMounted, onUnmounted, ref } from 'vue'
import type { Ref } from 'vue'
import { useStore } from '@/store/store'

const store = useStore()

const router = useRouter()

// 15 minutes seems like a reasonable minimum refresh interval
const MIN_REFRESH_INTERVAL_MS = 15 * 60 * 1000

// Refresh after an hour to keep data from getting too out of date
const MAX_REFRESH_INTERVAL_MS = 60 * 60 * 1000

const comingUpNotifications: Ref<ComingUpNotification[]> = ref([])

// Initialize so that a refresh is "due" immediately
let lastRefreshTime: Date = new Date(Date.now() - MIN_REFRESH_INTERVAL_MS)

let autoRefreshTimeout!: number

let autoRefreshInterval!: number

const iconToUrl = convert.iconToUrl

async function updateWeather() {
  try {
    await store.updateWeather()
    lastRefreshTime = new Date()
  } catch (err) {
    if (err instanceof HttpError && err.httpStatusCode === 401) {
      router.push('/settings')
      store.addMessage('Your API key was unauthorized.')
    } else {
      store.addMessage("I'm sorry, we couldn't load the weather for your location.")
    }
  }
  comingUpNotifications.value.splice(
    0,
    comingUpNotifications.value.length,
    ...determineComingUpNotifications(store.weather)
  )
}

onMounted(() => {
  if (!store.hasApiKey) {
    router.push('/settings')
  } else if (!store.hasLocation) {
    router.push('/locations')
  }

  document.addEventListener('visibilitychange', handleVisibilityChange)
  handleVisibilityChange() // do initial refresh and start the cooldown
})

onUnmounted(() => {
  document.removeEventListener('visibilitychange', handleVisibilityChange)
})

async function handleVisibilityChange() {
  if (document.visibilityState === 'visible') {
    const msSinceLastRefresh = differenceInMilliseconds(new Date(), lastRefreshTime)

    // Update now only if we haven't since the min interval
    if (msSinceLastRefresh > MIN_REFRESH_INTERVAL_MS) {
      await updateWeather()

      // Start auto-refreshing every max interval
      autoRefreshInterval = window.setInterval(updateWeather, MAX_REFRESH_INTERVAL_MS)
    } else {
      const nextAutoRefreshMs = MAX_REFRESH_INTERVAL_MS - msSinceLastRefresh
      // Manually schedule the next refresh to happen max interval ms after
      // the most recent refresh
      autoRefreshTimeout = window.setTimeout(async () => {
        await updateWeather()
        // Start auto-refreshing every max interval
        autoRefreshInterval = window.setInterval(updateWeather, MAX_REFRESH_INTERVAL_MS)
      }, nextAutoRefreshMs)
    }
  } else {
    // Don't auto-refresh when the page is not visible
    window.clearTimeout(autoRefreshTimeout)
    window.clearInterval(autoRefreshInterval)
  }
}
</script>
