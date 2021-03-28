<template>
  <b-container>
    <b-row>
      <b-col cols=12>
        <b-form>
          <api-key-input></api-key-input>
        </b-form>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="11"></b-col>
      <b-col cols="1">
        <b-link to="/">Done</b-link>
      </b-col>
    </b-row>
  </b-container>
</template>
<script type="ts">
import { Component, Vue } from 'vue-property-decorator';
import ApiKeyInput from '@/views/Settings/ApiKeyInput.vue';

@Component({
  components: {
    ApiKeyInput,
  },
})
export default class Settings extends Vue {}
</script>

<style>

</style>
