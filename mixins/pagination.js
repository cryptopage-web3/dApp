export const paginationMixin = {
  data: () => ({
    page: 1,
    pageSize: 10
  }),
  watch: {
    page: '$fetch',
    pageSize: '$fetch',
    address: 'addressReset',
    chainId: 'addressReset'
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
      this.$store.dispatch('address/clearTransactions')
      await this.$fetch()
      await setTimeout(async () => await this.$nuxt.$loading.finish(), 500)
    },
    async addressReset() {
      await this.reset()
      await this.$store.dispatch(
        'address/updateAddressInfo',
        this.$route.params.address
      )
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
