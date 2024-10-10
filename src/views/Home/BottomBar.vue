<template>
  <div class="d-flex align-items-center mt-2">
    <div class="flex-grow-1">
      <div>
        <v-icon icon="search" class="mr-2"></v-icon>
        <v-btn to="locations" rounded="xl" color="grey-lighten-3">
          <template v-slot:prepend>
            <v-icon icon="mdi-map-marker-outline"></v-icon>
          </template>
          <template v-if="store.hasLocation">
            {{ store.locationDisplayName }}
          </template>
          <template v-else>
            Tap here to set your location
          </template>
        </v-btn>
      </div>
    </div>
    <v-btn to="/settings" icon="mdi-cog" color="grey-lighten-3"></v-btn>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '@/store/store';

const store = useStore()


</script>
<style scoped></style>
