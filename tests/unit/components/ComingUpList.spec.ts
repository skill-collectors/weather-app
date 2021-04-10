import Vuex, { Store, MutationTree } from 'vuex';
import { mount, createLocalVue, shallowMount } from '@vue/test-utils';
import ComingUpList from '@/components/ComingUpList.vue';

describe('ComingUpList', () => {
  it('renders a placeholder when no notifications are given', () => {
    const wrapper = mount(ComingUpList, {});
    expect(wrapper.find('ul').element).not.toBeUndefined();
  });
});
