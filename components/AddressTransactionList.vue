<template>
  <div>
    <div>Total: {{ total }}</div>
    <div class="posts">
      <post
        v-for="item in items"
        :key="item.hash"
        :post="item"
        :token="token"
        :types="types"
      />
    </div>
  </div>
</template>
<script>
import { tokens } from '~/constants/tokens'
export default {
  components: {
    post: () => import('~/components/post/Post.vue')
  },
  props: {
    types: {
      type: Array,
      default: () => []
    },
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
    isContract: false,
    token: {},
    abi: ''
  }),
  async fetch() {
    this.$nuxt.$loading.start()
    const response = await this.getTransactions(this.address)
    this.items.push(...response.result)
    this.$nuxt.$loading.finish()
  },
  computed: {
    showNext() {
      if (!this.isContract) {
        return this.total >= this.page * this.pageSize
      }
      return true
    },
    showPrevious() {
      return this.page >= 2
    }
  },
  watch: {
    page: '$fetch',
    pageSize: '$fetch'
  },
  fetchOnServer: false,
  async mounted() {
    await this.$nextTick(async () => {
      const code = await this.$web3.eth.getCode(this.address)
      this.isContract = code !== '0x'
      this.total = await this.$web3.eth.getTransactionCount(this.address)
      const address = this.$web3.utils.toChecksumAddress(this.address)
      if (this.isContract) {
        // this.abi = await this.getABI(address) PLEASE, DON'T REMOVE IT :)
        this.token = tokens.find((token) => {
          return this.$web3.utils.toChecksumAddress(token.address) === address
        })
      }
      window.onscroll = () => {
        const bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight >=
          document.documentElement.offsetHeight - 150
        if (bottomOfWindow) {
          this.next()
        }
      }
    })
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
    addItem(item) {
      if (!this.items.some((tx) => tx.hash === item.hash)) {
        this.items.push(item)
      }
    },
    async getTransactions(address) {
      const baseURL =
        'https://api.etherscan.io/api?module=account&action=txlist'
      const URL = `${baseURL}&address=${this.address}&startblock=0&endblock=99999999&page=${this.page}&offset=${this.pageSize}&sort=desc&apikey=VQDBC4GZA5MQT2F6IRW2U6RPH66HJRSF6S'`
      return await fetch(URL)
        .then((response) => response.json())
        .then((response) => response)
    },
    getABI(address) {
      const URL = `https://api.etherscan.io/api?module=contract&action=getabi&address=${address}`
      return fetch(URL).then((response) => response.json())
    }
  }
}
</script>
