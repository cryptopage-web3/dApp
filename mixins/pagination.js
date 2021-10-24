export const paginationMixin = {
  data: () => ({
    page: 1,
    pageSize: 10
  }),
  watch: {
    page: '$fetch',
    pageSize: '$fetch',
    address: 'reset',
    chainId: 'reset'
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
      const address = this.$route.params.address
      await this.$store.dispatch('address/clearTransactions')
      await this.$store.dispatch('address/updateAddressInfo', address)
      await this.$fetch()
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
