<template>
  <main>

    <b-container>
    <b-row class="my-3" style="width:800px;margin:auto;text-align:center;">
        <b-input-group prepend="Longitude" append="Latitude">
              <b-form-input id="longitude" v-model="lon" type="number"></b-form-input>
              <b-button id="currentLoc" squared v-on:click="getLocation()" variant="primary">
                Current Location
              </b-button>
              <b-form-input id="latitude" v-model="lat" type="number"></b-form-input>
        </b-input-group>
    </b-row>
    <b-button id="weatherForecast" squared v-on:click="getForecastWeather()" variant="info">
      Weather Forecast
    </b-button>
    <b-row class="my-12">
      <b-col sm="12">
        <b-card no-body class="mt-3" header="Weather Forecast">

        <ul id="forcastList" class="list-inline"
          style="display:flex;flex-wrap:nowrap;overflow-x:auto;">
          <!-- webkit-overflow-scrolling:touch; -->
          <li class="list-inline-item" v-for="(list, key) of output.daily" :key="key">
          <b-list-group-item class="dateHeader" variant='secondary'>
            {{list.dt}}
          </b-list-group-item>
          <b-list-group-item class="flex-column align-items-start">
            <img :src="'http://openweathermap.org/img/wn/'+ list.weather[0].icon + '@2x.png'" alt="">
            <p style='align-self:center'>
                {{ list.weather[0].description.charAt(0).toUpperCase()
                  + list.weather[0].description.slice(1)}}</p>
            <p>{{Math.round(list.temp.min)}} /
            {{Math.round(list.temp.max)}} °F</p>
          </b-list-group-item>

          </li>
        </ul>
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
  output: object = {};

  callCount: number = 0;

  city: string = 'Saint Paul';

  lon: string = '';

  lat: string = '';

  async getForecastWeather() {
    const openWeather = new OpenWeather();
    this.output = await openWeather.getOneCallWeather(this.lat, this.lon);
    this.callCount = openWeather.getCallCountOneCall();
  }

  async getLocation() {
    const success = (position: { coords: { longitude: any; latitude: any; }; }): void => {
      this.lon = String(position.coords.longitude);
      this.lat = String(position.coords.latitude);
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success);
      // navigator.geolocation.watchPosition(success);  - updates the position if it changes
    }
  }

  // Prepopulate the location

  // async mounted() {
  //   string = '';
  //   string = '';

  //   function success(position: { coords: { longitude: any; latitude: any; }; }): void {
  //     longitude = position.coords.longitude;
  //     latitude = position.coords.latitude;
  //   }
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(success);
  //   }
  // }
}
</script>
