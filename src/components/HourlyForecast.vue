<template>
  <ul>
    <li v-for="hour in hours" :key="hour.dt">
      <forecast-item
        class="m-2"
        :dateTime="dtToDate(hour.dt)"
        dateTimeFormat="ha"
        :imageSrc="iconToUrl(hour.weather[0].icon)"
        :temperature="hour.temp"
      ></forecast-item>
    </li>
  </ul>
</template>
<script lang="ts" setup>
import ForecastItem from '@/components/ForecastItem.vue'
import convert from '@/utils/ConversionUtils'
import { useStore } from '@/store/store'
import { computed } from 'vue'

const store = useStore()

const iconToUrl = convert.iconToUrl
const dtToDate = convert.dtToDate

const hours = computed(() => {
  return store.weather.hourly
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
