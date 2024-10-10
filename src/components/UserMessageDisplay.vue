<template>
  <v-snackbar
    location="top"
    :timeout="5_000"
    timer="red-accent-1"
    color="red-darken-4"
    v-model="snackbar">
    {{ store.messages[0].text }}
  </v-snackbar>
</template>
<script lang="ts" setup>
import { useStore } from '@/store/store';
import { ref, watch } from 'vue';

  const store = useStore()

  const snackbar = ref(false)

  watch(() => store.messages, (cur, prev) => {
    const hasMessages = cur.length > 0
    if(hasMessages && (!prev || cur.length != prev.length)) {
      snackbar.value = true;
    }
  }, {immediate: true})

</script>
