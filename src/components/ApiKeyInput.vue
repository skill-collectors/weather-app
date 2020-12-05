<template>
  <b-input :value="apiKey" @input="setApiKey"></b-input>
</template>
<script lang="ts">
import { SET_API_KEY } from '@/store/mutations';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class OpenWeatherSample extends Vue {
  get apiKey() {
    return this.$store.apiKeys.openWeather;
  }

  setApiKey(newKey: string) {
    this.$store.commit(SET_API_KEY, { apiName: 'openWeather', newKey });
  }
}
</script>
