<template>
  <b-input :value="apiKey" @input="setApiKey"></b-input>
</template>
<script lang="ts">
import { SET_API_KEY } from '@/store/mutations';
import { Component, Vue } from 'vue-property-decorator';
import { Store } from 'vuex';
import RootState from '@/store/types';
import OPEN_WEATHER from '@/store/apiNames';

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
