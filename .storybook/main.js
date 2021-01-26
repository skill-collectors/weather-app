const vueConfig = require("@vue/cli-service/webpack.config.js");

module.exports = {
  webpackFinal: (config) => {
    // Vue's generated webpack config resolves '@' as src/ in the project root.
    // This allows us to use that in stories.
    config.resolve.alias['@'] = vueConfig.resolve.alias['@'];
    return config;
  },
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ]
}
