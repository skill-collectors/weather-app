<template>
  <div id="app">
    <UserMessageDisplay></UserMessageDisplay>
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import UserMessageDisplay from './components/UserMessageDisplay.vue'
</script>
<style lang="scss">
#app {
  height: 100vh;
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
