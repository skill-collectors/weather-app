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
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Store } from 'vuex';
import { RootState } from '@/store/types';
import ForecastItem from '@/components/ForecastItem.vue';
import openWeatherService from '@/services/openWeatherService';

@Component({
  components: { ForecastItem },
  methods: {
    dtToDate: openWeatherService.dtToDate,
    iconToUrl: openWeatherService.iconToUrl,
  },
})
export default class HourlyForecast extends Vue {
  $store!: Store<RootState>

  get hours() {
    return this.$store.state.weather.hourly.slice(0, 6);
  }
}
</script>
<style scoped>
ul {
  list-style-type: none;
}
li {
  display: inline-block;
}
</style>
