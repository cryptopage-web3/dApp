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
  css: ['@/assets/scss/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/directives.client',
    '~/plugins/ipfs.client',
    '~/plugins/crypto.client',
    '~/plugins/service-worker.client',
    '~/plugins/humanize',
    '~/plugins/jazzicon',
    '~/plugins/web3',
    '~/plugins/modals.client',
    '~/plugins/easy-circular-progress.client',
    '~/plugins/notifications.client'
  ],

  // Progress bar https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-loading
  loading: {
    color: '#1da1f2',
    continuous: true
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/pwa'],
  eslint: {
    fix: true
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    [
      'nuxt-vuex-localstorage',
      {
        localStorage: ['auth']
      }
    ]
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: [['@babel/plugin-proposal-private-methods', { loose: true }]]
    }
  }
}
