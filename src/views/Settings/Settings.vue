<template>
  <b-container>
    <b-row>
      <b-col cols=12>
        <b-form>
          <api-key-input></api-key-input>
        </b-form>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="10"></b-col>
      <b-col cols="1">
        <b-link @click="handleDone">Done</b-link>
      </b-col>
    </b-row>
  </b-container>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ApiKeyInput from '@/views/Settings/ApiKeyInput.vue';
import { RootState } from '@/store/types';
import { Store } from 'vuex';
import ToastOptions from '@/services/ToastOptions';
import openWeatherService from '@/services/openWeatherService';
import HttpError from '@/services/HttpError';

@Component({
  components: {
    ApiKeyInput,
  },
})
export default class Settings extends Vue {
  $store!: Store<RootState>

  async handleDone() {
    if (this.$store.state.apiKey === '') {
      this.$bvToast.toast('You need to set an OpenWeatherMap api key to continue.', ToastOptions.errorToast);
    } else {
      try {
        await openWeatherService.getOneCallWeather(0, 0, this.$store.state.apiKey);
        this.$router.push('/');
      } catch (err) {
        if (err instanceof HttpError && err.httpStatusCode === 401) {
          this.$bvToast.toast('Looks like that API key is not valid.', ToastOptions.errorToast);
        }
      }
    }
  }
}
</script>

<style>

</style>
