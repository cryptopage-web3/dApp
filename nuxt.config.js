import docs from './constants/coinmarketcap.json'
const webpack = require("webpack");

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: process.env.NUXT_TARGET || 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Crypto.page',
    htmlAttrs: {
      lang: 'en'
    },
    bodyAttrs: {
      class: 'white',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '@/assets/scss_new/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/directives.client',
    '~/plugins/ipfs.client',
    '~/plugins/crypto.client',
    '~/plugins/service-worker.client',
    '~/plugins/filters',
    '~/plugins/jazzicon',
    '~/plugins/web3',
    '~/plugins/lunr.client',
    '~/plugins/modals.client',
    '~/plugins/easy-circular-progress.client',
    '~/plugins/notifications.client',
    '~/plugins/fontawesome.js',
    '~/plugins/type-di.ts',
    '~/plugins/bootstrap.js',
    '~/plugins/sticky-sidebar.js',
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
    ['@nuxt/typescript-build', {
      'typeCheck': true,
      'eslint': {
        'files': './**/*.{ts,js,vue}'
      }
    }]
  ],

  eslint: {
    fix: true
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    ['@nuxtjs/axios', {
      debug: process.env.NODE_ENV === 'development',
      https: true,
      proxyHeadersIgnore: ['accept', 'accept-encoding', 'host'],
      progress: true,
      proxy: false,
      retry: true
    }],
    ['nuxt-vuex-localstorage', {
      localStorage: ['auth']
    }],
    ['@nuxtjs/lunr-module', {
      includeComponent: false,
      globalComponent: false,
      css: false,
      ref: 'id',
      fields: ['name', 'slug', 'symbol', 'address', 'logo_url']
    }]
  ],

  workbox: {
     runtimeCaching: [
       {
         urlPattern: 'https://*.etherscan.io/*',
         strategyOptions: {
           cacheName: 'etherscan-cache',
         },
         strategyPlugins: [{
            use: 'Expiration',
            config: {
              maxEntries: 10,
              maxAgeSeconds: 30
            }
          }]
       },
       {
         urlPattern: 'https://*.ethplorer.io/*',
         strategyOptions: {
           cacheName: 'ethplorer-cache',
         },
         strategyPlugins: [{
            use: 'Expiration',
            config: {
              maxEntries: 10,
              maxAgeSeconds: 30
            }
          }]
       },
       {
         urlPattern: 'https://ipfs.io/ipfs/*',
         strategyOptions: {
           cacheName: 'ipfs-cache',
         },
         strategyPlugins: [{
            use: 'Expiration',
            config: {
              maxEntries: 10,
              maxAgeSeconds: 30
            }
          }]
       }
     ]
  },

  publicRuntimeConfig: {},
  privateRuntimeConfig: {
    infuraProjectId: process.env.NODE_ENV === 'production' ? process.env.INFURA_PROJECT_ID : 'a925609bdb25477d8039c763faa7b61d',
    etherscanAPIKey: process.env.NODE_ENV === 'production' ? process.env.ETHERSCAN_API_KEY : 'VQDBC4GZA5MQT2F6IRW2U6RPH66HJRSF6S'    
  },

  hooks: {
    ready(nuxt) {
      let documentIndex = 1
      for (const doc of docs) {
        nuxt.callHook('lunr:document', {
          document: {
            // id: doc.address,
            id: documentIndex,
            ...doc
          },
          meta: doc
        })
        documentIndex++
      }
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: [['@babel/plugin-proposal-private-methods', { loose: true }]]
    },
    vendor: ["jquery", "bootstrap"],
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: 'jquery',
        jquery: 'jquery',
        'window.jQuery': 'jquery'
      })
    ],
    extend (config, { isDev, isClient }) {
      config.node = {
        fs: 'empty'
      }
    }    
  }
}
