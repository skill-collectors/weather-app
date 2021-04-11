<template>
  <div>
    <b-form-group label="API Key" label-for="apikey">
      <template #description>
        Enter your OpenWeather API Key. If you don\'t have one, you can get one at
        <b-link href="https://openweathermap.org/" target="blank">openweathermap.org</b-link>
      </template>
      <b-input id="apiKey" type="password" :value="apiKey" @input="setApiKey"></b-input>
    </b-form-group>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Store } from 'vuex';
import { SET_API_KEY } from '@/store/mutations';
import { RootState } from '@/store/types';

@Component
export default class ApiKeyInput extends Vue {
  $store!: Store<RootState>

  get apiKey() {
    return this.$store.state.apiKey;
  }

  setApiKey(newKey: string) {
    this.$store.commit(SET_API_KEY, newKey);
  }
}
</script>
