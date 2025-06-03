<script setup lang="ts">
import { format } from 'date-fns'
import convert from '@/utils/ConversionUtils'
import type { DailyForecast } from '@/store/types'

defineProps<{
  day: DailyForecast
}>()

const formatDay = (dt: number) => format(convert.dtToDate(dt), 'EEEE')
const formatTime = (dt: number) => format(convert.dtToDate(dt), 'h:mm')
const iconToUrl = convert.iconToUrl
</script>
<template>
  <v-card class="my-4">
    <template #prepend>
      {{ formatDay(day.dt) }}
    </template>
    <template #append>
      <img :src="iconToUrl(day.weather[0].icon)" />
      <v-card-title>
        {{ Math.round(day.temp.max) }}° / {{ Math.round(day.temp.min) }}°
      </v-card-title>
    </template>
    <v-card-subtitle>
      {{ day.summary }}
    </v-card-subtitle>
    <v-card-text class="text-no-wrap">
      <v-row no-gutters>
        <v-col>
          <v-icon>mdi-weather-sunset-up</v-icon>
          Sunrise: <strong>{{ formatTime(day.sunrise) }}</strong>
        </v-col>
        <v-col>
          <v-icon>mdi-weather-sunset-down</v-icon>
          Sunset: <strong>{{ formatTime(day.sunset) }}</strong>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <v-icon v-if="day.uvi > 6">mdi-weather-sunny-alert</v-icon>
          <v-icon v-else>mdi-weather-sunny</v-icon>
          UV Index: <strong>{{ Math.round(day.uvi) }}</strong>
        </v-col>
        <v-col>
          <v-icon :style="`transform: rotate(${day.wind_deg}deg)`">mdi-arrow-up</v-icon>
          Wind: <strong>{{ Math.round(day.wind_speed) }}</strong>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <v-icon>mdi-water-percent</v-icon>
          Humidity: <strong>{{ day.humidity }}</strong>
        </v-col>
        <v-col>
          <v-icon>mdi-thermometer-water</v-icon>
          Dew point: <strong>{{ Math.round(day.dew_point) }}</strong>
        </v-col>
      </v-row>
      <v-table density="compact" class="text-caption my-2">
        <thead>
          <tr>
            <th></th>
            <th>Morning</th>
            <th>Afternoon</th>
            <th>Evening</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Temp</td>
            <td>{{ Math.round(day.temp.morn) }}°</td>
            <td>{{ Math.round(day.temp.day) }}°</td>
            <td>{{ Math.round(day.temp.eve) }}°</td>
          </tr>
          <tr>
            <td>Feels like</td>
            <td>{{ Math.round(day.feels_like.morn) }}°</td>
            <td>{{ Math.round(day.feels_like.day) }}°</td>
            <td>{{ Math.round(day.feels_like.eve) }}°</td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
</template>
<style scoped>
td,
th {
  padding: 0 !important;
}
</style>
