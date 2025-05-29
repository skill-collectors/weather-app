<script lang="ts" setup>
import { format } from 'date-fns'
import convert from '@/utils/ConversionUtils'
import { useStore } from '@/store/store'
import { computed } from 'vue'

const formatDay = (dt) => format(convert.dtToDate(dt), 'EEEE')
const iconToUrl = convert.iconToUrl

const store = useStore()

const days = computed(() => {
  const fridayIndex = store.weather.daily.findIndex((day) => formatDay(day.dt) === 'Friday')
  if (fridayIndex === 6) {
    // Today is Saturday. Show Saturday/Sunday
    return store.weather.daily.slice(0, 2)
  } else {
    return store.weather.daily.slice(fridayIndex, fridayIndex + 3)
  }
})
</script>
<template>
  <h4>This weekend</h4>
  <v-card v-for="day in days" :key="day.dt" class="my-2">
    <template #prepend>
      <img :src="iconToUrl(day.weather[0].icon)" />
      {{ formatDay(day.dt) }}
    </template>
    <v-card-title> {{ Math.round(day.temp.max) }}° / {{ Math.round(day.temp.min) }}° </v-card-title>
    <v-card-text>
      {{ day.summary }}
    </v-card-text>
  </v-card>
</template>
