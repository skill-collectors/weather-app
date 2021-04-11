<template>
  <div class="d-flex flex-column h-100">
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
    </b-container>
    <div class="flex-grow-1"></div>
    <bottom-bar class="mb-2 mr-3"></bottom-bar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BottomBar from '@/views/Home/BottomBar.vue';
import CurrentTemperature from '@/components/CurrentTemperature.vue';
import DailyForecast from '@/components/DailyForecast.vue';
import HourlyForecast from '@/components/HourlyForecast.vue';
import { RootState } from '@/store/types';
import { Store } from 'vuex';
import ToastOptions from '@/services/ToastOptions';
import { UPDATE_WEATHER } from '@/store/actions';
import HttpError from '@/services/HttpError';

@Component({
  components: {
    CurrentTemperature, DailyForecast, HourlyForecast, BottomBar,
  },
})
export default class Home extends Vue {
  $store!: Store<RootState>

  async mounted() {
    if (!this.$store.getters.hasApiKey) {
      this.$router.push('/settings');
    } else if (!this.$store.getters.hasLocation) {
      this.$router.push('/locations');
    }
    try {
      await this.$store.dispatch(UPDATE_WEATHER);
    } catch (err) {
      if (err instanceof HttpError && err.httpStatusCode === 401) {
        this.$router.push('/settings');
      } else {
        this.$bvToast.toast('I\'m sorry, we couldn\'t load the weather for your location.', ToastOptions.errorToast);
      }
    }
  }
}
</script>
<style scoped>
.home {
  max-width: 30rem;
  margin-top: 2rem;
}
.row {
  padding-top: 1rem;
  padding-bottom: 0.5rem;
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
