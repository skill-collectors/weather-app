<template>
  <div class="d-flex align-items-center mt-2">
    <div class="flex-grow-1">
      <div v-if="store.hasLocation">
        <v-icon icon="search" class="mr-2"></v-icon>
        <router-link to="locations">{{ store.locationDisplayName }}</router-link>
      </div>
      <div v-else>
        <v-btn to="locations"> Tap here to set your location </v-btn>
      </div>
    </div>
    <router-link to="/settings"><v-icon icon="gear"></v-icon></router-link>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '@/store/store';

const store = useStore()

</script>
<style scoped></style>
