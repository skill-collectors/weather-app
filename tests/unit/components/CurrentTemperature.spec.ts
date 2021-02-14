import Vuex, { Store, MutationTree } from 'vuex';
import { mount, createLocalVue, shallowMount } from '@vue/test-utils';
import CurrentTemperature from '@/components/CurrentTemperature.vue';

describe('CurrentTemperature', () => {
  const propsData = {
    currentTemperature: 72,
    currentFeelsLike: 68,
  };
  it('renders the current temperature', () => {
    const wrapper = mount(CurrentTemperature, { propsData });
    expect(wrapper.text()).toMatch(/72/);
  });

  it('renders the current "feels like" temperature', () => {
    const wrapper = mount(CurrentTemperature, { propsData });
    expect(wrapper.text()).toMatch(/68/);
  });
});
