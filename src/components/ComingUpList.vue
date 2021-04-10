<template>
  <ul>
    <li v-if="notifications && notifications.length === 0">Nothing to worry about!</li>
    <li v-for="notification in notifications" :key="notification.text">
      <img :src="notification.iconUrl"/>{{notification.text}}
    </li>
  </ul>
</template>

<script lang="ts">
import { Vue, Prop } from 'vue-property-decorator';
import { ComingUpNotification } from '@/services/ComingUpService';

export default class ComingUpList extends Vue {
  @Prop({ type: Array, default: () => [] }) public notifications!: ComingUpNotification[];

  constructor() {
    super();
    this.notifications = [];
  }
}
</script>

<style scoped>
</style>
