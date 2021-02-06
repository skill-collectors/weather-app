<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/openWeatherAPI">OpenWeather Sample</router-link>
    </div>
    <router-view/>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BottomBar from '@/components/BottomBar/BottomBar.vue';

@Component({
  components: {
    BottomBar,
  },
})
export default class App extends Vue {}
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
