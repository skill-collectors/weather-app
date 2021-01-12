import ApiKeyInput from './ApiKeyInput.vue';
import store from '../store/store';
import '../plugins/bootstrap-vue';

export default {
  title: 'ApiKeyInput',
  component: ApiKeyInput,
};

const Template = (args, { argTypes }) => ({
  components: { ApiKeyInput },
  props: Object.keys(argTypes),
  store,
  template: `
    <div>
      <ApiKeyInput/>
      <p>(Open the browser developer tools to see the apiKey synced with Vuex
      and localStorage)</p>
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  task: { },
};
