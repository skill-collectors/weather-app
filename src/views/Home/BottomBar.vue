<script setup lang="ts">
const value = defineModel()
</script>
<template>
  <v-bottom-navigation>
    <v-btn @click="value = 'now'">
      <span>Now</span>
      <v-icon>mdi-clock-outline</v-icon>
    </v-btn>
    <v-btn @click="value = 'week'">
      <span>7 day</span>
      <v-icon>mdi-calendar-week-outline</v-icon>
    </v-btn>
    <v-btn @click="value = 'weekend'">
      <span>Weekend</span>
      <v-icon>mdi-calendar-weekend-outline</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
