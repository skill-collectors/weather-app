import ComingUpList from '@/components/ComingUpList.vue';

export default {
  title: 'ComingUpList',
  component: ComingUpList,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ComingUpList },
  template: '<coming-up-list v-bind="$props" />',
});

export const Empty = Template.bind({});
Empty.args = {
  notifications: [],
};

export const Rain = Template.bind({});
Rain.args = {
  notifications: [{
    type: 'RAIN',
    iconUrl: 'https://openweathermap.org/img/wn/10d.png',
    text: "It'll be rainy soon.",
  }],
};
