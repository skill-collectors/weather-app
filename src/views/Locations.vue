<template>
  <b-container class="locations">
    <h3>Locations</h3>
    <b-navbar fixed="bottom" variant="dark" type="dark">
      <b-navbar-nav class="mr-auto">
      </b-navbar-nav>
      <b-navbar-nav>
        <location-picker></location-picker>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
      </b-navbar-nav>
    </b-navbar>
  </b-container>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LocationPicker from '@/components/BottomBar/LocationPicker.vue';

@Component({
  components: {
    LocationPicker,
  },
})
export default class Locations extends Vue {
}
</script>
<style scoped>
.locations {
  max-width: 30rem;
}
.navbar-dark {
  color: var(--light);
}
</style>
