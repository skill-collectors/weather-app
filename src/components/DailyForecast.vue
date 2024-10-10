<template>
  <ul>
    <li v-for="day in days" :key="day.dt">
      <forecast-item
        class="m-2"
        :dateTime="dtToDate(day.dt)"
        dateTimeFormat="E"
        :imageSrc="iconToUrl(day.weather[0].icon)"
        :high="day.temp.max"
        :low="day.temp.min"
      ></forecast-item>
    </li>
  </ul>
</template>
<script lang="ts" setup>
import ForecastItem from '@/components/ForecastItem.vue'
import convert from '@/utils/ConversionUtils'
import { useStore } from '@/store/store'
import { computed } from 'vue'

const dtToDate = convert.dtToDate
const iconToUrl = convert.iconToUrl

const store = useStore()

const days = computed(() => {
  return store.weather.daily
})
</script>
<style scoped>
ul {
  list-style-type: none;
  padding-left: 0;
  margin-bottom: 0;
  width: 100%;
  overflow-x: scroll;
  scrollbar-width: none; /* Firefox */
}
ul::-webkit-scrollbar {
  display: none; /* Webkit */
}
li {
  display: inline-block;
  width: 20%;
}
</style>
