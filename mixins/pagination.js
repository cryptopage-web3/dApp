export const paginationMixin = {
  data: () => ({
    page: 1,
    pageSize: 10,
    scrollListener: null
  }),

  computed: {
    showNext() {
      return (
        this.$store.getters['address/transactionsCount'] >=
        this.page * this.pageSize
      )
    },
    address() {
      return this.$store.getters['address/address']
    },
    chainId() {
      return this.$store.getters['auth/chainId']
    }
  },

  watch: {
    page: '$fetch',
    pageSize: '$fetch',
    address: 'reset',
    chainId: 'resetChain'
  },

  mounted() {
    this.$nextTick(() => {
      this.scrollListener = this.scrollHandler.bind(this)
      $(window).on('scroll', this.scrollListener)
    })
  },

  beforeDestroy() {
    $(window).off('scroll', this.scrollListener)
    this.scrollListener = null
  },

  methods: {
    next() {
      if (!this.showNext) return
      this.page += 1
    },

    async reset() {
      await this.$nuxt.$loading.start()

      this.page = 1
      await this.$store.dispatch('address/clearTransactions')
      await this.$fetch()

      await setTimeout(() => this.$nuxt.$loading.finish(), 500)
    },

    async resetChain() {
      await this.$nuxt.$loading.start()
      const params = this.$route.params
      const chainId = Number(this.chainId)
      if (chainId === 1) {
        params.networkName = 'eth'
      } else if (chainId === 4) {
        params.networkName = 'rinkeby'
      } else if (chainId === 56) {
        params.networkName = 'bsc'
      } else if (chainId === 137) {
        params.networkName = 'matic'
      }
      await this.$store.dispatch('address/clearTransactions')
      await this.$store.dispatch('auth/setChainId', this.chainId)
      await this.$router.push({ params })
      await setTimeout(() => this.$nuxt.$loading.finish(), 500)
    },

    scrollHandler() {
      /** пагинатор только для транзакций,
       * если доскролили до низа блока транзакций, то делаем запрос на следующую страницу
       */
      const windowHeight = $(window).height()
      const windowScrollTop = $(window).scrollTop()
      const elemOffsetTop = $('.transactions-body').offset().top
      const elemHeight = $('.transactions-body').height()

      if (windowScrollTop + windowHeight > elemOffsetTop + elemHeight) {
        this.next()
      }
    }
  }
}
