<template>
  <main>
    <b-jumbotron header="CSS Demo" lead="A sandbox for demoing Bootstrap"></b-jumbotron>
    <b-container>
      <p>
        This loads 10 random images of Golden Retrievers from
        <b-link href="https://dog.ceo/api">dog.ceo/api</b-link>.
        Ideally, all the images would be the same aspect ratio, but it's good
        enough for a demo. This uses the
        <b-link href="https://bootstrap-vue.org/docs/components/carousel">Carousel</b-link>
        component from bootstrap-vue. </p>
      <b-row align-h="center">
        <!-- "Use 12 columns on mobile, and size down to six columns on 'md'
        (medium) screens and larger". bootstrap-vue has tons of utility props
        like this. -->
        <b-col cols="12" md="6">
          <b-carousel :interval="4000" controls indicators>
            <b-carousel-slide v-for="url in imageUrls" :key="url" :img-src="url"></b-carousel-slide>
          </b-carousel>
        </b-col>
      </b-row>
    </b-container>
  </main>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
  imageUrls:String[] = [];

  async mounted() {
    this.imageUrls = await fetch('https://dog.ceo/api/breed/retriever/golden/images/random/10')
      .then(response => response.json())
      .then(data => data.message);
  }
}

</script>
