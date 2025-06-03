<script lang="ts" setup>
import UserMessageDisplay from './components/UserMessageDisplay.vue'
import { useStore } from '@/store/store'
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
</script>
<template>
  <v-app id="app">
    <v-app-bar class="d-print-none">
      <v-app-bar-title class="text-center">
        <v-btn to="locations">
          <v-icon>mdi-map-marker-outline</v-icon>
          <span v-if="store.hasLocation">
            {{ store.locationDisplayName }}
          </span>
          <span v-else>Set location</span>
        </v-btn>
      </v-app-bar-title>
      <v-btn @click="toggleTheme">
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>
      <template #append>
        <v-btn to="/settings">
          <v-icon>mdi-cog</v-icon>
        </v-btn>
      </template>
    </v-app-bar>
    <v-main class="print-pt-0">
      <UserMessageDisplay></UserMessageDisplay>
      <v-container max-width="30rem">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>
<style scoped>
@media print {
  .print-pt-0 {
    padding-top: 0;
  }
}
</style>
