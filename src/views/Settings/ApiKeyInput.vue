<template>
  <div>
    <b-form-group label="API Key" label-for="apikey">
      <template #description>
        Enter your OpenWeather API Key. If you don\'t have one, you can get one at
        <b-link href="https://openweathermap.org/" target="blank">openweathermap.org</b-link>
      </template>
      <b-input id="apiKey" type="password" :value="store.state.apiKey" @input="store.setApiKey"></b-input>
    </b-form-group>
  </div>
</template>
<script lang="ts" setup>
import { useStore } from '@/store/store'

const store = useStore()

</script>
