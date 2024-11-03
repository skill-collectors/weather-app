import { mount  } from '@vue/test-utils';
import ComingUpList from '@/components/ComingUpList.vue';
import { describe, it, expect } from 'vitest'

describe('ComingUpList', () => {
  it('renders a placeholder when no notifications are given', () => {
    const wrapper = mount(ComingUpList, {});

    expect(wrapper.findComponent('v-list')).not.toBeUndefined();
  });
  it('renders the text of a given notification', () => {
    const wrapper = mount(ComingUpList, {
      propsData: {
        notifications: [
          { type: 'RAIN', iconUrl: '', text: 'expected' },
        ],
      },
    });
    expect(wrapper.findComponent('v-list').text()).toMatch(/expected/);
  });
});
