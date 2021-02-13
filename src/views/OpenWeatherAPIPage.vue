<template>
  <main>
    <b-jumbotron header="Open Weather API">
      <p><b-link href="https://openweathermap.org/">Open Weather Map</b-link> - "Weather forecasts, nowcasts and history in fast and elegant way"</p>
    </b-jumbotron>
    <b-container>
      <api-key-input></api-key-input>
      <p>Enter a city or leave blank to use coordinates and test out the <b-link href="https://openweathermap.org/forecast5">Weather Forecast</b-link> and <b-link href="https://openweathermap.org/current">Current Weather</b-link> Endpoints.</p>
    <b-row class="my-3" style="width:600px;margin:auto;text-align:center;">
        <b-input-group prepend="City">
          <b-form-input id="city" :value="city" @input="setCity" type="text"></b-form-input>
        </b-input-group>
        <p style='margin:inherit;'>Or</p>
        <b-input-group prepend="Longitude" append="Latitude">
              <b-form-input id="longitude" :value="lon" @input="setLon" type="number" step=".001">
              </b-form-input>
              <b-form-input id="latitude" :value="lat" @input="setLat" type="number" step=".001">
              </b-form-input>
        </b-input-group>
    </b-row>
    <b-button id="weatherForecast" squared v-on:click="getForecastWeather" variant="info">
      Weather Forecast
    </b-button>
    <b-button id="currentWeather" squared v-on:click="getCurrentWeather" variant="primary">
      Current Weather
    </b-button>
    <b-row class="my-3">
      <b-col sm="6">
        <b-card class="mt-3" header="Response Data">
          <pre class="m-0" style="text-align:left;">{{ output }}</pre>
        </b-card>
      </b-col>
      <b-col sm="6">
        <b-card no-body class="mt-3" header="Weather Forecast">
        <b-list-group flush v-for="(list, key) of output.list" :key="key">
          <b-list-group-item class="dateHeader" variant='secondary'>
            {{list.dt_txt}}
          </b-list-group-item>
          <b-list-group-item class="flex-column align-items-start">
            <div style='padding-left:20%' class="d-flex">
              <h5 style='align-self:center'>
                {{ list.weather[0].description.charAt(0).toUpperCase()
                  + list.weather[0].description.slice(1)}}</h5>
              <img :src="'http://openweathermap.org/img/wn/'+ list.weather[0].icon + '@2x.png'" alt="">
            </div>
          </b-list-group-item>
          <p>Low: {{list.main.temp_min }} °F
            ~  High: {{list.main.temp_max }} °F</p>
        </b-list-group>
        </b-card>
      </b-col>
    </b-row>
          <p>This endpoint has been called {{$store.state.stats.callCount}} times.</p>
    </b-container>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { Store } from 'vuex';
import { RootState } from '@/store/types';
import ApiKeyInput from '@/components/BottomBar/ApiKeyInput.vue';
import openWeatherService from '@/services/openWeatherService';
import { SET_CITY, SET_LAT, SET_LON } from '../store/mutations';

@Component({
  components: {
    ApiKeyInput,
  },
})
export default class OpenWeatherSample extends Vue {
  $store!: Store<RootState>

  output: object = {};

  get lat(): number {
    return this.$store.state.location.lat ?? 0;
  }

  setLat(lat: string) {
    this.$store.commit(SET_LAT, { lat });
  }

  get lon(): number {
    return this.$store.state.location.lon ?? 0;
  }

  setLon(lon: string) {
    this.$store.commit(SET_LON, { lon });
  }

  get city(): string {
    return this.$store.state.location.city ?? 'Saint Paul';
  }

  setCity(city: string) {
    this.$store.commit(SET_CITY, { city });
  }

  async getForecastWeather() {
    if (this.city !== '') {
      this.output = await openWeatherService.getForecastForCity(this.city);
    } else {
      this.output = await openWeatherService.getForecastForCoordinate(this.lat, this.lon);
    }
  }

  async getCurrentWeather() {
    if (this.city !== '') {
      this.output = await openWeatherService.getCurrentForCity(this.city);
    } else {
      this.output = await openWeatherService.getCurrentForCoordinate(this.lat, this.lon);
    }
  }
}
</script>
