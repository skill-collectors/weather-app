<template>
  <b-container class="home">
    <b-row>
      <b-col>
        <current-temperature
          :currentTemperature="$store.state.weather.current.temp"
          :currentFeelsLike="$store.state.weather.current.feels_like"
        ></current-temperature>
      </b-col>
      <b-col><b-skeleton class="m-auto" type="avatar" size="lg"></b-skeleton></b-col>
    </b-row>
    <b-row>
      <b-col>
        <h6>Today's forecast</h6>
        <hourly-forecast></hourly-forecast>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <h6>Coming up</h6>
        <b-skeleton type="text"></b-skeleton>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <h6>5-day forecast</h6>
        <daily-forecast></daily-forecast>
      </b-col>
    </b-row>
    <bottom-bar></bottom-bar>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BottomBar from '@/components/BottomBar/BottomBar.vue';
import CurrentTemperature from '@/components/CurrentTemperature.vue';
import DailyForecast from '@/components/DailyForecast.vue';
import HourlyForecast from '@/components/HourlyForecast.vue';
import { SET_WEATHER } from '@/store/mutations';
import { RootState, OneCallWeather } from '@/store/types';
import { Store } from 'vuex';
import openWeatherService from '@/services/openWeatherService';

@Component({
  components: {
    CurrentTemperature, DailyForecast, HourlyForecast, BottomBar,
  },
})
export default class Home extends Vue {
  $store!: Store<RootState>

  async mounted() {
    if (this.$store.getters.hasLocation) {
      try {
        const { lat, lon } = this.$store.state.location;
        const weather: OneCallWeather = await openWeatherService.getOneCallWeather(lat, lon);
        this.$store.commit(SET_WEATHER, weather);
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>
<style scoped>
.home {
  max-width: 30rem;
}
.row {
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid lightgray;
}
h6 {
  text-align: left;
  font-size: x-small;
  font-weight: bold;
}
.b-skeleton-text {
  min-height: 3rem;
}
</style>
