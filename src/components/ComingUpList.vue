<template>
  <v-list bg-color="grey-lighten-3">
    <v-list-subheader>Coming up...</v-list-subheader>
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
