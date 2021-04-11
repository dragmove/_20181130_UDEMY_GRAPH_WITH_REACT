// Ref: https://nextjs.org/docs/api-reference/next.config.js/introduction
/*
module.exports = (phase, { defaultConfig }) => {
  return {
    // config options here
    env: {
      PHASE: process.env.PHASE
    },
    basePath: getBasePath(process.env.PHASE)
  }
}
*/

// Ref: https://github.com/cyrilwanner/next-compose-plugins#comparison
const withPlugins = require('next-compose-plugins');
const withSass = require('@zeit/next-sass');
const withImages = require('next-images');

const nextConfig = {
  basePath: getBasePath(process.env.PHASE),
  // TODO: more setting
};

const plugins = withPlugins(
  [
    [
      withSass,
      {
        cssModules: true,
        cssLoaderOptions: {
          importLoaders: 1,
          localIdentName: '[local]___[hash:base64:5]',
        },
      },
    ],
    withImages,
  ],
  nextConfig
);

module.exports = plugins;

function getBasePath(phase = process.env.PHASE) {
  console.log('getBasePath phase :', phase);

  // Ref: https://nextjs.org/docs/api-reference/next.config.js/basepath
  switch (phase) {
    case 'dev':
      return '';

    case 'alpha':
      return '';

    case 'beta':
      return '';

    default:
      return '';
  }
}
