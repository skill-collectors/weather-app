import { mount, shallowMount } from '@vue/test-utils';
import ApiKeyInput from '@/views/Settings/ApiKeyInput.vue';
import { createTestingPinia } from '@pinia/testing';
import { useStore } from '@/store/store';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import { createVuetify } from 'vuetify';
import { components, directives } from 'vuetify/dist/vuetify.js';

const vuetify = createVuetify({
  components,
  directives,
})
const pinia = createTestingPinia({
  createSpy: vi.fn,
});

describe('ApiKeyInput.vue', () => {
  let store: ReturnType<typeof useStore>;

  beforeEach(() => {
    // Set up a testing Pinia instance with a mock store
    store = useStore(pinia);

    // Initialize store state as needed
    store.apiKey = '';
    store.location = {
      name: '',
      country: '',
      state: '',
      lat: 0,
      lon: 0,
    };
    store.recentLocations = [];
    store.weather = {
      current: {
        temp: 0,
        feels_like: 0,
        weather: [{
          description: 'sunny', icon: '03n', id: 800, main: 'Clear',
        }],
      },
      minutely: [{ dt: 0, precipitation: 0 }],
      hourly: [{
        dt: 0,
        temp: 0,
        feels_like: 0,
        weather: [{
          description: '', icon: '', id: 0, main: '',
        }],
      }],
      daily: [{
        dt: 0,
        temp: {
          day: 0, eve: 0, morn: 0, night: 0, min: 0, max: 0,
        },
        feels_like: {
          day: 0, eve: 0, morn: 0, night: 0,
        },
        weather: [{
          description: '', icon: '', id: 0, main: '',
        }],
      }],
    };
    store.stats = {
      callCount: 0,
    };
  });

  it('renders correctly', () => {
    const wrapper = shallowMount(ApiKeyInput, {
      global: {
        plugins: [vuetify, store.$pinia],
      },
    });
    expect(wrapper.findComponent(ApiKeyInput).exists()).toBe(true);
  });

  it('stores the value in Pinia when it changes', async () => {
    const wrapper = mount(ApiKeyInput, {
      global: {
        plugins: [vuetify, store.$pinia],
      },
    });

    const input = wrapper.get('#apiKey');
    await input.setValue('test');

    // Check if the apiKey has been updated in the store
    expect(store.apiKey).toBe('test');
  });
});
