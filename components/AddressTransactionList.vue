<template>
  <div class="posts">
    <post v-for="item in items" :key="item.hash" :post="item" />
  </div>
</template>
<script>
import { _range } from '~/utils'
export default {
  components: {
    post: () => import('~/components/post/Post.vue')
  },
  props: {
    address: {
      type: String,
      required: true
    }
  },
  data: () => ({
    page: 1,
    pageSize: 10,
    total: 0,
    items: [],
    blockNumber: 0
  }),
  fetch() {
    this.$getTransactionsByAddress(
      this.address,
      this.blockNumbers,
      this.addItem
    )

    // mocks data
    this.setMockData()
  },
  fetchOnServer: false,
  computed: {
    blockNumbers() {
      return this.blockNumber
        ? _range(this.blockNumber, this.blockNumber - this.pageSize * this.page)
        : []
    },
    showNext() {
      return this.total >= this.page * this.pageSize
    },
    showPrevious() {
      return this.page >= 2
    }
  },
  watch: {
    blockNumbers: {
      deep: true,
      handler() {
        setTimeout(() => {
          if (this.total > 0 && this.items.length < this.pageSize * this.page) {
            this.blockNumber = this.blockNumber - this.pageSize * this.page
            this.$fetch()
          } else {
            this.$nuxt.$loading.finish()
          }
        }, 1000)
      }
    }
  },
  async mounted() {
    await this.$nextTick(async () => {
      this.total = await this.$web3.eth.getTransactionCount(this.address)
      this.blockNumber = await this.$web3.eth.getBlockNumber()
      this.$nuxt.$loading.start()
      window.onscroll = () => {
        const bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight
        if (bottomOfWindow) {
          this.next()
        }
      }
    })
  },
  methods: {
    next() {
      this.$nuxt.$loading.start()
      if (!this.showNext) return
      this.page += 1
    },
    previous() {
      if (!this.showPrevious) return
      this.page -= 1
    },
    addItem(item) {
      if (!this.items.some((tx) => tx.hash === item.hash)) {
        this.items.push(item)
      }
    },
    setMockData() {
      ;[
        {
          from: '0xEB014f8c8B418Db6b45774c326A0E64C78914dC0',
          hash: '1',
          gasPrice: '10000000000',
          gas: '11000',
          to: '0x3535353535353535353535353535353535353535',
          value: '1000000000000000000',
          data: ''
        },
        {
          from: '0xdd014f8c8B418Db6b45774c326A0E64C78914dTt',
          hash: '2',
          gasPrice: '20000000000',
          gas: '21000',
          to: '0x6635353535353535353535353535353535353522',
          value: '2000000000000000000',
          data: ''
        },
        {
          from: '0xmm014f8c8B418Db6b45774c326A0E64C78914dGg',
          hash: '3',
          gasPrice: '30000000000',
          gas: '31000',
          to: '0x5535353535353535353535353535353535353599',
          value: '3000000000000000000',
          data: ''
        }
      ].forEach((tr) => this.addItem(tr))
    }
  }
}
</script>
