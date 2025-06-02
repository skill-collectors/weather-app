<script lang="ts" setup>
import { format } from 'date-fns'
import convert from '@/utils/ConversionUtils'
import { useStore } from '@/store/store'
import { computed } from 'vue'

const formatDay = (dt: number) => format(convert.dtToDate(dt), 'EEEE')
const iconToUrl = convert.iconToUrl

const store = useStore()

const days = computed(() => {
  return store.weather.daily.slice(1)
})
</script>
<template>
  <h4>This week</h4>
  <v-list density="compact">
    <v-list-item v-for="day in days" :key="day.dt">
      <template #prepend>
        <img :src="iconToUrl(day.weather[0].icon)" />
      </template>
      <v-list-item-title>
        {{ formatDay(day.dt) }}
      </v-list-item-title>
      <v-list-item-subtitle>
        {{ day.weather[0].description }}
      </v-list-item-subtitle>
      <template #append>
        {{ Math.round(day.temp.max) }}° / {{ Math.round(day.temp.min) }}°
      </template>
    </v-list-item>
  </v-list>
</template>
