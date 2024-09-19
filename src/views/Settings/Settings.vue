<template>
  <b-container>
    <b-row>
      <b-col cols="12">
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
<script lang="ts" setup>
import ApiKeyInput from '@/views/Settings/ApiKeyInput.vue'
import openWeatherService from '@/services/openWeatherService'
import HttpError from '@/services/HttpError'
import { useStore } from '@/store/store'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

async function handleDone() {
  if (store.hasApiKey) {
    // TODO toast
    // this.$bvToast.toast(
    //   'You need to set an OpenWeatherMap api key to continue.',
    //   ToastOptions.errorToast
    // )
  } else {
    try {
      await openWeatherService.getOneCallWeather(0, 0, store.state.apiKey)
      router.push('/')
    } catch (err) {
      if (err instanceof HttpError && err.httpStatusCode === 401) {
        // TODO toast
        //this.$bvToast.toast('Looks like that API key is not valid.', ToastOptions.errorToast)
      }
    }
  }
}
</script>

<style></style>
