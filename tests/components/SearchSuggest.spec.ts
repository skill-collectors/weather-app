import { mount } from '@vue/test-utils';
import SearchSuggest from '@/components/SearchSuggest.vue';

describe('SearchSuggest', () => {
  it('renders the current query', () => {
    const wrapper = mount(SearchSuggest, { propsData: { value: 'expected' } });
    const input = wrapper.find('input').element as HTMLInputElement;
    expect(input.value).toBe('expected');
  });

  it('does not render a datalist when the list is empty', () => {
    const wrapper = mount(SearchSuggest, { propsData: { list: [] } });
    expect(wrapper.find('option').element).toBeUndefined();
  });

  it('renders a datalist when the list is populated', () => {
    const wrapper = mount(SearchSuggest, { propsData: { list: ['test'] } });
    expect(wrapper.find('option').element).not.toBeUndefined();
  });

  it('emits "select" when a datalist option is clicked', () => {
    const wrapper = mount(SearchSuggest, { propsData: { list: ['test'] } });
    wrapper.find('option').trigger('click');
    expect(wrapper.emitted().select).toEqual([['test']]);
  });
});
