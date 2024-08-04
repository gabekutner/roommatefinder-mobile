// /**
//  * Metro configuration
//  * https://reactnative.dev/docs/metro
//  *
//  * @type {import('metro-config').MetroConfig}
//  */
const path = require("path");
const {generate} = require("@storybook/react-native/scripts/generate");
const {getDefaultConfig, mergeConfig} = require("@react-native/metro-config");

generate({
  configPath: path.resolve(__dirname, "./.storybook"),
});

const metroConfig = getDefaultConfig(__dirname);

module.exports = mergeConfig(metroConfig, {
  transformer: {
    unstable_allowRequireContext: true,
  },
  resolver: {
    sourceExts: [...metroConfig.resolver.sourceExts, "mjs"],
  },
});