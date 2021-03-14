<template>
  <b-container class="locations">
    <h3>Locations</h3>
    <b-navbar fixed="bottom" variant="dark" type="dark">
      <b-navbar-nav class="mr-auto">
        <b-button @click="handleTextSearch" variant="primary">
          <b-icon-search></b-icon-search>
        </b-button>
      </b-navbar-nav>
      <b-navbar-nav>
        <search-suggest
          :value="query" @input="handleQueryInput"
          @select="handleSuggestionSelect"
          :list="searchResults"
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
import { BIconSearch, BIconGeoAltFill } from 'bootstrap-vue';
import { Component, Vue } from 'vue-property-decorator';
import SearchSuggest from '@/components/SearchSuggest.vue';

@Component({
  components: {
    BIconSearch,
    BIconGeoAltFill,
    SearchSuggest,
  },
})
export default class Locations extends Vue {
  private query: string = '';

  private searchResults: string[] = [];

  private searchTimeout!: number;

  handleQueryInput(newQuery: string) {
    this.query = newQuery;
    // debounce the input and only perform a search every 2 seconds
    window.clearTimeout(this.searchTimeout);
    this.searchTimeout = window.setTimeout(this.search, 2_000);
  }

  handleSuggestionSelect(selectedValue: string) {
    this.query = selectedValue;
    this.searchResults = [];
  }

  handleTextSearch() {
    this.search();
  }

  handleGeoSearch() {
    this.query = 'Springfield';
  }

  search() {
    this.searchResults = ['Springfield, IL, USA', 'Springfield, MI, USA'];
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
