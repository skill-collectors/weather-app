<script lang="ts" setup>
import DayCard from '@/components/DayCard.vue'
import { format } from 'date-fns'
import convert from '@/utils/ConversionUtils'
import { useStore } from '@/store/store'
import { computed } from 'vue'

const formatDay = (dt: number) => format(convert.dtToDate(dt), 'EEEE')

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
  <h4 class="d-print-none">This weekend</h4>
  <DayCard v-for="day in days" :key="day.dt" :day="day" class="my-4"></DayCard>
</template>
