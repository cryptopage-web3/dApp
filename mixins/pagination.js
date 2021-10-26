export const paginationMixin = {
  data: () => ({
    page: 1,
    pageSize: 10
  }),
  watch: {
    page: '$fetch',
    pageSize: '$fetch',
    address: 'reset',
    chainId: 'resetChain'
  },
  computed: {
    showNext() {
      return (
        this.$store.getters['address/transactionsCount'] >=
        this.page * this.pageSize
      )
    },
    showPrevious() {
      return this.page >= 2
    },
    address() {
      return this.$store.getters['address/address']
    },
    chainId() {
      return this.$store.getters['auth/chainId']
    }
  },
  methods: {
    next() {
      if (!this.showNext) return
      this.page += 1
    },
    previous() {
      if (!this.showPrevious) return
      this.page -= 1
    },
    async reset() {
      await this.$nuxt.$loading.start()
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
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.onscroll = () => {
        const bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight >=
          document.documentElement.offsetHeight - 300
        if (bottomOfWindow) {
          this.next()
        }
      }
    })
  }
}
