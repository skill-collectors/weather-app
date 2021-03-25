<template>
  <b-container class="locations d-flex flex-column justify-content-end">
    <b-list-group>
      <b-list-group-item
        class="d-flex align-items-center"
        @click="handleGeoSearch"
        button
      >
        <span>
          <b-icon-geo-alt-fill></b-icon-geo-alt-fill>
          Your current location
        </span>
      </b-list-group-item>
      <b-list-group-item
        class="d-flex justify-content-between align-items-center"
        button
        @click="setLocation(location)"
        v-for="location in recentLocations" :key="location.key"
      >
        <span>
          <b-icon-geo></b-icon-geo>
          {{location.displayName}}
        </span>
        <b-icon-trash @click.stop="deleteRecentLocation(location)"></b-icon-trash>
      </b-list-group-item>
    </b-list-group>
    <b-navbar fixed="bottom" variant="dark" type="dark">
      <b-navbar-nav class="mr-auto">
      </b-navbar-nav>
      <b-navbar-nav>
        <b-nav-form>
          <b-button @click="handleTextSearch" variant="primary">
            <b-icon-search></b-icon-search>
          </b-button>
          <search-suggest
            :value="query" @input="handleQueryInput"
            @select="handleSuggestionSelect"
            :list="searchResultNames"
          ></search-suggest>
        </b-nav-form>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item @click="$router.push('/')">
          Done
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </b-container>
</template>
<script lang="ts">
import {
  BIconSearch, BIconGeoAltFill, BIconTrash, BIconGeo,
} from 'bootstrap-vue';
import { Component, Vue } from 'vue-property-decorator';
import SearchSuggest from '@/components/SearchSuggest.vue';
import convert from '@/utils/ConversionUtils';
import openWeather from '@/services/openWeatherService';
import locationService from '@/services/GeoLocationService';
import { GeoDirectResponse, GeolocationCoordinates, RootState } from '@/store/types';
import { Store } from 'vuex';
import ToastOptions from '@/services/ToastOptions';
import { DELETE_RECENT_LOCATION } from '@/store/mutations';
import { UPDATE_LOCATION } from '@/store/actions';

@Component({
  components: {
    BIconSearch,
    BIconGeoAltFill,
    BIconGeo,
    BIconTrash,
    SearchSuggest,
  },
})
export default class Locations extends Vue {
  $store!: Store<RootState>

  private query: string;

  private searchResults: GeoDirectResponse[];

  private searchTimeout!: number;

  constructor() {
    super();
    this.query = this.$store.getters.locationDisplayName;
    this.searchResults = [];
  }

  get recentLocations() {
    return this.$store.state.recentLocations.map((location) => ({
      ...location,
      key: `${location.lat},${location.lon}`,
      displayName: convert.geoToString(location),
    }));
  }

  async setLocation(location: GeoDirectResponse) {
    await this.$store.dispatch(UPDATE_LOCATION, location);
    this.query = this.$store.getters.locationDisplayName;
  }

  deleteRecentLocation(location: GeoDirectResponse) {
    this.$store.commit(DELETE_RECENT_LOCATION, location);
  }

  handleQueryInput(newQuery: string) {
    this.query = newQuery;
    // debounce the input and only perform a search every 1 seconds
    window.clearTimeout(this.searchTimeout);
    this.searchTimeout = window.setTimeout(this.search, 1_000);
  }

  async handleSuggestionSelect(selectedValue: string) {
    const selected = this.searchResults
      .find((result) => selectedValue === convert.geoToString(result));
    if (selected === undefined) {
      this.showError('couldn\'t find the value you selected.');
    } else {
      await this.setLocation(selected);
    }
    this.searchResults = [];
  }

  handleTextSearch() {
    this.search();
  }

  get searchResultNames() {
    return this.searchResults.map(convert.geoToString);
  }

  async handleGeoSearch() {
    try {
      const coords: GeolocationCoordinates = await locationService.getCurrentPosition();
      try {
        const results: GeoDirectResponse[] = await openWeather
          .searchCityByCoords(coords.latitude, coords.longitude, this.$store.state.apiKey);
        await this.setLocation(results[0]);
      } catch (err) {
        this.showError(`could not determine your city from your location. ${err.message}`);
      }
    } catch (err) {
      this.showError(`could not retrieve your location: ${err.message}`);
    }
  }

  async search() {
    try {
      const results: GeoDirectResponse[] = await openWeather
        .searchCoordsByCity(this.query, this.$store.state.apiKey);
      if (results.length === 0) {
        this.showError('could not find any cities for your location.');
      } else if (results.length === 1) {
        await this.setLocation(results[0]);
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
