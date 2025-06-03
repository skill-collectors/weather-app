<script lang="ts" setup>
import ApiKeyInput from '@/views/Settings/ApiKeyInput.vue'
import openWeatherService from '@/services/openWeatherService'
import HttpError from '@/services/HttpError'
import { useStore } from '@/store/store'
import { useRouter } from 'vue-router'
import { useTheme } from 'vuetify'
import { onMounted } from 'vue'
import { useLocalStorage } from '@vueuse/core'

const theme = useTheme()

const themeName = useLocalStorage('theme', 'light')

function toggleTheme() {
  themeName.value = theme.global.current.value.dark ? 'light' : 'dark'
  theme.global.name.value = themeName.value
}

onMounted(() => {
  theme.global.name.value = themeName.value
})

const store = useStore()
const router = useRouter()

async function handleDone() {
  if (store.hasApiKey) {
    try {
      await openWeatherService.getOneCallWeather(0, 0, store.apiKey)
      router.push('/')
    } catch (err) {
      if (err instanceof HttpError && err.httpStatusCode === 401) {
        store.addMessage('Looks like that API key is not valid.')
      }
    }
  } else {
    store.addMessage('You need to set an OpenWeatherMap api key to continue.')
  }
}
</script>

<template>
  <v-row>
    <v-col cols="12">
      <v-form>
        <api-key-input></api-key-input>
      </v-form>
    </v-col>
  </v-row>
  <v-row justify="end" class="text-right">
    <v-col>
      <v-btn @click="toggleTheme">
        <v-icon>mdi-theme-light-dark</v-icon>
        <span>Toggle dark mode</span>
      </v-btn>
    </v-col>
  </v-row>
  <v-row justify="end" class="text-right">
    <v-col>
      <v-btn @click="handleDone">Done</v-btn>
    </v-col>
  </v-row>
</template>
