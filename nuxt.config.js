/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable nuxt/no-cjs-in-config */
const webpack = require('webpack');

export default {
  env: {
    API_SERVER_URL: process.env.API_SERVER_URL || 'https://api-m.crypto.page',
    ENCRYPTION_SERVICE_URL:
      process.env.ENCRYPTION_SERVICE_URL ||
      'https://fdckbnnja2.execute-api.us-east-1.amazonaws.com/api/',
    INFURA_PROJECT_ID: process.env.INFURA_PROJECT_ID || '',
    IPFS_INFURA_PROJECT_ID: process.env.IPFS_INFURA_PROJECT_ID || '',
    IPFS_INFURA_SECRET_KEY: process.env.IPFS_INFURA_SECRET_KEY || '',
    FRACTAL_CLIENT_ID: process.env.FRACTAL_CLIENT_ID || '',
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Crypto.Page - decentralized cross-chain social network',
    htmlAttrs: {
      lang: 'en',
    },
    bodyAttrs: {
      class: 'white white-bg body-market modal-bg-white',
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, user-scalable=no, shrink-to-fit=no',
      },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        src: 'https://cdn.jsdelivr.net/gh/greghub/green-audio-player/dist/js/green-audio-player.min.js',
      },
      {
        src: 'https://unpkg.com/swiper@7/swiper-bundle.min.js',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '@/assets/styles/main.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/filters.ts',
    '~/plugins/jazzicon.ts',
    '~/plugins/notifications.server.ts',
    '~/plugins/notifications.client.ts',
    '~/plugins/fontawesome.ts',
    '~/plugins/bootstrap.ts',
    '~/plugins/formstyler.ts',
    '~/plugins/stickySidebar.ts',
  ],

  // Progress bar https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-loading
  loading: {
    color: '#1da1f2',
    continuous: true,
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    ['@nuxtjs/eslint-module'],
    [
      '@nuxt/typescript-build',
      {
        typeCheck: true,
        eslint: {
          files: './**/*.{ts,js,vue}',
        },
      },
    ],
  ],

  eslint: {
    fix: true,
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [['@nuxtjs/axios'], 'portal-vue/nuxt'],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      /@walletconnect/,
      // ({ isClient }) => isClient && /walletconnect/,
    ],
    babel: {
      plugins: [['@babel/plugin-proposal-private-methods', { loose: true }]],
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        jquery: 'jquery',
        'window.jQuery': 'jquery',
      }),
    ],
    extend(config) {
      config.node = {
        fs: 'empty',
      };

      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      });
    },
  },
};
