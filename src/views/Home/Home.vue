<template>
  <div class="d-flex flex-column h-100">
    <b-container class="home">
      <b-row class="hero-row">
        <b-col>
          <current-temperature
            :currentTemperature="store.state.weather.current.temp"
            :currentFeelsLike="store.state.weather.current.feels_like"
          ></current-temperature>
        </b-col>
        <b-col>
          <img
            @click="handleHeroIconClick"
            v-if="store.hasWeather"
            :src="iconToUrl(store.state.weather.current.weather[0].icon, '@2x')"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <h6>Today's forecast</h6>
          <hourly-forecast class="forecast-list"></hourly-forecast>
        </b-col>
      </b-row>
      <b-row v-if="comingUpNotifications.length > 0" class="coming-up-row">
        <b-col>
          <h6>Coming up...</h6>
          <coming-up-list :notifications="comingUpNotifications"></coming-up-list>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <h6>5-day forecast</h6>
          <daily-forecast class="forecast-list"></daily-forecast>
        </b-col>
      </b-row>
    </b-container>
    <div class="flex-grow-1"></div>
    <bottom-bar class="mb-2 mr-3"></bottom-bar>
  </div>
</template>

<script lang="ts" setup>
import BottomBar from '@/views/Home/BottomBar.vue'
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
import { onMounted, onUnmounted } from 'vue'
import { useStore } from '@/store/store'


const store = useStore()

const router = useRouter()

// 15 minutes seems like a reasonable minimum refresh interval
const MIN_REFRESH_INTERVAL_MS = 15 * 60 * 1000

// Refresh after an hour to keep data from getting too out of date
const MAX_REFRESH_INTERVAL_MS = 60 * 60 * 1000

const comingUpNotifications: ComingUpNotification[] = []

// Initialize so that a refresh is "due" immediately
let lastRefreshTime: Date = new Date(Date.now() - MIN_REFRESH_INTERVAL_MS)

let autoRefreshTimeout!: number

let autoRefreshInterval!: number

const iconToUrl = convert.iconToUrl

function handleHeroIconClick() {
  // This is a temporary demo to force the display of a 'coming up' notification
  // It can be removed when we implement the 'details' view for the header, or sooner
  // if desired.
  const demoNotifications = [
    {
      type: 'DEMORAIN',
      iconUrl: convert.iconToUrl('10d'),
      text: 'light rain coming up at 2PM'
    },
    {
      type: 'DEMOSNOW',
      iconUrl: convert.iconToUrl('13n'),
      text: 'snow tonight'
    }
  ]
  demoNotifications.forEach((demoNotification) => {
    const demoIndex = comingUpNotifications.findIndex(
      (notification) => notification.type === demoNotification.type
    )
    if (demoIndex === -1) {
      comingUpNotifications.push(demoNotification)
    } else {
      comingUpNotifications.splice(demoIndex, 1)
    }
  })
}

async function updateWeather() {
  try {
    await store.updateWeather()
    lastRefreshTime = new Date()
  } catch (err) {
    if (err instanceof HttpError && err.httpStatusCode === 401) {
      router.push('/settings')
    } else {
      /* TODO toast
      this.$bvToast.toast(
        "I'm sorry, we couldn't load the weather for your location.",
        ToastOptions.errorToast
      )
      */
    }
  }
  comingUpNotifications.splice(
    0,
    comingUpNotifications.length,
    ...determineComingUpNotifications(store.state.weather)
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
      autoRefreshInterval = window.setInterval(
        updateWeather,
        MAX_REFRESH_INTERVAL_MS
      )
    } else {
      const nextAutoRefreshMs = MAX_REFRESH_INTERVAL_MS - msSinceLastRefresh
      // Manually schedule the next refresh to happen max interval ms after
      // the most recent refresh
      autoRefreshTimeout = window.setTimeout(async () => {
        await updateWeather()
        // Start auto-refreshing every max interval
        autoRefreshInterval = window.setInterval(
          updateWeather,
          MAX_REFRESH_INTERVAL_MS
        )
      }, nextAutoRefreshMs)
    }
  } else {
    // Don't auto-refresh when the page is not visible
    window.clearTimeout(autoRefreshTimeout)
    window.clearInterval(autoRefreshInterval)
  }
}

</script>
<style scoped>
.home {
  max-width: 30rem;
  margin-top: 1rem;
}
.row {
  padding-top: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid lightgray;
}
.hero-row {
  justify-content: space-evenly;
  padding-bottom: 2rem;
}
.hero-row .col {
  flex-grow: unset;
}
h6 {
  text-align: left;
  font-size: x-small;
  font-weight: bold;
}
.forecast-list {
  white-space: nowrap;
  overflow-x: scroll;
  scrollbar-width: none; /* Firefox */
}
.forecast-list::-webkit-scrollbar {
  display: none; /* Webkit */
}
.coming-up-row {
  background: #d8d8d8;
}
</style>
