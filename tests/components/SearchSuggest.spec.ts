import { mount } from '@vue/test-utils';
import SearchSuggest from '@/views/Locations/SearchSuggest.vue';
import { describe, it, expect } from 'vitest'
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})
const global = {
  plugins: [vuetify]
}

describe('SearchSuggest', () => {
  it('renders the current query', () => {
    const wrapper = mount(SearchSuggest, { props: { value: 'expected' }, global });
    const input = wrapper.find('input');
    expect(input.element.value).toBe('expected');
  });

  it('does not render a datalist when the list is empty', () => {
    const wrapper = mount(SearchSuggest, { props: { list: [] }, global });
    expect(wrapper.find('option').exists()).toBe(false);
  });

  it('renders a datalist when the list is populated', () => {
    const wrapper = mount(SearchSuggest, { props: { list: ['test'] }, global });
    expect(wrapper.find('option').exists()).toBe(true);
  });

  it('emits "select" when a datalist option is clicked', () => {
    const wrapper = mount(SearchSuggest, { props: { list: ['test'] }, global });
    wrapper.find('option').trigger('click');
    expect(wrapper.emitted().select).toEqual([['test']]);
  });
});
