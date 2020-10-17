<template>
  <main>
    <b-jumbotron header="Open Weather API"></b-jumbotron>
    <b-container>
      <p>"Weather forecasts, nowcasts and history in fast and elegant way"</p>
      <p><b-link href="https://openweathermap.org/">Open Weather Map </b-link></p>

      <b-button v-on:click="getTheWeather()" variant="secondary">Get Weather</b-button>
    </b-container>
  </main>
</template>
<script>
export default {
  data() {
    return {
      city: 'minneapolis',
    };
  },
  methods: {
    getTheWeather() {
      const url = 'https://api.openweathermap.org/data/2.5/weather?q=minneapolis&appid='.concat(process.env.VUE_APP_API_ACCESS_KEY);
      alert(url);
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(JSON.stringify(data));
          alert(JSON.stringify(data));
        }).catch((error) => {
          console.log(JSON.stringify(error));
        });
    },
  },
};
</script>
