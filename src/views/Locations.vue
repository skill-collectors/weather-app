<template>
  <b-container fluid class="d-flex flex-column justify-content-end h-100">
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
    <div class="d-flex align-items-center mt-2">
      <b-button @click="handleTextSearch" variant="primary">
        <b-icon-search></b-icon-search>
      </b-button>
      <search-suggest
        class="flex-grow-1"
        :value="query" @input="handleQueryInput"
        @select="handleSuggestionSelect"
        :list="searchResultNames"
      ></search-suggest>
      <b-link @click="handleDone" class="flex-shrink-1 ml-2">
        Done
      </b-link>
    </div>
    <b-navbar>
      <b-navbar-nav class="mr-auto">
      </b-navbar-nav>
      <b-navbar-nav>
        <b-nav-form>
        </b-nav-form>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/">
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
import HttpError from '@/services/HttpError';

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
    if (this.$store.getters.hasLocation) {
      this.query = this.$store.getters.locationDisplayName;
      this.$router.push('/');
    }
  }

  handleDone() {
    if (this.$store.getters.hasLocation) {
      this.$router.push('/');
    } else {
      this.$bvToast.toast('You need to set a location to continue.', ToastOptions.errorToast);
    }
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
        if (err instanceof HttpError && err.httpStatusCode === 401) {
          this.$router.push('/settings');
        } else {
          this.showError(`could not determine your city from your location. ${err.message}`);
        }
      }
    } catch (err) {
      this.showError(`could not retrieve your location: ${err.message}`);
    }
  }

  async search() {
    if (this.query === '') {
      return;
    }
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
      if (err instanceof HttpError && err.httpStatusCode === 401) {
        this.$router.push('/settings');
      } else {
        this.showError(`could not determine a city for your location: ${err.message}`);
      }
    }
  }

  showError(message: string) {
    this.$bvToast.toast(`I'm sorry, we ${message}`, ToastOptions.errorToast);
  }
}
</script>
<style scoped>
.navbar-dark {
  color: var(--light);
}
</style>
