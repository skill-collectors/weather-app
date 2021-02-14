<template>
  <div>
    <div class="dateTime">{{formattedDateTime}}</div>
    <img v-if="imageSrc" :src="imageSrc"/>
    <div class="temperature" v-if="temperature">{{Math.round(temperature)}}°</div>
    <div class="temperature" v-else-if="high && low">
      {{Math.round(low)}}° / {{Math.round(high)}}°
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { format } from 'date-fns';

@Component
export default class ForecastItem extends Vue {
  @Prop() private dateTime!: Date;

  @Prop() private dateTimeFormat!: string;

  @Prop() private imageSrc?: string;

  @Prop() private temperature?: number;

  @Prop() private high?: number;

  @Prop() private low?: number;

  get formattedDateTime() {
    return format(this.dateTime, this.dateTimeFormat);
  }
}
</script>
<style scoped>
* {
  text-align: center;
  font-size: smaller;
}
.dateTime {
  color: gray;
}
img {
  max-width: 4em;
}
</style>
