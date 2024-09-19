<template>
  <div>
    <div class="dateTime">{{ formattedDateTime }}</div>
    <img v-if="imageSrc" :src="imageSrc" />
    <div class="temperature" v-if="temperature">{{ Math.round(temperature) }}°</div>
    <div class="temperature" v-else-if="high && low">
      {{ Math.round(low) }}° / {{ Math.round(high) }}°
    </div>
  </div>
</template>
<script lang="ts" setup>
import { format } from 'date-fns'
import { computed } from 'vue'

const props = defineProps({
  dateTime: { type: Date, required: true },
  dateTimeFormat: { type: String, required: true },
  imageSrc: { type: String },
  temperature: { type: Number },
  high: { type: Number },
  low: { type: Number },
})

const formattedDateTime = computed(() => {
  return format(props.dateTime, props.dateTimeFormat)
})
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
