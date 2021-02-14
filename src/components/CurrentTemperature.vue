<template>
  <div>
    <h1>{{Math.round(currentTemperature)}}°</h1>
    <aside>Feels like {{Math.round(currentFeelsLike)}}°</aside>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

const CurrentTemperatureProps = Vue.extend({
  props: {
    currentTemperature: Number,
    currentFeelsLike: Number,
  },
});

@Component
export default class CurrentTemperature extends CurrentTemperatureProps {}
</script>

<style>
* {
  font-weight: bold;
}
h1 {
  font-size: 5rem;
  margin-left: 0;
}
aside {
  font-size: smaller;
}
</style>
