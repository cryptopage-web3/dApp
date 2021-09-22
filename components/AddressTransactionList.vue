<template>
  <div>
    <div class="posts">
      <div v-for="transaction in items" :key="transaction.hash">
        <slot name="transaction" :transaction="transaction" />
      </div>
    </div>
  </div>
</template>
<script>
import { tokens } from '~/constants/tokens'
import EtherscanAPI from '~/utils/etherscan'
export default {
  props: {
    type: {
      type: String,
      default: 'transactions'
    },
    address: {
      type: String,
      required: true
    },
    total: {
      type: Number,
      default: () => 0
    }
  },
  data: () => ({
    page: 1,
    pageSize: 10,
    items: [],
    isContract: false,
    token: {},
    abi: ''
  }),
  async fetch() {
    this.$nuxt.$loading.start()
    const response = await this.getTransactions()
    if (Array.isArray(response.result)) {
      await response.result.forEach(async (transaction) => {
        await this.addTransaction(transaction)
      })
    }
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
      const address = this.$web3.utils.toChecksumAddress(this.address)
      if (this.isContract) {
        this.token = tokens.find((token) => {
          return this.$web3.utils.toChecksumAddress(token.address) === address
        })
      }
      // this.$watchAddressTransactions({ address, callback: this.addTransaction }) RATE LIMIT EXCEPTION
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
    isTransfer(transaction) {
      return transaction.input.startsWith('0xa9059')
    },
    next() {
      if (!this.showNext) return
      this.page += 1
    },
    previous() {
      if (!this.showPrevious) return
      this.page -= 1
    },
    async addTransaction(transaction) {
      const isUnique = !this.items.some((tx) => tx.hash === transaction.hash)
      if (isUnique) {
        if (this.type === 'transactions') {
          this.items.push(transaction)
        } else if (transaction.contractAddress && this.type === 'nft') {
          const nft = await this.$getERC721Data(
            transaction.tokenID,
            transaction.contractAddress
          )
          if (nft) {
            transaction.nft = nft
            this.items.push(transaction)
          }
        } else if (transaction.contractAddress && this.type === 'tokens') {
          this.items.push(transaction)
        }
      }
    },
    async getTransactions() {
      const etherscan = new EtherscanAPI()
      if (this.type === 'transactions') {
        return await etherscan.txList({
          address: this.address,
          page: this.page,
          offset: this.pageSize
        })
      } else if (this.type === 'tokens') {
        return await etherscan.tokenTx({
          address: this.address,
          page: this.page,
          offset: this.pageSize
        })
      } else if (this.type === 'nft') {
        return await etherscan.tokenNFTTx({
          address: this.address,
          page: this.page,
          offset: this.pageSize
        })
      }
      return []
    }
  }
}
</script>
