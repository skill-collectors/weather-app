<template>
  <b-navbar fixed="bottom" variant="dark" type="dark">
    <b-navbar-nav class="mr-auto">
    </b-navbar-nav>
    <b-navbar-nav @click="$router.push('locations')">
      <b-nav-item v-if="$store.getters.hasLocation">
        <b-icon-search class="mr-2"></b-icon-search>
        {{$store.getters.locationDisplayName}}
      </b-nav-item>
      <b-nav-item v-else>
        <b-button variant="primary">
          Tap here to set your location
        </b-button>
      </b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
      <b-nav-item>
        <settings-modal-toggle></settings-modal-toggle>
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script lang="ts">
import { BIconSearch } from 'bootstrap-vue';
import { Component, Vue } from 'vue-property-decorator';
import SettingsModalToggle from '@/components/BottomBar/SettingsModalToggle.vue';

@Component({
  components: {
    BIconSearch,
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
