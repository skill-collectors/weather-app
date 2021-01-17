import ApiKeyInput from '@/components/ApiKeyInput.vue';
import store from '@/store/store';
import '../../plugins/bootstrap-vue';

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
      <p>$store.state.apiKeys = {{$store.state.apiKeys}}</p>
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = { };
