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
    <b-link to="/settings"><b-icon-gear-fill font-scale="2"></b-icon-gear-fill></b-link>
  </div>
</template>

<script lang="ts">
import { BIconSearch, BIconGearFill } from 'bootstrap-vue';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    BIconSearch,
    BIconGearFill,
  },
})
export default class BottomBar extends Vue {
}
</script>
<style scoped>
</style>
