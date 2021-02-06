<template>
  <div>
    <div>{{formattedDateTime}}</div>
    <img v-if="imageSrc" :src="imageSrc"/>
    <div v-if="temperature">{{temperature}}</div>
    <div v-if="high && low">{{high}} / {{low}}</div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { format } from 'date-fns';

@Component
export default class HelloWorld extends Vue {
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
