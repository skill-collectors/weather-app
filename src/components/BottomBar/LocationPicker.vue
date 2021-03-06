<template>
  <b-input-group>
    <b-input-group-prepend>
      <b-button variant="primary" @click="handleSearch"><b-icon-search></b-icon-search></b-button>
    </b-input-group-prepend>
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

import {
  SET_CITY, SET_LAT, SET_LON, SET_WEATHER,
} from '@/store/mutations';
import { BIconSearch, BIconGeoAltFill } from 'bootstrap-vue';
import openWeatherService, { GeoDirectResponse } from '@/services/openWeatherService';
import geolocationService from '@/services/GeoLocationService';
import { OneCallWeather } from '@/store/types';

@Component({
  components: { BIconSearch, BIconGeoAltFill },

})
export default class LocationPicker extends Vue {
  get city(): string {
    return this.$store.state.location.city || 'Saint Paul';
  }

  setCity(city: string) {
    this.$store.commit(SET_CITY, { city });
  }

  async getCurrentCity() {
    try {
      const coords = await geolocationService.getCurrentPosition();
      this.$store.commit(SET_LAT, coords.latitude);
      this.$store.commit(SET_LON, coords.longitude);
      // This might not be the best approach to displaying the City name and
      // the converstion from coords to city might be alittle off
      // TODO: We could remove the city setting all together and blank out
      // the city since they are searching by coordinates and may not be in a city
      try {
        const location: GeoDirectResponse[] = await openWeatherService
          .searchCityByCoords(coords.latitude, coords.longitude);
        this.$store.commit(SET_CITY, { city: location[0].name });
        try {
          const weather: OneCallWeather = await openWeatherService
            .getOneCallWeather(coords.latitude, coords.longitude);
          this.$store.commit(SET_WEATHER, weather);
        } catch (err) {
          this.showError(`Could not load the weather for your location. ${err.message}`);
        }
      } catch (err) {
        this.showError(`Could not determine your city from your location. ${err.message}`);
      }
    } catch (err) {
      this.showError(`Could not retrieve your location: ${err.message}`);
    }
  }

  showError(message: string) {
    this.$bvToast.toast(`I'm sorry, there seems to be an issue. ${message}`,
      {
        title: 'Oopsy-Daisy',
        variant: 'danger',
        solid: true,
        toaster: 'b-toaster-top-center',
      });
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
