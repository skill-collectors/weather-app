<template>
  <b-form-group label="API Key" label-for="apikey" description="Enter your OpenWeather API Key">
    <b-input id="apiKey" :value="apiKey" @input="setApiKey"></b-input>
  </b-form-group>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Store } from 'vuex';
import { SET_API_KEY } from '../store/mutations';
import { RootState } from '../store/types';
import OPEN_WEATHER from '../store/apiNames';

@Component
export default class OpenWeatherSample extends Vue {
  $store!: Store<RootState>

  get apiKey() {
    return this.$store.state.apiKeys[OPEN_WEATHER];
  }

  setApiKey(newKey: string) {
    this.$store.commit(SET_API_KEY, { apiName: OPEN_WEATHER, newKey });
  }
}
</script>
