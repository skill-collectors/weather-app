<template>
  <v-list class="py-0 mt-2">
    <v-list-item class="coming-up-item" v-for="notification in props.notifications" :key="notification.text">
      <template v-slot:prepend>
        <img :src="notification.iconUrl" />
      </template>
      {{ notification.text }}
    </v-list-item>
  </v-list>
</template>

<script lang="ts" setup>
import type { ComingUpNotification } from '@/services/ComingUpService';

const props = defineProps<{
  notifications: ComingUpNotification[],
}>()

</script>

<style scoped>
.coming-up-item {
  font-size: smaller;
  list-style-type: none;
  padding-left: 0;
  margin-bottom: 0;
  text-align: left;
  background: #d8d8d8;
}
</style>
