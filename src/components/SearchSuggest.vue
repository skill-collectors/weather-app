<template>
  <span>
    <b-form-input
        type="text"
        :placeholder="placeholder"
        :value="value" @input="handleInput"
        ref="input">
    </b-form-input>
    <datalist :class="dataListClass" ref="datalist">
      <option @click="handleSelect" v-for="item in list" :key="item">{{item}}</option>
    </datalist>
  </span>
</template>
<script lang="ts">
import { PropType } from 'vue';
import {
  Vue, Component, Prop, Watch,
} from 'vue-property-decorator';
import { BIconSearch, BIconGeoAltFill, BFormInput } from 'bootstrap-vue';

@Component({
  components: { BIconSearch, BIconGeoAltFill },
})
export default class SearchSuggest extends Vue {
  $refs!: {
    input: BFormInput,
    datalist: HTMLDataListElement,
  }

  @Prop({ type: String, default: '' }) public value!: string;

  @Prop({ type: String, default: '' }) public placeholder!: string;

  @Prop({ type: Array as PropType<string[]>, default: [] }) public list!: string[];

  get dataListClass() {
    return (this.list && this.list.length > 0) ? 'visible' : 'hidden';
  }

  handleInput(newValue: string) {
    this.$emit('input', newValue);
  }

  handleSelect(e: MouseEvent) {
    const target = e.target as HTMLOptionElement;
    this.$emit('select', target.value);
  }

  @Watch('list')
  setDatalistPosition() {
    // wait until after the DOM rerenders so that datalist.offsetHeight is correct
    Vue.nextTick(() => {
      const { input, datalist } = this.$refs;
      const inputElement = input.$el as HTMLInputElement;
      datalist.style.width = `${inputElement.offsetWidth}px`;
      datalist.style.left = `${inputElement.offsetLeft}px`;
      datalist.style.top = `${inputElement.offsetTop - datalist.offsetHeight}px`;
    });
  }
}
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
