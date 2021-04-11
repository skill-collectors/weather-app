<template>
  <ul>
    <li v-if="!notifications || notifications.length === 0">Nothing to worry about!</li>
    <li v-else v-for="notification in notifications" :key="notification.text">
      <img :src="notification.iconUrl"/>{{notification.text}}
    </li>
  </ul>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { ComingUpNotification } from '@/services/ComingUpService';

@Component
export default class ComingUpList extends Vue {
  @Prop({ type: Array, default: () => [] }) public notifications!: ComingUpNotification[];
}
</script>

<style scoped>
</style>
