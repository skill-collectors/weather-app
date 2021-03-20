<template>
  <b-container class="locations">
    <h3>Locations</h3>
    <b-navbar fixed="bottom" variant="dark" type="dark">
      <b-navbar-nav class="mr-auto">
        <b-button @click="$router.push('/')" variant="light">
          <b-icon-arrow-left-square-fill></b-icon-arrow-left-square-fill>
        </b-button>
      </b-navbar-nav>
      <b-navbar-nav>
        <b-button @click="handleTextSearch" variant="primary">
          <b-icon-search></b-icon-search>
        </b-button>
      </b-navbar-nav>
      <b-navbar-nav>
        <search-suggest
          :value="query" @input="handleQueryInput"
          @select="handleSuggestionSelect"
          :list="searchResultNames"
        ></search-suggest>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-button title="Current Location" @click="handleGeoSearch" variant="light">
          <b-icon-geo-alt-fill></b-icon-geo-alt-fill>
        </b-button>
      </b-navbar-nav>
    </b-navbar>
  </b-container>
</template>
<script lang="ts">
import { BIconSearch, BIconGeoAltFill, BIconArrowLeftSquareFill } from 'bootstrap-vue';
import { Component, Vue } from 'vue-property-decorator';
import SearchSuggest from '@/components/SearchSuggest.vue';
import openWeather, { GeoDirectResponse } from '@/services/openWeatherService';
import locationService from '@/services/GeoLocationService';
import { GeolocationCoordinates, RootState } from '@/store/types';
import { Store } from 'vuex';
import { SET_CITY, SET_LAT, SET_LON } from '@/store/mutations';
import ToastOptions from '@/services/ToastOptions';

@Component({
  components: {
    BIconSearch,
    BIconGeoAltFill,
    BIconArrowLeftSquareFill,
    SearchSuggest,
  },
})
export default class Locations extends Vue {
  $store!: Store<RootState>

  private query: string = this.$store.state.location.city;

  private searchResults: GeoDirectResponse[] = [];

  private searchTimeout!: number;

  setLocation(location: GeoDirectResponse) {
    const city = openWeather.geoToString(location);
    this.$store.commit(SET_CITY, { city });
    this.$store.commit(SET_LAT, { lat: location.lat });
    this.$store.commit(SET_LON, { lon: location.lon });
    this.query = city;
  }

  handleQueryInput(newQuery: string) {
    this.query = newQuery;
    // debounce the input and only perform a search every 1 seconds
    window.clearTimeout(this.searchTimeout);
    this.searchTimeout = window.setTimeout(this.search, 1_000);
  }

  handleSuggestionSelect(selectedValue: string) {
    const selected = this.searchResults
      .find((result) => selectedValue === openWeather.geoToString(result));
    if (selected === undefined) {
      this.showError('couldn\'t find the value you selected.');
    } else {
      this.setLocation(selected);
    }
    this.searchResults = [];
  }

  handleTextSearch() {
    this.search();
  }

  get searchResultNames() {
    return this.searchResults.map(openWeather.geoToString);
  }

  async handleGeoSearch() {
    try {
      const coords: GeolocationCoordinates = await locationService.getCurrentPosition();
      try {
        const results: GeoDirectResponse[] = await openWeather
          .searchCityByCoords(coords.latitude, coords.longitude);
        this.setLocation(results[0]);
      } catch (err) {
        this.showError(`could not determine your city from your location. ${err.message}`);
      }
    } catch (err) {
      this.showError(`could not retrieve your location: ${err.message}`);
    }
  }

  async search() {
    try {
      const results: GeoDirectResponse[] = await openWeather.searchCoordsByCity(this.query);
      if (results.length === 0) {
        this.showError('could not find any cities for your location.');
      } else if (results.length === 1) {
        this.setLocation(results[0]);
      } else {
        this.searchResults = results;
      }
    } catch (err) {
      this.showError(`could not determine a city for your location: ${err.message}`);
    }
  }

  showError(message: string) {
    this.$bvToast.toast(`I'm sorry, we ${message}`, ToastOptions.errorToast);
  }
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
