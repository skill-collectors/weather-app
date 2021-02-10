import Vuex, { Store, MutationTree } from 'vuex';
import { RootState } from '@/store/types';
import { mount, createLocalVue, shallowMount } from '@vue/test-utils';
import ApiKeyInput from '@/components/BottomBar/ApiKeyInput.vue';
import { SET_API_KEY } from '@/store/mutations';
import OPEN_WEATHER from '@/store/apiNames';
import BootstrapVue from 'bootstrap-vue';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(BootstrapVue);

describe('ApiKeyInput.vue', () => {
  let state: RootState;
  let mutations: MutationTree<RootState>;
  let store: Store<RootState>;

  beforeEach(() => {
    state = {
      apiKeys: {
        [OPEN_WEATHER]: '',
      },
      location: {
        city: '',
        lat: 0,
        lon: 0,
      },
      weather: {
        current: {},
        forcast: {},
      },
      stats: {
        callCount: 0,
      },
    };
    mutations = {
      [SET_API_KEY]: jest.fn(),
    };
    store = new Vuex.Store({
      state,
      mutations,
    });
  });

  it('renders correctly', () => {
    const wrapper = shallowMount(ApiKeyInput, { store, localVue });
    expect(wrapper.findComponent(ApiKeyInput).exists()).toBe(true);
  });

  it('stores the value in vuex when it changes', () => {
    const wrapper = mount(ApiKeyInput, { store, localVue });
    const input = wrapper.get('#apiKey');
    input.setValue('test');
    expect(mutations[SET_API_KEY]).toHaveBeenCalled();
  });
});
