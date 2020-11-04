<template>
  <main>
    <b-jumbotron header="Open Weather API">
      <p><b-link href="https://openweathermap.org/">Open Weather Map</b-link> - "Weather forecasts, nowcasts and history in fast and elegant way"</p>
    </b-jumbotron>
    <b-container>
      <p>Enter a city or leave blank to use coordinates and test out the <b-link href="https://openweathermap.org/forecast5">Weather Forecast</b-link> and <b-link href="https://openweathermap.org/current">Current Weather</b-link> Endpoints.</p>
    <b-row class="my-3" style="width:600px;margin:auto;text-align:center;">
        <b-input-group prepend="City">
              <b-form-input id="city" v-model="city" type="text"></b-form-input>
        </b-input-group>
        <p style='margin:inherit;'>Or</p>
        <b-input-group prepend="Longitude" append="Latitude">
              <b-form-input v-model="lon" type="number"></b-form-input>
              <b-form-input v-model="lat" type="number"></b-form-input>
        </b-input-group>
    </b-row>
    <b-button id="weatherForecast" squared v-on:click="getForecastWeather()" variant="info">
      Weather Forecast
    </b-button>
    <b-button id="currentWeather" squared v-on:click="getCurrentWeather()" variant="primary">
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
          <p>This endpoint has been called {{callCount}} times.</p>
    </b-container>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import OpenWeather from '../services/openWeatherMap';

@Component
export default class OpenWeatherSample extends Vue {
  output: any = '';

  callCount: number = 0;

  city: string = 'Saint Paul';

  lon: string = '';

  lat: string = '';

  getForecastWeather() {
    const openWeather = new OpenWeather();
    if (this.city !== '') {
      this.output = openWeather.getForecastForCity(this.city);
    } else {
      this.output = openWeather.getForecastForCoordinate(this.lat, this.lon);
    }
    this.callCount = openWeather.getCallCountForecast();
  }

  getCurrentWeather() {
    const openWeather = new OpenWeather();
    if (this.city !== '') {
      this.output = openWeather.getCurrentForCity(this.city);
    } else {
      this.output = openWeather.getCurrentForCoordinate(this.lat, this.lon);
    }
    this.callCount = openWeather.getCallCountCurrent();
  }
}
</script>
