<template>
  <ul>
    <li v-if="!notifications || notifications.length === 0">Nothing to worry about!</li>
    <li v-else v-for="notification in props.notifications" :key="notification.text">
      <img :src="notification.iconUrl" />{{ notification.text }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
import type { ComingUpNotification } from '@/services/ComingUpService';

const props = defineProps<{
  notifications: ComingUpNotification[],
}>()

</script>

<style scoped>
ul {
  font-size: smaller;
  list-style-type: none;
  padding-left: 0;
  margin-bottom: 0;
  text-align: left;
}
li {
  font-weight: normal;
}
</style>
