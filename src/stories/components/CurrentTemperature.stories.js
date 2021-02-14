import CurrentTemperature from '@/components/CurrentTemperature.vue';

export default {
  title: 'Weather/CurrentTemperature',
  component: CurrentTemperature,
  argTypes: {
    currentTemperature: {
      control: {
        type: 'range', min: -150, max: 150, step: 1,
      },
    },
    currentFeelsLike: {
      control: {
        type: 'range', min: -150, max: 150, step: 1,
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CurrentTemperature },
  template: '<current-temperature v-bind="$props" />',
});

export const Basic = Template.bind({});
Basic.args = {
  currentTemperature: 72,
  currentFeelsLike: 68,
};

export const HighTemp = Template.bind({});
HighTemp.args = {
  currentTemperature: 105,
  currentFeelsLike: 113,
};

export const Negative = Template.bind({});
Negative.args = {
  currentTemperature: -24,
  currentFeelsLike: -36,
};
