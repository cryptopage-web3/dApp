<template>
  <div class="block">
    <div v-show="showTitle" class="title">
      Current block number:
      <nuxt-link :to="`/web3/blocks/${currentBlockNumber}`">{{
        currentBlockNumber
      }}</nuxt-link>
    </div>
    <div v-show="showTotal" class="total">
      Total blocks: <span class="text">{{ total }}</span>
    </div>
    <div v-if="block" class="transactions">
      <transactions :block="block" />
    </div>
    <div v-show="showControls" class="controls">
      <button v-if="showPrevious" @click="previous">Previous block</button>
      <button v-if="showNext" @click="next">Next block</button>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    transactions: () => import('~/components/TransactionList.vue')
  },
  props: {
    showTitle: {
      type: Boolean,
      default: true
    },
    showControls: {
      type: Boolean,
      default: true
    },
    showTotal: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    block: null,
    lastBlockNumber: 0,
    currentBlockNumber: 0
  }),
  async fetch() {
    try {
      this.block = await this.$web3.eth.getBlock(this.currentBlockNumber)
    } catch (error) {
      console.error(`ERROR in transactions:`, error) // eslint-disable-line no-console
      this.$nuxt.error({
        statusCode: 400,
        message: `Try again later. Something went wrong on our end. We're working on it`
      })
      if (process.server) this.$nuxt.context.res.statusCode = 400
    }
  },
  computed: {
    total() {
      return this.lastBlockNumber
    },
    showNext() {
      return this.total >= this.page * this.pageSize
    },
    showPrevious() {
      return this.page >= 2
    }
  },
  watch: {
    currentBlockNumber() {
      this.$fetch()
    }
  },
  async mounted() {
    await this.$nextTick(async () => {
      this.currentBlockNumber = await this.updateLastBlockNumber()
    })
  },
  fetchOnServer: false,
  methods: {
    next() {
      if (!this.showNext) return
      this.currentBlockNumber -= 1
    },
    previous() {
      if (!this.showPrevious) return
      this.currentBlockNumber += 1
    },
    async updateLastBlockNumber() {
      this.lastBlockNumber = await this.$web3.eth.getBlockNumber()
      return this.lastBlockNumber
    }
  }
}
</script>
<style>
.block .total {
  margin: 1em 0;
}
.block .item {
  margin: 0.5em 0;
}
.block .controls {
  margin: 1em 0;
}
</style>
