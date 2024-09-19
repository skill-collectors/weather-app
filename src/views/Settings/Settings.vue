<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-form>
          <api-key-input></api-key-input>
        </v-form>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="10"></v-col>
      <v-col cols="1">
        <a href="#" @click="handleDone">Done</a>
      </v-col>
    </v-row>
  </v-container>
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
