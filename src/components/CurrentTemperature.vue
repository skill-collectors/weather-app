<template>
  <div>
    <h1>{{ Math.round(props.currentTemperature) }}°</h1>
    <aside>Feels like {{ Math.round(props.currentFeelsLike) }}°</aside>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps({
  currentTemperature: { type: Number, required: true },
  currentFeelsLike: { type: Number, required: true },
})
</script>

<style>
h1 {
  font-size: 5rem;
  margin-left: 0;
  margin-bottom: 0;
  font-weight: bold;
  line-height: 1;
  text-align: left;
}
aside {
  font-size: smaller;
  font-weight: bold;
  text-align: left;
}
</style>
