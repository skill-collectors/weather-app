<template>
  <b-input :value="apiKey" @input="setApiKey"></b-input>
</template>
<script lang="ts">
import { SET_API_KEY } from '@/store/mutations';
import { Component, Vue } from 'vue-property-decorator';
import OPEN_WEATHER from '@/store/apiNames';

@Component
export default class OpenWeatherSample extends Vue {
  get apiKey() {
    return this.$store.apiKeys[OPEN_WEATHER];
  }

  setApiKey(newKey: string) {
    this.$store.commit(SET_API_KEY, { apiName: OPEN_WEATHER, newKey });
  }
}
</script>
