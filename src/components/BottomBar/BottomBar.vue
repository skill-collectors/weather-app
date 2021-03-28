<template>
  <div class="d-flex align-items-center mt-2">
    <div class="flex-grow-1">
      <div v-if="$store.getters.hasLocation">
        <b-icon-search class="mr-2"></b-icon-search>
        <b-link to="locations">{{$store.getters.locationDisplayName}}</b-link>
      </div>
      <div v-else>
        <b-button variant="primary" to="locations">
          Tap here to set your location
        </b-button>
      </div>
    </div>
    <settings-modal-toggle></settings-modal-toggle>
  </div>
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
</style>
