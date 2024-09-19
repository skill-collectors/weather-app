<template>
  <span>
    <b-form-input
      type="text"
      :placeholder="placeholder"
      :value="value"
      @input="handleInput"
      ref="input"
    >
    </b-form-input>
    <datalist :class="dataListClass" ref="datalist">
      <option @click="handleSelect" v-for="item in list" :key="item">{{ item }}</option>
    </datalist>
  </span>
</template>
<script lang="ts" setup>
import { computed, nextTick, watch } from 'vue'

// TODO refs
// $refs!: {
//   input: BFormInput
//   datalist: HTMLDataListElement
// }

const props = defineProps({
  value: { type: String, required: false, default: ''},
  placeholder: { type: String, required: false, default: ''},
  list: { type: Array<String>, required: false, default: () => []},
})

const dataListClass = computed(() => {
  return props.list && props.list.length > 0 ? 'visible' : 'hidden'
})

const emit = defineEmits(['select', 'input'])

function handleInput(newValue: string) {
  emit('input', newValue)
}

function handleSelect(e: MouseEvent) {
  const target = e.target as HTMLOptionElement
  emit('select', target.value)
}

watch(() => props.list, () => {
  // wait until after the DOM rerenders so that datalist.offsetHeight is correct
  nextTick(() => {
    const { input, datalist } = this.$refs
    const inputElement = input.$el as HTMLInputElement
    datalist.style.width = `${inputElement.offsetWidth}px`
    datalist.style.left = `${inputElement.offsetLeft}px`
    datalist.style.top = `${inputElement.offsetTop - datalist.offsetHeight}px`
  })
})
</script>
<style scoped>
datalist {
  position: absolute;
  background: white;
  color: black;
  text-align: left;
}
datalist.visible {
  display: block;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}
datalist option {
  padding: 0.5rem;
  border-bottom: 1px solid #ced4da;
}
datalist.hidden {
  display: hidden;
}
</style>
