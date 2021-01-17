<template>
  <b-input-group prepend="City">
    <b-form-input id="city" :value="city" @input="setCity" type="text" placeholder="St. Paul">
    </b-form-input>
  </b-input-group>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { SET_CITY } from '@/store/mutations';

@Component({
  components: {},
})
export default class BottomBar extends Vue {
  get city(): string {
    return this.$store.state.location.city ?? 'Saint Paul';
  }

  setCity(city: string) {
    this.$store.commit(SET_CITY, { city });
  }
}
</script>
