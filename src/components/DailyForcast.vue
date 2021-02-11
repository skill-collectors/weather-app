<template>
  <ul>
    <li>item</li>
  </ul>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Store } from 'vuex';
import { RootState } from '@/store/types';

@Component
export default class DailyForcast extends Vue {
  $store!: Store<RootState>
}
</script>
<style scoped>

</style>
