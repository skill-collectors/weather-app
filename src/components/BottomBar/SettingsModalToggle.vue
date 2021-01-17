<template>
  <span>
    <b-icon-gear-fill v-b-modal.settings-modal variant="secondary" font-scale="2" class="ml-2">
    </b-icon-gear-fill>
    <b-modal id="settings-modal" cancel-disabled>
      <settings-control></settings-control>
      <!-- Use templates to omit 'x' and 'Cancel' buttons -->
      <template #modal-header="{}"><h5>Settings</h5></template>
      <template #modal-footer="{ ok }">
        <b-button variant="primary" @click="ok()">OK</b-button>
      </template>
    </b-modal>
  </span>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { BIconGearFill } from 'bootstrap-vue';
import SettingsControl from '@/components/BottomBar/SettingsControl.vue';

@Component({
  components: {
    BIconGearFill,
    SettingsControl,
  },
})
export default class SettingsModalToggle extends Vue {
}
</script>
