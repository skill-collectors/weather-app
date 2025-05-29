<template>
  <v-list density="compact" class="pl-2">
    <v-list-header> Today's forecast </v-list-header>
    <v-list-item v-for="hour in hours" :key="hour.dt">
      <template #prepend>
        <img :src="iconToUrl(hour.weather[0].icon)" />
      </template>
      <v-list-item-title>
        {{ formatTime(hour.dt) }}
      </v-list-item-title>
      <v-list-item-subtitle>
        {{ Math.round(hour.temp) }}° (feels like {{ Math.round(hour.feels_like) }}°)
      </v-list-item-subtitle>
      <template #append>
        {{ hour.weather[0].description }}
      </template>
    </v-list-item>
  </v-list>
</template>
<script lang="ts" setup>
import { format } from 'date-fns'
import convert from '@/utils/ConversionUtils'
import { useStore } from '@/store/store'
import { computed } from 'vue'

const store = useStore()

const formatTime = (dt) => format(dtToDate(dt), 'ha')

const iconToUrl = convert.iconToUrl
const dtToDate = convert.dtToDate

const hours = computed(() => {
  return store.weather.hourly.slice(0, 24)
})
</script>
