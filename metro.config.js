/* eslint-disable @typescript-eslint/no-var-requires */
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const getConfig = (projectRoot) => {
  const {
    resolver: { assetExts, sourceExts },
    transformer,
  } = getDefaultConfig(projectRoot);

  return {
    transformer: {
      ...transformer,
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      assetExts: assetExts.filter((ext) => ext !== 'svg'),
      sourceExts: [...sourceExts, 'jsx', 'js', 'json', 'ts', 'tsx', 'svg'],
    },
  };
};

module.exports = mergeConfig(getDefaultConfig(__dirname), getConfig(__dirname));
