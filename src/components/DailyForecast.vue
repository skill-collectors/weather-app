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
export default class DailyForecast extends Vue {
  $store!: Store<RootState>

  get days() {
    return this.$store.state.weather.daily.slice(0, 6);
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
