import SearchSuggest from '@/components/SearchSuggest.vue';

export default {
  title: 'Locations/SearchSuggest',
  component: SearchSuggest,
  argTypes: {
    onInput: { action: 'input' },
    onSelect: { action: 'select' },
    value: {
      control: {
        type: 'text', defaultValue: 'query',
      },
    },
    list: {
      control: { type: 'array' },
    },
    placeholder: {
      control: { type: 'string' },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SearchSuggest },
  template: `<div style="margin-top: 7em">
    <search-suggest @input="onInput" @select="onSelect" v-bind="$props" />
    <aside>(Note: the parent is responsible for managing the list based on value/selection)</aside>
  </div>`,
});

export const Basic = Template.bind({});
Basic.args = {
  value: 'The City',
};

export const OpenList = Template.bind({});
OpenList.args = {
  value: 'Springfield',
  list: ['Springfield, IL, USA', 'Springfield, MI, USA', 'Springfield, TX, USA'],
};
