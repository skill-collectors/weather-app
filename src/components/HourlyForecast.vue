<template>
  <ul>
    <li v-for="hour in hours" :key="hour.dt">
      <forecast-item
        class="m-2"
        :dateTime="dtToDate(hour.dt)"
        dateTimeFormat="ha"
        :imageSrc="iconToUrl(hour.weather[0].icon)"
        :temperature="hour.temp"
      ></forecast-item>
    </li>
  </ul>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Store } from 'vuex'
import { RootState } from '@/store/types'
import ForecastItem from '@/components/ForecastItem.vue'
import convert from '@/utils/ConversionUtils'

@Component({
  components: { ForecastItem },
  methods: {
    dtToDate: convert.dtToDate,
    iconToUrl: convert.iconToUrl
  }
})
export default class HourlyForecast extends Vue {
  $store!: Store<RootState>

  get hours() {
    return this.$store.state.weather.hourly
  }
}
</script>
<style scoped>
ul {
  list-style-type: none;
  padding-left: 0;
  margin-bottom: 0;
  width: 100%;
  overflow-x: scroll;
  scrollbar-width: none; /* Firefox */
}
ul::-webkit-scrollbar {
  display: none; /* Webkit */
}
li {
  display: inline-block;
  width: 20%;
}
</style>
