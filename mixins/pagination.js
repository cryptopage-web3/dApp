export const paginationMixin = {
  data: () => ({
    total: 0,
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
      return this.total >= this.page * this.pageSize
    },
    showPrevious() {
      return this.page >= 2
    },
    address() {
      return this.$store.getters['transactions/address']
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
    reset() {
      this.$store.commit('address/clearTransactions')
      this.$fetch()
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.onscroll = () => {
        const bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight >=
          document.documentElement.offsetHeight - 150
        if (bottomOfWindow) {
          this.next()
        }
      }
    })
  }
}
