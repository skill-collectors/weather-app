<template>
  <v-list class="pl-2" bg-color="grey-lighten-2">
    <v-list-header>Coming up...</v-list-header>
    <v-list-item
      class="coming-up-item"
      v-for="notification in props.notifications"
      :key="notification.text"
    >
      <template v-slot:prepend>
        <img :src="notification.iconUrl" />
      </template>
      {{ notification.text }}
    </v-list-item>
  </v-list>
</template>

<script lang="ts" setup>
import type { ComingUpNotification } from '@/services/ComingUpService'

const props = defineProps<{
  notifications: ComingUpNotification[]
}>()
</script>
