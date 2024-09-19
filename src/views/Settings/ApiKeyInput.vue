<template>
  <div>
    <v-text-field
      id="apiKey"
      type="password"
      label="API Key"
      hint="Enter your OpenWeather API Key. If you don\'t have one, you can get one at openweathermap.org"
      persistent-hint
      :value="store.state.apiKey" @input="store.setApiKey">
    </v-text-field>
  </div>
</template>
<script lang="ts" setup>
import { useStore } from '@/store/store'

const store = useStore()

</script>
