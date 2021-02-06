<template>
  <div>
    <div>{{currentTemperature}}°</div>
    <div>Feels like {{currentFeelsLike}}°</div>
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

</style>
