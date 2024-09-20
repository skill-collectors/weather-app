<template>
  <span>
    <v-text-field
      type="text"
      :placeholder="placeholder"
      :value="value"
      @input="handleInput"
      ref="input"
    >
    </v-text-field>
    <datalist :class="dataListClass" ref="datalist">
      <option @click="handleSelect" v-for="(item, i) in list" :key="i">{{ item }}</option>
    </datalist>
  </span>
</template>
<script lang="ts" setup>
import { computed, nextTick, useTemplateRef, watch } from 'vue'

const inputRef = useTemplateRef<HTMLInputElement>('input')
const datalistRef = useTemplateRef<HTMLDataListElement>('datalist')

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
    const inputElement = inputRef.value as HTMLInputElement
    if(datalistRef.value !== null) {
      datalistRef.value.style.width = `${inputElement.offsetWidth}px`
      datalistRef.value.style.left = `${inputElement.offsetLeft}px`
      datalistRef.value.style.top = `${inputElement.offsetTop - datalistRef.value.offsetHeight}px`
    }
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
