import BottomBar from '@/components/BottomBar/BottomBar.vue';
import store from '@/store/store';
import '../../plugins/bootstrap-vue';

export default {
  title: 'BottomBar',
  component: BottomBar,
};

const Template = (args, { argTypes }) => ({
  components: { BottomBar },
  props: Object.keys(argTypes),
  store,
  template: `
    <div>
      <p>$store.state.apiKeys = {{$store.state.apiKeys}}</p>
      <p>$store.state.city = {{$store.state.location.city}}</p>
      <BottomBar/>
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = { };
