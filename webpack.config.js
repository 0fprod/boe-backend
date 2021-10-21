import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

export function webpack(config) {
  config.resolve.plugins.push(new TsconfigPathsPlugin());
  return config;
}
