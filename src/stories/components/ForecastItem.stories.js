import ForecastItem from '@/components/ForecastItem.vue';

export default {
  title: 'Weather/ForecastItem',
  component: ForecastItem,
  argTypes: {
    dateTime: { control: { type: 'date' } },
    dateTimeFormat: { control: { type: 'string' } },
    imageSrc: { control: { type: 'text' } },
    temperature: {
      control: {
        type: 'range', min: -150, max: 150, step: 1,
      },
    },
    high: {
      control: {
        type: 'range', min: -150, max: 150, step: 1,
      },
    },
    low: {
      control: {
        type: 'range', min: -150, max: 150, step: 1,
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ForecastItem },
  template: '<forecast-item v-bind="$props" />',
});

export const Current = Template.bind({});
Current.args = {
  dateTime: new Date(),
  dateTimeFormat: 'ha',
  imageSrc: 'http://openweathermap.org/img/wn/04n.png',
  temperature: 72,
};

export const FiveDay = Template.bind({});
FiveDay.args = {
  dateTime: new Date(),
  dateTimeFormat: 'E',
  imageSrc: 'http://openweathermap.org/img/wn/11n.png',
  high: 72,
  low: 63,
};
