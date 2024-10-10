<template>
  <div>
    <v-text-field
      id="apiKey"
      type="password"
      label="API Key"
      hint="Enter your OpenWeather API Key. If you don't have one, you can get one at openweathermap.org/api after subscribing to One Call API 3.0"
      persistent-hint
      v-model="store.apiKey"></v-text-field>
  </div>
</template>
<script lang="ts" setup>
import { useStore } from '@/store/store'

const store = useStore()

</script>
