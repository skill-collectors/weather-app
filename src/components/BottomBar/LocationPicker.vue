<template>
  <b-input-group>
    <b-input-group-prepend>
      <b-button variant="primary" @click="handleSearch"><b-icon-search></b-icon-search></b-button>
    </b-input-group-prepend>
    <b-form-input id="city" :value="city" @input="setCity" type="text" placeholder="St. Paul">
    </b-form-input>
  </b-input-group>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {
  SET_CITY, SET_LAT, SET_LON, SET_WEATHER,
} from '@/store/mutations';
import { BIconSearch } from 'bootstrap-vue';
import openWeatherService, { GeoDirectResponse } from '@/services/openWeatherService';
import { OneCallWeather } from '@/store/types';

@Component({
  components: { BIconSearch },
})
export default class LocationPicker extends Vue {
  get city(): string {
    return this.$store.state.location.city || 'Saint Paul';
  }

  setCity(city: string) {
    this.$store.commit(SET_CITY, { city });
  }

  async handleSearch() {
    const location: GeoDirectResponse[] = await openWeatherService.searchCoordsByCity(this.city);
    if (location.length > 0) {
      this.$store.commit(SET_LAT, { lat: location[0].lat });
      this.$store.commit(SET_LON, { lon: location[0].lon });
      const weather: OneCallWeather = await openWeatherService
        .getOneCallWeather(this.$store.state.location.lat, this.$store.state.location.lon);
      this.$store.commit(SET_WEATHER, weather);
    }
  }
}
</script>
