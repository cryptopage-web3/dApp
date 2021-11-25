export const paginationMixin = {
  data: () => ({
    scrollListener: null
  }),

  computed: {
    address() {
      return this.$store.getters['address/address']
    },

    chainId() {
      return this.$store.getters['auth/chainId']
    },

    isFetchDisabled() {
      return (
        this.hasAllPages || this.$fetchState.pending || this.$fetchState.error
      )
    }
  },

  watch: {
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
      /** нельзя вызвать $fetch, если уже получили полный список транзакций,
       * либо текущий статус запроса pending или error */
      if (this.isFetchDisabled) return
      this.$fetch()
    },

    reset() {
      /** очищаем транзакции при смене адреса */
      this.$store.dispatch('address/clearTransactions')

      /** после очистки нужно запустить $fetch
       * если $fetch не запущен, то сразу его вызываем
       * если $fetch выполняется, то необходимо дождаться его завершения, а потом запустить
       * иначе $fetch не запустится
       */
      if (!this.$fetchState.pending) {
        this.$fetch()
        return
      }

      /** ожидаем окончания $fetch, очищаем watcher, запускаем повторно $fetch */
      const unwatchPending = this.$watch('$fetchState.pending', (pending) => {
        if (!pending) {
          unwatchPending()

          this.$nextTick(() => {
            this.$fetch()
          })
        }
      })
    },

    async resetChain(newChain, oldChain) {
      /** проверяем, что chain изменился вне зависимости от типа: string, number */
      if (Number(newChain) === Number(oldChain)) {
        return
      }

      const params = this.$route.params
      const chainId = Number(this.chainId)

      const validNetworks = {
        1: 'eth',
        3: 'ropsten',
        4: 'rinkeby',
        5: 'goerly',
        42: 'kovan',
        56: 'bsc',
        97: 'bsc-testnet',
        137: 'polygon',
        80001: 'polygon-testnet'
      }
      const networkName = validNetworks[chainId]
      if (networkName) params.networkName = networkName
      /*
      if (chainId === 1) {
        params.networkName = 'eth'
      } else if (chainId === 4) {
        params.networkName = 'rinkeby'
      } else if (chainId === 56) {
        params.networkName = 'bsc'
      } else if (chainId === 137) {
        params.networkName = 'matic'
      }
      */
      await this.$store.dispatch('address/clearTransactions')
      await this.$router.push({ params })
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
