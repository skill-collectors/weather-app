<template>
  <v-responsive class="overflow-y-scroll" max-height="100vh">
    <v-app id="app">
      <v-app-bar>
        <v-app-bar-title class="text-center">
          <v-btn to="locations">
            <v-icon>mdi-map-marker-outline</v-icon>
            <span v-if="store.hasLocation">
              {{ store.locationDisplayName }}
            </span>
            <span v-else>Set location</span>
          </v-btn>
        </v-app-bar-title>
        <template #append>
          <v-btn to="/settings">
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </template>
      </v-app-bar>
      <v-main>
        <UserMessageDisplay></UserMessageDisplay>
        <v-container max-width="30rem">
          <router-view />
        </v-container>
        <bottom-bar></bottom-bar>
      </v-main>
    </v-app>
  </v-responsive>
</template>

<script lang="ts" setup>
import BottomBar from '@/views/Home/BottomBar.vue'
import UserMessageDisplay from './components/UserMessageDisplay.vue'
import { useStore } from '@/store/store'

const store = useStore()
</script>
