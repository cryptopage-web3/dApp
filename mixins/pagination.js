export const paginationMixin = {
  data: () => ({
    total: 0,
    page: 1,
    pageSize: 10
  }),
  watch: {
    page: '$fetch',
    pageSize: '$fetch'
  },
  computed: {
    showNext() {
      return this.total >= this.page * this.pageSize
    },
    showPrevious() {
      return this.page >= 2
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
