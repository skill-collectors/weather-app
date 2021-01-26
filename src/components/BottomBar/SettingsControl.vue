<template>
  <api-key-input></api-key-input>
</template>
<script type="ts">
import { Component, Vue } from 'vue-property-decorator';
import ApiKeyInput from '@/components/BottomBar/ApiKeyInput.vue';

@Component({
  components: {
    ApiKeyInput,
  },
})
export default class SettingsControl extends Vue {}
</script>
