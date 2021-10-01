import docs from './constants/coinmarketcap.json'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: process.env.NUXT_TARGET || 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'crypto-twitter',
    htmlAttrs: {
      lang: 'en'
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
    '@/assets/scss/main.scss'
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
    '@nuxtjs/eslint-module',
    '@nuxtjs/pwa',
    ['@nuxt/typescript-build', { 'typeCheck': true }]
  ],

  typescript: {
    typeCheck: {
      eslint: {
        files: './**/*.{ts,js,vue}'
      }
    }
  },

  eslint: {
    fix: true
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    ['@nuxtjs/axios'],
    [
      'nuxt-vuex-localstorage',
      {
        localStorage: ['auth']
      }
    ],
    {
      src: '@nuxtjs/lunr-module',
      options: {
        includeComponent: false,
        globalComponent: false,
        css: false,
        ref: 'id',
        fields: ['name', 'slug', 'symbol', 'address', 'logo_url']
      }
    }
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    debug: process.env.NODE_ENV === 'development',
    https: true,
    proxyHeadersIgnore: ['accept', 'accept-encoding', 'host'],
    progress: true,
    proxy: false,
    retry: true,
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
    }
  }
}
