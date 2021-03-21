<template>
  <b-navbar fixed="bottom" variant="dark" type="dark">
    <b-navbar-nav class="mr-auto">
    </b-navbar-nav>
    <b-navbar-nav @click="$router.push('locations')">
      <span v-if="$store.getters.hasLocation">{{$store.getters.locationDisplayName}}</span>
      <b-button variant="primary" v-else>
        Tap here to set your location
      </b-button>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
      <settings-modal-toggle></settings-modal-toggle>
    </b-navbar-nav>
  </b-navbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SettingsModalToggle from '@/components/BottomBar/SettingsModalToggle.vue';

@Component({
  components: {
    SettingsModalToggle,
  },
})
export default class BottomBar extends Vue {
}
</script>
<style scoped>
* {
  color: var(--light);
}
</style>
