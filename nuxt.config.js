/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable nuxt/no-cjs-in-config */
const webpack = require('webpack')

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: process.env.NUXT_TARGET || 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Crypto.Page - decentralized cross-chain social network',
    htmlAttrs: {
      lang: 'en'
    },
    bodyAttrs: {
      class: 'white'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        src: 'https://cdn.jsdelivr.net/gh/greghub/green-audio-player/dist/js/green-audio-player.min.js'
      },
      {
        src: 'https://unpkg.com/swiper@7/swiper-bundle.min.js'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '@/assets/styles/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/filters.ts',
    '~/plugins/jazzicon.ts',
    '~/plugins/web3.ts',
    '~/plugins/notifications.client.ts',
    '~/plugins/fontawesome.ts',
    '~/plugins/type-di.ts',
    '~/plugins/bootstrap.ts',
    '~/plugins/formstyler.ts'
  ],

  // Progress bar https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-loading
  loading: {
    color: '#1da1f2',
    continuous: true
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    ['@nuxtjs/eslint-module'],
    ['@nuxtjs/pwa'],
    [
      '@nuxt/typescript-build',
      {
        typeCheck: true,
        eslint: {
          files: './**/*.{ts,js,vue}'
        }
      }
    ]
  ],

  eslint: {
    fix: true
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    [
      '@nuxtjs/axios',
      {
        debug: process.env.NODE_ENV === 'development',
        https: true,
        proxyHeadersIgnore: ['accept', 'accept-encoding', 'host'],
        progress: false,
        proxy: false,
        retry: false
      }
    ],
    [
      'nuxt-vuex-localstorage',
      {
        mode: 'debug',
        localStorage: ['auth']
      }
    ],
    ['nuxt-viewport']
  ],

  workbox: {
    runtimeCaching: [
      {
        urlPattern: 'https://*.etherscan.io/*',
        strategyOptions: {
          cacheName: 'etherscan-cache'
        },
        strategyPlugins: [
          {
            use: 'Expiration',
            config: {
              maxEntries: 10,
              maxAgeSeconds: 30
            }
          }
        ]
      },
      {
        urlPattern: 'https://*.ethplorer.io/*',
        strategyOptions: {
          cacheName: 'ethplorer-cache'
        },
        strategyPlugins: [
          {
            use: 'Expiration',
            config: {
              maxEntries: 10,
              maxAgeSeconds: 30
            }
          }
        ]
      },
      {
        urlPattern: 'https://ipfs.io/ipfs/*',
        strategyOptions: {
          cacheName: 'ipfs-cache'
        },
        strategyPlugins: [
          {
            use: 'Expiration',
            config: {
              maxEntries: 10,
              maxAgeSeconds: 30
            }
          }
        ]
      }
    ]
  },

  publicRuntimeConfig: {},
  privateRuntimeConfig: {
    infuraProjectId:
      process.env.NODE_ENV === 'production'
        ? process.env.INFURA_PROJECT_ID
        : 'a925609bdb25477d8039c763faa7b61d',
    etherscanAPIKey:
      process.env.NODE_ENV === 'production'
        ? process.env.ETHERSCAN_API_KEY
        : 'VQDBC4GZA5MQT2F6IRW2U6RPH66HJRSF6S'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: [['@babel/plugin-proposal-private-methods', { loose: true }]]
    },
    vendor: ['jquery', 'bootstrap'],
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        jquery: 'jquery',
        'window.jQuery': 'jquery'
      })
    ],
    extend(config) {
      config.node = {
        fs: 'empty'
      }
    }
  }
}
