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
        <h6>Today's forcast</h6>
        <hourly-forcast></hourly-forcast>
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
        <h6>5-day forcast</h6>
        <daily-forcast></daily-forcast>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CurrentTemperature from '@/components/CurrentTemperature.vue';
import DailyForcast from '@/components/DailyForcast.vue';
import HourlyForcast from '@/components/HourlyForcast.vue';

@Component({
  components: { CurrentTemperature, DailyForcast, HourlyForcast },
})
export default class Home extends Vue {}
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
