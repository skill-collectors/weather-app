<template>
  <main>
    <b-jumbotron header="Open Weather API">
      <p><b-link href="https://openweathermap.org/">Open Weather Map</b-link> - "Weather forecasts, nowcasts and history in fast and elegant way"</p>
    </b-jumbotron>
    <b-container>
      <p>Enter a city to test out the <b-link href="https://openweathermap.org/forecast5">Weather Forecast Endpoint.</b-link></p>
    <b-row class="my-3" style="width:400px;margin:auto;">
        <b-input-group prepend="City">
              <b-form-input v-model="city" type="text"></b-form-input>
        </b-input-group>
    </b-row>
    <b-button v-on:click="getTheWeather()" variant="primary">Weather Forecast</b-button>
    <b-row class="my-3">
      <b-col sm="6">
        <b-card class="mt-3" header="Response Data">
          <pre class="m-0" style="text-align:left;">{{ output }}</pre>
        </b-card>
      </b-col>
      <b-col sm="6">
        <b-card no-body class="mt-3" header="Weather Forecast">
        <b-list-group flush v-for="(list, key) of output.list" :key="key">
          <b-list-group-item variant='secondary'>{{list.dt_txt}}</b-list-group-item>
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
import countapi from 'countapi-js';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ApiClass extends Vue {
  output: any = '';

  callCount: number = 0;

  city: string = 'Saint Paul';

  getTheWeather() {
    const url = 'https://api.openweathermap.org/data/2.5/forecast?q='.concat(this.city)
      .concat('&units=imperial')
      .concat('&appid=').concat(process.env.VUE_APP_API_ACCESS_KEY);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.output = data;
        console.log(data.weather);
      }).catch((error) => {
        this.output = error;
        console.log(JSON.stringify(error));
      });
    countapi.hit(process.env.VUE_APP_COUNTER_NAME, 'current-weather')
      .then((result: { value: number; }) => { this.callCount = result.value; });
  }
}
</script>
