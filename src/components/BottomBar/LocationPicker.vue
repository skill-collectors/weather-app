/* eslint-disable class-methods-use-this */
<template>
  <b-input-group prepend="City">
    <b-form-input id="city" :value="city" @input="setCity" type="text" placeholder="St. Paul">
    </b-form-input>
     <b-input-group-append>
        <b-button title="Current Location" @click="getCurrentCity" variant="light">
          <b-icon-geo-alt-fill></b-icon-geo-alt-fill>
        </b-button>
     </b-input-group-append>
  </b-input-group>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { SET_CITY, SET_LON, SET_LAT } from '@/store/mutations';
import { BIconGeoAltFill } from 'bootstrap-vue';
import geolocationService from '@/services/GeoLocationService';

@Component({
  components: {
    BIconGeoAltFill,
  },
})
export default class BottomBar extends Vue {
  get city(): string {
    return this.$store.state.location.city || 'Saint Paul';
  }

  setCity(city: string) {
    this.$store.commit(SET_CITY, { city });
  }

  async getCurrentCity() {
    await geolocationService.getCurrentPosition().then((coords) => {
      this.$store.commit(SET_LON, coords.longitude);
      this.$store.commit(SET_LAT, coords.latitude);
    })
      .catch((error) => {
        console.error(error.message);
      });
  }
}
</script>
