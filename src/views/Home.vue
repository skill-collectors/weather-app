<template>
  <b-container class="home">
    <b-row align-h="around">
      <b-col><b-skeleton class="m-auto" type="button" size="lg"></b-skeleton></b-col>
      <b-col><b-skeleton class="m-auto" type="avatar" size="lg"></b-skeleton></b-col>
    </b-row>
    <b-row>
      <b-col><b-skeleton type="text"></b-skeleton></b-col>
    </b-row>
    <b-row>
      <b-col><b-skeleton type="text"></b-skeleton></b-col>
    </b-row>
    <b-row>
      <b-col><b-skeleton type="text"></b-skeleton></b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: { },
})
export default class Home extends Vue {}
</script>
<style scoped>
.row {
  border-bottom: 1px solid gray;
}
</style>
