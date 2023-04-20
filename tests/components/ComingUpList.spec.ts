import { mount  } from '@vue/test-utils';
import ComingUpList from '@/components/ComingUpList.vue';

describe('ComingUpList', () => {
  it('renders a placeholder when no notifications are given', () => {
    const wrapper = mount(ComingUpList, {});
    expect(wrapper.find('ul').element).not.toBeUndefined();
  });
  it('renders the text of a given notification', () => {
    const wrapper = mount(ComingUpList, {
      propsData: {
        notifications: [
          { type: 'RAIN', iconUrl: '', text: 'expected' },
        ],
      },
    });
    expect(wrapper.find('li').text()).toMatch(/expected/);
  });
});
