import ForcastItem from '@/components/ForcastItem.vue';

export default {
  title: 'Weather/Forcast',
  component: ForcastItem,
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
  components: { ForcastItem },
  template: '<forcast-item v-bind="$props" />',
});

export const Current = Template.bind({});
Current.args = {
  dateTime: new Date(),
  dateTimeFormat: 'hh A',
  imageSrc: 'http://openweathermap.org/img/wn/04n@2x.png',
  temperature: 72,
};
