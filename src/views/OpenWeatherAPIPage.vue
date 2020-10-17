<template>
  <main>
    <b-jumbotron header="Open Weather API">
      <p><b-link href="https://openweathermap.org/">Open Weather Map</b-link> - "Weather forecasts, nowcasts and history in fast and elegant way"</p>
    </b-jumbotron>
    <b-container style="width:60%;margin:auto;">
      <p>Enter a city to test out the <b-link href="https://openweathermap.org/current">Current Weather API.</b-link></p>
  <b-row class="my-3" style="width:400px;margin:auto;">
      <b-input-group prepend="City">
            <b-form-input v-model="city" type="text"></b-form-input>
      </b-input-group>
  </b-row>
          <b-button v-on:click="getTheWeather()" variant="secondary">Current Weather</b-button>
      <b-card class="mt-3" header="Response Data">
        <pre class="m-0" style="text-align:left;">{{ output }}</pre>
      </b-card>
    </b-container>
  </main>
</template>
<script>
export default {
  data() {
    return {
      output: null,
      city: 'Minneapolis',
    };
  },
  methods: {
    getTheWeather() {
      const url = 'https://api.openweathermap.org/data/2.5/weather?q='.concat(this.city).concat('&appid=').concat(process.env.VUE_APP_API_ACCESS_KEY);
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.output = data;
          console.log(data.weather);
        }).catch((error) => {
          this.output = error;
          console.log(JSON.stringify(error));
        });
    },
  },
};
</script>
