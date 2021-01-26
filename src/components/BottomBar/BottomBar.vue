<template>
  <b-navbar fixed="bottom" variant="dark">
    <b-navbar-nav type="dark">
      <location-picker></location-picker>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
      <settings-modal-toggle></settings-modal-toggle>
    </b-navbar-nav>
  </b-navbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LocationPicker from '@/components/BottomBar/LocationPicker.vue';
import SettingsModalToggle from '@/components/BottomBar/SettingsModalToggle.vue';

@Component({
  components: {
    LocationPicker,
    SettingsModalToggle,
  },
})
export default class BottomBar extends Vue {
}
</script>
