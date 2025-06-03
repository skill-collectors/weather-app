<template>
  <v-list density="compact">
    <v-list-subheader>Today's forecast</v-list-subheader>
    <v-list-item v-for="hour in hours" :key="hour.dt">
      <template #prepend>
        <img :src="iconToUrl(hour.weather[0].icon)" />
      </template>
      <v-list-item-title>
        {{ formatTime(hour.dt) }}
      </v-list-item-title>
      <v-list-item-subtitle>
        {{ hour.weather[0].description }}
      </v-list-item-subtitle>
      <template #append>
        {{ Math.round(hour.temp) }}° / {{ Math.round(hour.feels_like) }}°
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

const formatTime = (dt: number) => format(convert.dtToDate(dt), 'ha')

const iconToUrl = convert.iconToUrl

const hours = computed(() => {
  return store.weather.hourly.slice(0, 24)
})
</script>
